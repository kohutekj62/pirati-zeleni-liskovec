/* ==========================================================================
   render.js  —  builds the page lists from the content
   ==========================================================================
   It reads the data in content.js and creates the HTML for:
     • O nás (paragraphs)        • Lidé (the candidate photo cards)
     • Program (the 6 cards)     • Setkejme se (event timeline)
     • Aktuality (news cards)    • Spojme se (contact details)
     • Přátelé (partner cards)   • placeholders & footer links

   It runs once when the page loads (started by main.js) and again every time
   the language is switched (it listens for the "slon:langchange" signal).

   You normally never need to touch this file — change the TEXT in content.js
   and the STYLING in css/styles.css instead.
   ========================================================================== */

const RENDER = (function () {

  /* ---- tiny helpers so we never write raw innerHTML (safer & keeps accents) -- */
  function el(tag, opts) {
    opts = opts || {};
    var node = document.createElement(tag);
    if (opts.class) node.className = opts.class;
    if (opts.text != null) node.textContent = opts.text;
    if (opts.attrs) for (var k in opts.attrs) node.setAttribute(k, opts.attrs[k]);
    if (opts.children) opts.children.forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }
  function clear(node) { if (node) while (node.firstChild) node.removeChild(node.firstChild); }
  function L() { return I18N.lang; }                 // current language shortcut
  function t(key) { return I18N.t(key); }            // UI string shortcut

  /* Pretty date, e.g. "8. srpna 2026" (cs) or "8 August 2026" (en) */
  function formatDate(iso) {
    var d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return iso;
    var locale = (L() === "en") ? "en-GB" : "cs-CZ";
    return d.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
  }

  /* Which social links are actually filled in (skip the empty ones) */
  function socialLinks() {
    var c = CONTENT.config;
    return [
      { key: "facebook",  label: "Facebook",  short: "f",  url: c.facebook },
      { key: "instagram", label: "Instagram", short: "IG", url: c.instagram },
      { key: "twitter",   label: "X",         short: "X",  url: c.twitter },
      { key: "youtube",   label: "YouTube",   short: "YT", url: c.youtube },
    ].filter(function (s) { return s.url && s.url.trim() !== ""; });
  }

  /* ====================================================================== */
  /* 1) O NÁS                                                               */
  /* ====================================================================== */
  function renderAbout() {
    var box = document.getElementById("about-text");
    clear(box);
    (CONTENT.about[L()] || []).forEach(function (line) {
      box.appendChild(el("p", { text: line }));
    });
  }

  /* ====================================================================== */
  /* 2) PROGRAM  (native <details> = expandable without any JavaScript)      */
  /* ====================================================================== */
  function renderProgram() {
    var list = document.getElementById("program-list");
    clear(list);
    CONTENT.program.forEach(function (item, i) {
      var data = item[L()] || item.cs;
      var summary = el("summary", { class: "program-card__summary", children: [
        el("span", { class: "program-card__icon", text: item.icon || "", attrs: { "aria-hidden": "true" } }),
        el("h3",   { class: "program-card__title", text: data.title }),
        el("span", { class: "program-card__chevron", text: "▾", attrs: { "aria-hidden": "true" } }),
      ]});
      var body = el("div", { class: "program-card__body", children: [ el("p", { text: data.text }) ] });
      list.appendChild(el("details", { class: "program-card", children: [summary, body] }));
    });
  }

  /* ====================================================================== */
  /* 3) LIDÉ  —  the candidate photo cards                                   */
  /* ====================================================================== */
  function renderPeople() {
    var grid = document.getElementById("people-grid");
    clear(grid);
    CONTENT.people.forEach(function (p) {
      var data = p[L()] || p.cs;
      var isZeleni = (p.party || "").toLowerCase().indexOf("zelen") === 0;

      // The top accent follows the person's party, so the 8 cards read as
      // "a coalition of two parties" instead of one repeated stamp.
      var partyClass = isZeleni ? "person__photo--zeleni" : "person__photo--pirati";

      // Real photo. If the file isn't there yet, fall back to the logo so
      // the grid never shows a broken-image icon.
      var img = el("img", { attrs: { src: "assets/people/" + p.photo, alt: p.name, loading: "lazy", width: "300", height: "400" } });
      img.addEventListener("error", function () {
        img.src = "assets/logo-pirati-zeleni-icon.png?v=697fb10a";
        img.alt = "";
        img.classList.add("is-placeholder");
      }, { once: true });

      var photo = el("div", { class: "person__photo " + partyClass, children: [img] });

      var subtitleParts = [];
      if (p.age) subtitleParts.push(p.age + " let");
      if (data.profession) subtitleParts.push(data.profession);
      var subtitleEl = subtitleParts.length
        ? el("p", { class: "person__subtitle", text: subtitleParts.join(" · ") })
        : null;

      var info = el("div", { class: "person__info", children: [
        el("span", { class: "party-tag " + (isZeleni ? "party-tag--zeleni" : "party-tag--pirati"), text: p.party }),
        el("h3",   { class: "person__name", text: p.name }),
        subtitleEl,
        el("p",    { class: "person__bio", text: data.bio }),
      ]});

      grid.appendChild(el("article", { class: "person", children: [photo, info] }));
    });
  }

  /* ====================================================================== */
  /* 3b) OSTATNÍ KANDIDÁTI  —  expandable list below the 8 main cards       */
  /* ====================================================================== */
  function renderOtherCandidates() {
    var box = document.getElementById("people-other");
    clear(box);
    var others = CONTENT.people_other;
    if (!others || !others.length) return;

    var offset = CONTENT.people.length; // main candidates count (8), so list starts at 9
    var items = others.map(function (c, i) {
      var isZeleni = (c.party || "").toLowerCase().indexOf("zelen") === 0;
      var partyTag = c.party
        ? el("span", { class: "party-tag " + (isZeleni ? "party-tag--zeleni" : "party-tag--pirati"), text: c.party })
        : el("span", { class: "candidates-other__open" });
      return el("li", { class: "candidates-other__item", children: [
        el("span", { class: "candidates-other__pos", text: String(offset + i + 1) + "." }),
        partyTag,
        el("span", { class: "candidates-other__name" + (c.party ? "" : " candidates-other__name--open"), text: c.name }),
        el("span", { class: "candidates-other__prof", text: (c[L()] || c.cs || {}).profession || c.profession || "" }),
      ]});
    });

    var list = el("ul", { class: "candidates-other__list", children: items });
    var summary = el("summary", { class: "candidates-other__summary", children: [
      el("span", { text: t("other_candidates_label") + " (" + others.length + ")" }),
      el("span", { class: "candidates-other__chevron", text: "▾", attrs: { "aria-hidden": "true" } }),
    ]});
    box.appendChild(el("details", { class: "candidates-other", children: [summary, list] }));
  }

  /* ====================================================================== */
  /* 4) SETKEJME SE  —  4-event window with ◀ ▶ navigation                  */
  /* ====================================================================== */
  var _eventsStart = null; /* null = auto-detect anchor on first render */

  function renderEvents() {
    var container = document.getElementById("events-list");
    clear(container);

    var today = new Date(); today.setHours(0, 0, 0, 0);
    var all = CONTENT.events.slice().sort(function (a, b) {
      return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
    });
    if (!all.length) return;

    var PAGE = 4;
    var maxStart = Math.max(0, all.length - PAGE);

    /* On first render auto-scroll to the first upcoming event */
    if (_eventsStart === null) {
      _eventsStart = maxStart; /* default: show last PAGE if all past */
      for (var i = 0; i < all.length; i++) {
        if (new Date(all[i].date + "T00:00:00") >= today) {
          _eventsStart = Math.min(i, maxStart);
          break;
        }
      }
    }

    var start = Math.max(0, Math.min(_eventsStart, maxStart));
    var slice = all.slice(start, start + PAGE);

    function buildItem(ev, isNearest) {
      var data = ev[L()] || ev.cs;
      var isPast = new Date(ev.date + "T00:00:00") < today;
      var cls = "event" + (isPast ? " event--past" : "") + (isNearest ? " event--nearest" : "");

      var dateLine = el("span", { class: "event__date",
        text: formatDate(ev.date) + (ev.time ? " · " + ev.time : "") });
      if (isPast) dateLine.appendChild(el("span", { class: "event__badge", text: t("event_past") }));

      var bodyChildren = [
        dateLine,
        el("h3",  { class: "event__title", text: data.title }),
        el("div", { class: "event__place", text: data.place }),
        el("p",   { class: "event__desc",  text: data.desc }),
      ];
      if (ev.fb || ev.map) {
        var links = [];
        if (ev.fb)  links.push(el("a", { class: "event__link event__link--f", text: "f",
          attrs: { href: ev.fb,  target: "_blank", rel: "noopener noreferrer", title: "Facebook" } }));
        if (ev.map) links.push(el("a", { class: "event__link event__link--m", text: "m",
          attrs: { href: ev.map, target: "_blank", rel: "noopener noreferrer", title: "Mapy.com" } }));
        bodyChildren.push(el("div", { class: "event__links", children: links }));
      }
      var body = el("div", { children: bodyChildren });
      return el("li", { class: cls, children: [
        el("span", { class: "event__dot", attrs: { "aria-hidden": "true" } }), body,
      ]});
    }

    /* Timeline — nearest upcoming event gets the glowing dot */
    var nearestIdx = -1;
    for (var j = 0; j < slice.length; j++) {
      if (new Date(slice[j].date + "T00:00:00") >= today) { nearestIdx = j; break; }
    }

    var items = slice.map(function (ev, idx) { return buildItem(ev, idx === nearestIdx); });
    container.appendChild(el("ol", { class: "events", children: items }));

    /* Navigation — only when there are more events than PAGE */
    if (all.length > PAGE) {
      var canPrev = start > 0;
      var canNext = start + PAGE < all.length;

      var prevBtn = el("button", { class: "events-nav__btn", attrs: { type: "button" }, children: [
        el("span", { text: "▲", attrs: { "aria-hidden": "true" } }),
        el("span", { text: t("events_older") }),
      ]});
      var nextBtn = el("button", { class: "events-nav__btn", attrs: { type: "button" }, children: [
        el("span", { text: "▼", attrs: { "aria-hidden": "true" } }),
        el("span", { text: t("events_newer") }),
      ]});

      if (!canPrev) prevBtn.setAttribute("disabled", "disabled");
      if (!canNext) nextBtn.setAttribute("disabled", "disabled");

      prevBtn.addEventListener("click", function () {
        _eventsStart = Math.max(0, start - PAGE); renderEvents();
      });
      nextBtn.addEventListener("click", function () {
        _eventsStart = Math.min(maxStart, start + PAGE); renderEvents();
      });

      /* top nav (older) inserted BEFORE the timeline ol */
      container.insertBefore(
        el("div", { class: "events-nav events-nav--top", children: [prevBtn] }),
        container.querySelector("ol.events")
      );
      /* bottom nav (newer) appended AFTER */
      container.appendChild(el("div", { class: "events-nav events-nav--bottom", children: [nextBtn] }));
    }
  }

  /* ====================================================================== */
  /* 5) AKTUALITY  —  horizontal carousel, 3 at a time, newest left         */
  /* ====================================================================== */
  var _newsStart = null; /* null = auto, always open on newest */

  function renderNews() {
    var container = document.getElementById("news-grid");
    clear(container);

    /* sort newest-first so index 0 = most recent */
    var all = CONTENT.news.slice().sort(function (a, b) {
      return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
    });
    if (!all.length) return;

    var PAGE = window.innerWidth <= 480 ? 1 : 3;
    var maxStart = Math.max(0, all.length - PAGE);
    if (_newsStart === null) _newsStart = 0;
    var start = Math.max(0, Math.min(_newsStart, maxStart));
    var slice = all.slice(start, start + PAGE);

    var canPrev = start > 0;               /* can scroll to newer (left) */
    var canNext = start + PAGE < all.length; /* can scroll to older (right) */
    var atOldEnd = !canNext;

    function buildCard(n, isOldest) {
      var data = n[L()] || n.cs;
      var media = n.image
        ? el("img", { class: "news-card__media", attrs: { src: "assets/" + n.image, alt: data.title, loading: "lazy" } })
        : el("div", { class: "news-card__media media-placeholder", attrs: { "data-placeholder": "" } });
      var body = el("div", { class: "news-card__body", children: [
        el("span", { class: "news-card__date", text: formatDate(n.date) }),
        el("h3",   { class: "news-card__title", text: data.title }),
        el("p",    { class: "news-card__excerpt", text: data.excerpt }),
      ]});
      return el("article", {
        class: "news-card" + (isOldest ? " news-card--oldest" : ""),
        children: [media, body],
      });
    }

    var cards = slice.map(function (n, idx) {
      return buildCard(n, atOldEnd && idx === slice.length - 1 && all.length > PAGE);
    });

    var prevBtn = el("button", { class: "news-carousel__btn", text: "‹",
      attrs: { type: "button", "aria-label": t("events_newer") } });
    var nextBtn = el("button", { class: "news-carousel__btn", text: "›",
      attrs: { type: "button", "aria-label": t("events_older") } });

    if (!canPrev) prevBtn.setAttribute("disabled", "disabled");
    if (!canNext) nextBtn.setAttribute("disabled", "disabled");

    prevBtn.addEventListener("click", function () {
      _newsStart = Math.max(0, start - 1); renderNews();
    });
    nextBtn.addEventListener("click", function () {
      _newsStart = Math.min(maxStart, start + 1); renderNews();
    });

    container.appendChild(el("div", { class: "news-carousel", children: [
      prevBtn,
      el("div", { class: "news-cards", children: cards }),
      nextBtn,
    ]}));

    renderPlaceholders(); /* fill media-placeholder text for newly created cards */
  }

  /* ====================================================================== */
  /* 6) SPOJME SE  —  contact intro + e-mail / phone / social links          */
  /* ====================================================================== */
  function renderContact() {
    var c = CONTENT.config;

    // Intro paragraph next to the form
    var intro = document.getElementById("contact-intro");
    if (intro) intro.textContent = (CONTENT.contact[L()] || CONTENT.contact.cs).intro;

    // Details list
    var details = document.getElementById("contact-details");
    clear(details);

    if (c.email) {
      details.appendChild(el("li", { children: [
        el("span", { class: "label", text: t("form_email_label") }),
        el("a", { text: c.email, attrs: { href: "mailto:" + c.email } }),
      ]}));
    }
    if (c.phone) {
      details.appendChild(el("li", { children: [
        el("span", { class: "label", text: t("form_phone_label") }),
        el("a", { text: c.phone, attrs: { href: "tel:" + c.phone.replace(/\s+/g, "") } }),
      ]}));
    }
    var socials = socialLinks();
    if (socials.length) {
      var socialBox = el("div", { class: "contact__social" });
      socials.forEach(function (s) {
        socialBox.appendChild(el("a", { text: s.short, attrs: {
          href: s.url, target: "_blank", rel: "noopener noreferrer", "aria-label": s.label, title: s.label,
        }}));
      });
      details.appendChild(el("li", { children: [
        el("span", { class: "label", text: t("form_social_label") }), socialBox,
      ]}));
    }
  }

  /* Footer social icons (same links as the contact section) */
  function renderFooterSocial() {
    var ul = document.getElementById("footer-social");
    clear(ul);
    socialLinks().forEach(function (s) {
      ul.appendChild(el("li", { children: [
        el("a", { text: s.short, attrs: { href: s.url, target: "_blank", rel: "noopener noreferrer", "aria-label": s.label, title: s.label } }),
      ]}));
    });
  }

  /* ====================================================================== */
  /* 7) PŘÁTELÉ  (parent-party cards)                                        */
  /* ====================================================================== */
  function renderPartners() {
    var p = CONTENT.partners[L()] || CONTENT.partners.cs;
    var c = CONTENT.config;
    document.getElementById("partners-intro").textContent = p.intro;
    document.getElementById("partners-outro").textContent = p.outro;

    var list = document.getElementById("partners-list");
    clear(list);

    function card(modifier, name, links) {
      var linkBox = el("div", { class: "partner-card__links" });
      links.forEach(function (lk) {
        if (lk.url) linkBox.appendChild(el("a", { text: lk.label, attrs: { href: lk.url, target: "_blank", rel: "noopener noreferrer" } }));
      });
      return el("div", { class: "partner-card partner-card--" + modifier, children: [
        el("h3", { class: "partner-card__name", text: name }), linkBox,
      ]});
    }

    list.appendChild(card("pirati", "Česká pirátská strana", [
      { label: p.pirati_region,   url: c.piratiRegion },
      { label: p.pirati_national, url: c.piratiNational },
    ]));
    list.appendChild(card("zeleni", "Zelení", [
      { label: p.zeleni_region,   url: c.zeleniRegion },
      { label: p.zeleni_national, url: c.zeleniNational },
    ]));
  }

  /* ====================================================================== */
  /* Photo placeholders ("add a photo here later" boxes)                    */
  /* ====================================================================== */
  function renderPlaceholders() {
    document.querySelectorAll("[data-placeholder]").forEach(function (box) {
      clear(box);
      box.appendChild(el("span", { class: "ph-text", text: t("img_placeholder") }));
    });
  }

  /* ====================================================================== */
  /* Structured data — inject Person + Event JSON-LD once on first load    */
  /* ====================================================================== */
  var _structuredDataInjected = false;

  function renderStructuredData() {
    if (_structuredDataInjected) return;
    _structuredDataInjected = true;

    var BASE = "https://www.staryliskovec-on.cz/";
    var ORG  = BASE + "#organization";
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var graph = [];

    /* Person schema for each named top-8 candidate */
    CONTENT.people.forEach(function (p) {
      if (!p.name || p.name === "Volné místo") return;
      var entry = {
        "@type": "Person",
        "name": p.name,
        "memberOf": { "@id": ORG }
      };
      if (p.age) entry["age"] = p.age;
      if (p.cs && p.cs.profession) entry["jobTitle"] = p.cs.profession;
      graph.push(entry);
    });

    /* Event schema for upcoming events only */
    CONTENT.events.forEach(function (ev) {
      var evDate = new Date(ev.date + "T00:00:00");
      if (evDate < today) return;
      var data = ev.cs;
      var entry = {
        "@type": "Event",
        "name": data.title,
        "startDate": ev.date + (ev.time && ev.time.match(/^\d{1,2}:\d{2}$/) ? "T" + ev.time : ""),
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "location": {
          "@type": "Place",
          "name": data.place,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Brno",
            "addressRegion": "Jihomoravský kraj",
            "addressCountry": "CZ"
          }
        },
        "organizer": { "@id": ORG },
        "description": data.desc
      };
      graph.push(entry);
    });

    if (!graph.length) return;
    var script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
    document.head.appendChild(script);
  }

  /* ---- run everything ---- */
  function renderAll() {
    renderAbout();
    renderProgram();
    renderPeople();
    renderOtherCandidates();
    renderEvents();
    renderNews();
    renderContact();
    renderFooterSocial();
    renderPartners();
    renderPlaceholders();
    renderStructuredData();
  }

  /* Rebuild the lists whenever the language changes */
  document.addEventListener("slon:langchange", renderAll);

  /* expose for main.js (initial render) and for the tests */
  return { renderAll: renderAll };
})();

if (typeof window !== "undefined") { window.RENDER = RENDER; }
