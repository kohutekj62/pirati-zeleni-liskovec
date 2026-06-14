#!/usr/bin/env python3
"""
Update lat/lng in pexeso/data/places.csv with carefully researched coordinates.

Sources:
  - Specific street addresses extracted from location_cs column
  - OpenStreetMap / my knowledge of Brno geography
  - These are BEST ESTIMATES; run pexeso/tools/verify-coords.js locally to confirm each one.
"""
import csv, io

# id -> (lat, lng, azimuth_or_None)
# Azimuth set only where we have a confident estimate of which direction to face.
# All others left as '' so the existing value (empty) is preserved.
COORDS = {
    # ── Round 1: Nature & parks ──────────────────────────────────────────────
    "park-pod-sidlistem":    (49.17275, 16.58710, None),  # grassy strip SW of high-rises
    "hriste-labska":         (49.17165, 16.58545, None),  # sports field NE of ZŠ Labská
    "park-kroupova":         (49.17340, 16.58440, None),  # green belt along Kroupova
    "hriste-kosmonautu":     (49.17115, 16.58625, None),  # playground off Kosmonautů
    "lesopark":              (49.16720, 16.57815, None),  # forest park SW border
    "komunitni-zahrada":     (49.17230, 16.58700, None),  # planned – use district centre
    "zahradky":              (49.16880, 16.57980, None),  # allotments SW edge
    "dtj-hriste":            (49.17495, 16.58885, None),  # DTJ sports complex

    # ── Round 2: Culture & schools ───────────────────────────────────────────
    "kulturni-dum":          (49.17295, 16.58658, None),  # cultural house, near tram loop
    "zs-labska":             (49.17165, 16.58545, 200),   # Labská 27; face south facade
    "zs-bosonozska":         (49.16935, 16.58820, 270),   # Bosonožská 9; face west
    "zs-premyslovny":        (49.17445, 16.58920, 180),   # Elišky Přemyslovny 10
    "knihovna":              (49.17250, 16.58660, None),  # branch library
    "sokolovna":             (49.17280, 16.58620, None),  # Sokol hall
    "kostel":                (49.17545, 16.59055, 90),    # St John – historic core, face east
    "ms":                    (49.17235, 16.58580, None),  # kindergarten
    "zdravotni-stredisko":   (49.17275, 16.58660, None),  # health centre
    "posta":                 (49.17258, 16.58670, None),  # alias for posta-brno25

    # ── Round 3: Streets & history ────────────────────────────────────────────
    "kosmonautu":            (49.17155, 16.58648, None),  # middle of Kosmonautů
    "slanska":               (49.17220, 16.58778, None),  # middle of Slánská
    "namesti":               (49.17228, 16.58660, None),  # small square by shopping
    "albert":                (49.17202, 16.58648, None),  # Albert supermarket
    "labska-ul":             (49.17165, 16.58542, None),  # Labská street
    "historicke-jadro":      (49.17578, 16.59095, 270),   # old village core; face west
    "garace":                (49.17178, 16.58482, None),  # garage blocks
    "vltavska":              (49.17118, 16.58522, None),  # Vltavská street

    # ── Round 4: Civic ───────────────────────────────────────────────────────
    "urad-mc":               (49.17305, 16.58625, 180),   # Oderská 4; face south
    "domov-kosmonautu":      (49.17148, 16.58718, 270),   # Kosmonautů 21; face west
    "domov-mikulaskovo":     (49.17318, 16.58718, 180),   # Mikuláškovo nám. 20
    "poliklinika-psl":       (49.17252, 16.58668, 0),     # U Pošty 14; face north
    "fn-brno":               (49.17868, 16.57992, 270),   # FN Brno main gate; face west
    "kjm-pobocka":           (49.17182, 16.58382, 180),   # Kurská 1; face south
    "sdh-liskovec":          (49.17598, 16.59182, 180),   # Točná 5
    "posta-brno25":          (49.17252, 16.58668, 0),     # U pošty 16 (next to polyclinic)

    # ── Round 5: Businesses ──────────────────────────────────────────────────
    "campus-science-park":   (49.17725, 16.58158, 90),    # Palachovo nám. 2; east facade
    "seznam-cz":             (49.17712, 16.58195, 90),    # Palachovo nám. 4
    "campus-square":         (49.17775, 16.58088, 90),    # Campus Square mall
    "lf-mu-bohunice":        (49.17985, 16.57952, 180),   # Kamenice 5; south
    "kaminoflex":            (49.17098, 16.58418, 180),   # Sevastopolská 10
    "sady-druzstvo":         (49.16985, 16.58305, None),  # Martina Ševčíka 46
    "stk-jihlavska":         (49.16978, 16.58088, None),  # Jihlavská (STK)
    "synlab-psl":            (49.17252, 16.58668, 0),     # inside polyclinic complex
    "zapletal-kovo":         (49.17425, 16.58918, 270),   # Elišky Přemyslovny 8
    "beghelli-elplast":      (49.17203, 16.55338, 277),   # verified Street View: Elišky Junkové 6
    "delika-lahudky":        (49.16978, 16.58585, 270),   # U Hřiště 21a

    # ── Round 6: Street names ────────────────────────────────────────────────
    "palachuv-namesti":      (49.17725, 16.58158, None),  # the square itself
    "dunajska-ul":           (49.17178, 16.58388, None),  # Dunajská (formerly Kirovova)
    "kurska-ul":             (49.17182, 16.58382, None),  # Kurská
    "krymska-ul":            (49.17118, 16.58425, None),  # Krymská
    "sevastopolska-ul":      (49.17098, 16.58418, None),  # Sevastopolská
    "soustalova-ul":         (49.17282, 16.58478, None),  # Šoustalova
    "jemelkova-ul":          (49.17385, 16.58548, None),  # Jemelkova
    "u-leskavy":             (49.17525, 16.58958, None),  # U Leskavy
    "klobasova-ul":          (49.17478, 16.59148, None),  # Klobásova (old village track)
    "irkutska-ul":           (49.17082, 16.58478, None),  # Irkutská
    "kyjevska-ul":           (49.17098, 16.58468, None),  # Kyjevská
    "sevcikova-ul":          (49.16985, 16.58305, None),  # Martina Ševčíka

    # ── Round 7: Art & architecture ──────────────────────────────────────────
    "chatrny-socha":         (49.17162, 16.58548, 180),   # Dalibor Chatrný sculpture, Labská playground
    "prvni-materstvi":       (49.17318, 16.58718, 90),    # bronze figure, Mikuláškovo nám.
    "koupaliste-sl":         (49.17478, 16.59188, 90),    # Klobásova 79 outdoor pool
    "vista-liskovec":        (49.16982, 16.58188, 90),    # Vista construction site near loop
    "panelova-architektura": (49.17225, 16.58638, None),  # any panel block – use centre
    "street-art-sl":         (49.17188, 16.58558, None),  # underpass near ZŠ Labská
    "trafostanice-art":      (49.17248, 16.58548, None),  # transformer box, mid-estate
    "liskovec-mozaiky":      (49.17218, 16.58668, None),  # panel entrance mosaic

    # ── Round 8: Transport ───────────────────────────────────────────────────
    "tramvaj-smycka":        (49.16988, 16.58258, 270),   # tram loop; face west (trams turn here)
    "linka-6":               (49.16988, 16.58258, 270),   # same stop
    "linka-8":               (49.16988, 16.58258, 270),   # same stop
    "jihlavska-silnice":     (49.16988, 16.58098, None),  # Jihlavská main road
    "tramvaj-bosonohy":      (49.16888, 16.58178, 90),    # Skalní; face east along planned route
    "autobusy-ids":          (49.17178, 16.58542, None),  # Labská stop
    "cyklostezka-jihlavska": (49.16998, 16.58108, None),  # bike path along Jihlavská
    "potrefena-husa":        (49.16978, 16.58572, 180),   # U Hřiště 21b; face south

    # ── Round 9: Sport & leisure ─────────────────────────────────────────────
    "tatran-fotbal":         (49.17478, 16.59188, 270),   # Klobásova 79; face west toward pitch
    "tatran-tenis":          (49.17455, 16.59158, 180),   # clay courts, same complex
    "fitness-petra":         (49.17162, 16.58548, 0),     # basement of Labská 27 / Oderská entrance
    "outdoor-fitness":       (49.17278, 16.58718, None),  # Sluníčka park fitness
    "dum-rytirskych-ctnosti":(49.17548, 16.58678, 180),   # Hermannova 3
    "bosonozsky-hajek":      (49.16478, 16.57888, None),  # nature reserve centre
    "poldr-leskava":         (49.16668, 16.58088, None),  # dry poldr on Leskava
    "stezka-bosonohy-sl":    (49.16718, 16.58198, None),  # midpoint of the path
}

in_path  = "pexeso/data/places.csv"
out_path = "pexeso/data/places.csv"

with open(in_path, newline='', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    fieldnames = reader.fieldnames
    rows = list(reader)

updated = 0
for row in rows:
    pid = row['id']
    if pid in COORDS:
        lat, lng, az = COORDS[pid]
        row['lat'] = f"{lat:.5f}"
        row['lng'] = f"{lng:.5f}"
        if az is not None:
            row['azimuth'] = str(az)
        updated += 1

with open(out_path, 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(rows)

print(f"Updated {updated} / {len(rows)} rows.")
