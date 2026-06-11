/* ==========================================================================
   content.js  —  ⭐ THE ONLY FILE YOU NEED TO EDIT TO CHANGE THE WEBSITE TEXT
   ==========================================================================

   Everything you read on the website lives here, in Czech (cs) and English (en)
   side by side. To change a word on the site:

     1. Find the section below (they are in BIG CAPITAL HEADERS).
     2. Edit the text between the "quotation marks".
     3. Keep the quotation marks, the commas, and the { } brackets exactly as they are.
     4. Save the file. (If you use GitHub's website, just press "Commit changes".)

   GOLDEN RULES (so you never break the page):
     • Only change the text INSIDE "double quotes".
     • Never delete a comma, a colon ( : ), or a bracket  { } [ ].
     • If a piece of text itself needs a quote mark, write \" (a backslash first).
     • Czech accents (á č ř ž …) are fine — the file is saved as UTF-8.

   The tests (see README) will tell you in plain language if a bracket/comma
   went missing, so don't be afraid to experiment.
   ========================================================================== */

const CONTENT = {

  /* ========================================================================
     1) CONFIG  —  links, e-mail, phone, form connections.
        Replace every "TODO…" with the real value when you have it.
        Until then the site still works; buttons just point to a placeholder.
     ====================================================================== */
  config: {
    email:            "slon@staryliskovec-on.cz",    // your campaign e-mail
    phone:            "",                            // hidden — no phone support
    facebook:         "https://facebook.com/",       // your Facebook page URL (or "" to hide)
    instagram:        "https://instagram.com/",      // your Instagram URL (or "" to hide)
    twitter:          "",                            // X/Twitter URL (empty = hidden)
    youtube:          "",                            // YouTube channel URL (empty = hidden)

    // Working contact form. Create a free form at https://formspree.io, then paste
    // ONLY the code from your form URL here (the part after /f/). Example: "xpzgkqab".
    // Leave as "" and the form falls back to opening the visitor's e-mail app instead.
    formspreeId:      "xvznwgqr",

    // Newsletter sign-up. Paste the "form action" URL from your e-mail tool
    // (Mailchimp / Ecomail / MailerLite). Leave "" to disable the newsletter box.
    newsletterAction: "",

    // Links to the parent parties (Přátelé section).
    piratiRegion:   "https://jihomoravsky.pirati.cz/",
    piratiNational: "https://www.pirati.cz/",
    zeleniRegion:   "",
    zeleniNational: "https://www.zeleni.cz/",
  },

  /* ========================================================================
     2) UI STRINGS  —  short interface texts: menu, buttons, section titles,
        form labels, footer. Two columns: cs (Czech) and en (English).
        The KEY on the left (e.g. nav_program) must stay the SAME in both
        languages — only translate the text on the right.
     ====================================================================== */
  ui: {
    cs: {
      // -- Dev disclaimer banner (remove the text or set to "" to hide the banner) --
      dev_banner: "🚧 Tato stránka je ve vývoji. Obsah není finální a může se měnit.",

      // -- Navigation menu --
      nav_about:     "O nás",
      nav_program:   "Program",
      nav_people:    "Lidé",
      nav_meet:      "Setkejme se",
      nav_news:      "Kronika",
      nav_contact:   "Spojme se",
      nav_partners:  "Přátelé",

      // -- Hero (top banner) --
      hero_kicker:   "Komunální volby — podzim 2026",
      hero_title_1:  "STARÝ LÍSKOVEC",
      hero_title_2:  "ON",
      hero_tagline:  "Otevřeně, nápaditě. Koalice Pirátů a Zelených pro náš Starý Lískovec.",
      hero_cta_1:    "Náš program",
      hero_cta_2:    "Setkejme se",
      hero_logo_alt: "Logo Starý Lískovec ON",

      // -- Section titles + lead sentences --
      about_title:    "O nás",
      about_lead:     "Kdo jsme a co nás spojuje.",
      program_title:  "Program",
      program_lead:   "Šest priorit pro lepší Starý Lískovec. Klikněte na bod a rozbalte detail.",
      people_title:   "Lidé",
      people_lead:    "Klikněte na slona a odhalte, kdo se skrývá za naším týmem.",
      meet_title:     "Setkejme se",
      meet_lead:      "Přijďte za námi do ulic. Těšíme se na vás.",
      event_past:     "Proběhlo",
      events_older:   "Starší",
      events_newer:   "Novější",
      news_title:     "Kronika",
      news_lead:      "Příběhy z naší kampaně.",
      contact_title:  "Spojme se",
      contact_lead:   "Ozvěte se nám. Každá zpráva, komentář i sdílení nám pomáhá.",
      partners_title: "Přátelé",
      partners_lead:  "Jsme součástí celku. Hrdě se hlásíme k našim mateřským stranám.",

      // -- People (flip-card) --
      card_flip_to_photo:    "Zobrazit fotografii",
      card_flip_to_elephant: "Zpět na slona",
      card_hint:             "Klikněte pro odhalení",
      other_candidates_label: "Další kandidáti",

      // -- Contact form --
      form_name:        "Jméno",
      form_email:       "E-mail",
      form_message:     "Zpráva",
      form_send:        "Odeslat",
      form_sending:     "Odesílám…",
      form_success:     "Děkujeme! Vaše zpráva byla odeslána.",
      form_error:       "Zprávu se nepodařilo odeslat. Zkuste to prosím znovu nebo nám napište přímo.",
      form_required:    "Vyplňte prosím všechna pole.",
      form_email_label: "Napište nám:",
      form_phone_label: "Zavolejte nám:",
      form_social_label:"Sledujte nás:",

      // -- Newsletter --
      news_signup_title: "Odebírejte novinky",
      news_signup_text:  "Nechte nám e-mail a my vám dáme vědět, co se v kampani děje.",
      news_signup_btn:   "Přihlásit se",
      news_signup_ok:    "Hotovo! Děkujeme za přihlášení.",

      // -- Footer + misc --
      lang_label:     "Jazyk",
      skip_link:      "Přeskočit na obsah",
      back_to_top:    "Nahoru",
      footer_about:   "Koalice Pirátů a Zelených pro městskou část Brno-Starý Lískovec.",
      footer_rights:  "Vytvořeno s nasazením pro Starý Lískovec.",
      footer_nav:     "Rozcestník",
      menu_open:      "Otevřít menu",
      menu_close:     "Zavřít menu",
      img_placeholder:"Místo pro fotografii — doplníme brzy",
    },

    en: {
      // -- Dev disclaimer banner --
      dev_banner: "🚧 This page is under development. Content is not final and may change.",

      nav_about:     "About",
      nav_program:   "Programme",
      nav_people:    "People",
      nav_meet:      "Meet us",
      nav_news:      "Story Book",
      nav_contact:   "Get in touch",
      nav_partners:  "Friends",

      hero_kicker:   "Municipal elections — autumn 2026",
      hero_title_1:  "STARÝ LÍSKOVEC",
      hero_title_2:  "ON",
      hero_tagline:  "Open and novel. A coalition of the Pirates and the Greens for our Starý Lískovec.",
      hero_cta_1:    "Our programme",
      hero_cta_2:    "Meet us",
      hero_logo_alt: "Starý Lískovec ON logo",

      about_title:    "About us",
      about_lead:     "Who we are and what brings us together.",
      program_title:  "Programme",
      program_lead:   "Six priorities for a better Starý Lískovec. Click a point to expand it.",
      people_title:   "People",
      people_lead:    "Click the elephant to reveal who is behind our team.",
      meet_title:     "Meet us",
      meet_lead:      "Come and find us out in the streets. We look forward to seeing you.",
      event_past:     "Done",
      events_older:   "Older",
      events_newer:   "Newer",
      news_title:     "Story Book",
      news_lead:      "Stories from our campaign.",
      contact_title:  "Get in touch",
      contact_lead:   "Reach out to us. Every message, comment and share helps.",
      partners_title: "Friends",
      partners_lead:  "We are part of something bigger. We proudly stand with our parent parties.",

      card_flip_to_photo:    "Show photo",
      card_flip_to_elephant: "Back to elephant",
      card_hint:             "Click to reveal",
      other_candidates_label: "More candidates",

      form_name:        "Name",
      form_email:       "E-mail",
      form_message:     "Message",
      form_send:        "Send",
      form_sending:     "Sending…",
      form_success:     "Thank you! Your message has been sent.",
      form_error:       "The message could not be sent. Please try again or e-mail us directly.",
      form_required:    "Please fill in all fields.",
      form_email_label: "Write to us:",
      form_phone_label: "Call us:",
      form_social_label:"Follow us:",

      news_signup_title: "Subscribe to updates",
      news_signup_text:  "Leave us your e-mail and we'll keep you posted on the campaign.",
      news_signup_btn:   "Subscribe",
      news_signup_ok:    "Done! Thank you for subscribing.",

      lang_label:     "Language",
      skip_link:      "Skip to content",
      back_to_top:    "Top",
      footer_about:   "A coalition of the Pirates and the Greens for the Brno-Starý Lískovec district.",
      footer_rights:  "Made with dedication for Starý Lískovec.",
      footer_nav:     "Quick links",
      menu_open:      "Open menu",
      menu_close:     "Close menu",
      img_placeholder:"Space for a photo — coming soon",
    },
  },

  /* ========================================================================
     3) O NÁS  —  the "About us" paragraphs. Add or remove lines freely;
        just keep each line wrapped in "quotes" and separated by commas.
     ====================================================================== */
  about: {
    cs: [
      "Jsme tým lidí, kterým není lhostejné místo, kde společně žijeme.",
      "Spojují nás hodnoty otevřenosti, transparentnosti a udržitelného rozvoje.",
      "Věříme, že Starý Lískovec může být moderní a přívětivou obcí.",
      "Naši kandidáti zastupují široké spektrum odbornosti od školství až po zdravotnictví.",
      "Pracujeme pro vás s důrazem na efektivní a férovou správu naší městské části.",
      "Naše politika vychází z reálných dat a potřeb našich sousedů.",
      "Podporujeme aktivní životní styl, kvalitní vzdělávání a ochranu naší přírody.",
      "Každý hlas je pro nás důležitý a společně můžeme dosáhnout změny k lepšímu.",
      "Jsme tu pro vás, připraveni naslouchat a pracovat s plným nasazením.",
      "Děkujeme, že nám věříte a podporujete naši vizi pro Starý Lískovec.",
    ],
    en: [
      "We are a team of people who care about the place where we live together.",
      "We are united by the values of openness, transparency and sustainable development.",
      "We believe that Starý Lískovec can be a modern and welcoming municipality.",
      "Our candidates bring expertise across many fields, from education to healthcare.",
      "We work for you with an emphasis on efficient and fair governance of our district.",
      "Our politics is grounded in real data and the needs of our neighbours.",
      "We support an active lifestyle, quality education and the protection of our nature.",
      "Every vote matters to us, and together we can achieve a change for the better.",
      "We are here for you, ready to listen and to work with full commitment.",
      "Thank you for trusting us and supporting our vision for Starý Lískovec.",
    ],
  },

  /* ========================================================================
     4) PROGRAM  —  six priorities. Each "{ ... }" block is one point.
        To add a point, copy a whole block (including the comma) and edit it.
     ====================================================================== */
  program: [
    {
      icon: "🏛️",
      cs: {
        title: "Otevřený a přívětivý úřad",
        text:  "Úřad musí být místem, kam občané chodí s důvěrou a kde dostanou veškerou potřebnou pomoc. Prosazujeme transparentní rozhodování a maximální otevřenost všech procesů, které ovlivňují život v naší obci. Digitalizaci úřadu posuneme zavedením on-line rezervačního systému a zpřístupněním participativního rozpočtu pro návrhy občanů. Aktivně budeme naslouchat podnětům občanů prostřednictvím pravidelných setkání a transparentních dashboardů s postupem řešení jejich připomínek.",
      },
      en: {
        title: "An open, welcoming town hall",
        text:  "The town hall must be a place people come to with confidence and where they receive all the help they need. We push for transparent decision-making and maximum openness in every process that affects life in our district. We will advance the digitalisation of the office with an online booking system and a participatory budget open to residents' proposals. We will actively listen to residents through regular meetings and transparent dashboards showing how their suggestions are being handled.",
      },
    },
    {
      icon: "🎒",
      cs: {
        title: "Kvalitní školky a školy",
        text:  "Vzdělávání našich dětí je nejlepší investicí do budoucnosti, proto klademe důraz na dostupnost a kvalitu školských zařízení. Prioritou je navýšení kapacit mateřských škol a modernizace infrastruktury základních škol, včetně rekonstrukce jídelen pro zdravé stravování. Podporujeme moderní metody výuky a rozvoj kompetencí, které děti připraví na výzvy 21. století. Škola musí být bezpečným a podnětným prostředím s moderními dětskými hřišti, kde se děti cítí dobře a rozvíjejí svůj potenciál.",
      },
      en: {
        title: "Quality nurseries and schools",
        text:  "Educating our children is the best investment in the future, so we focus on the availability and quality of schools. Our priority is to increase nursery-school capacity and modernise primary-school infrastructure, including renovating canteens for healthy meals. We support modern teaching methods and the skills that prepare children for the challenges of the 21st century. A school must be a safe and stimulating environment with modern playgrounds, where children feel good and develop their potential.",
      },
    },
    {
      icon: "🌳",
      cs: {
        title: "Živý a udržovaný veřejný prostor",
        text:  "Veřejný prostor tvoří srdce naší komunity, proto chceme, aby byl čistý, zelený a přístupný všem generacím. Pravidelná údržba parků a modernizace kontejnerových stání je pro nás prioritou, která zvyšuje komfort bydlení v naší obci. Aktivně budeme realizovat opatření proti klimatické změně, jako je výsadba vzrostlé zeleně pro zmírnění tepelných ostrovů a instalace zasakovacích prvků. Naším cílem je vytvářet prostředí, kde se lidé cítí bezpečně, příjemně a hrdě se ke svému místu hlásí.",
      },
      en: {
        title: "A lively, well-kept public space",
        text:  "Public space is the heart of our community, so we want it clean, green and accessible to all generations. Regular upkeep of parks and the modernisation of waste-collection points is a priority that improves the comfort of living here. We will actively implement measures against climate change, such as planting mature greenery to ease urban heat islands and installing rainwater-soakage features. Our goal is to create an environment where people feel safe, comfortable and proud to call this place home.",
      },
    },
    {
      icon: "🎭",
      cs: {
        title: "Kultura pro všechny generace",
        text:  "Kultura spojuje lidi a vytváří jedinečnou atmosféru naší obce, proto chceme podporovat pestrou nabídku akcí pro všechny věkové skupiny. Vytvoříme zázemí pro pravidelné farmářské trhy a budeme iniciovat vznik komunitního centra, které bude sloužit místním spolkům a sousedským iniciativám. Finanční podpora kulturních aktivit musí být spravedlivá a transparentní, aby kultura nebyla jen privilegiem některých. Kulturní život v obci chceme rozvíjet tak, aby se každý cítil zván a mohl se aktivně zapojit do jeho tvorby.",
      },
      en: {
        title: "Culture for every generation",
        text:  "Culture brings people together and gives our district its unique atmosphere, so we want to support a varied programme of events for all ages. We will create a base for regular farmers' markets and initiate a community centre serving local clubs and neighbourhood initiatives. Financial support for cultural activities must be fair and transparent, so that culture is not a privilege of the few. We want to grow cultural life so that everyone feels invited and can take an active part in shaping it.",
      },
    },
    {
      icon: "📊",
      cs: {
        title: "Plánování založené na datech",
        text:  "Rozhodování o rozvoji obce musí být založeno na faktech, datech a důkladných analýzách potřeb obyvatel. Zavedeme veřejně přístupný GIS systém pro přehledné plánování území a dashboardy monitorující reálný stav dopravy a kvality ovzduší. Nechceme plýtvat prostředky na projekty, které nemají reálný přínos, proto budeme dbát na efektivitu a udržitelnost každé investice. Transparentní nakládání s daty zvýší důvěru v naše rozhodování a umožní občanům sledovat výsledky naší práce v reálném čase.",
      },
      en: {
        title: "Data-based planning",
        text:  "Decisions about the district's development must rest on facts, data and a thorough analysis of residents' needs. We will introduce a publicly accessible GIS system for clear land-use planning and dashboards monitoring the real state of traffic and air quality. We do not want to waste money on projects with no real benefit, so we will insist on the efficiency and sustainability of every investment. Transparent handling of data will increase trust in our decisions and let residents follow the results of our work in real time.",
      },
    },
    {
      icon: "🏠",
      cs: {
        title: "Kvalitní obecní bydlení",
        text:  "Dostupnost bydlení je jedním z klíčových faktorů spokojeného života, proto chceme rozvíjet kvalitní a cenově dostupné obecní bydlení. Zaměříme se na energeticky úsporné modernizace stávajícího bytového fondu a výstavbu nových bytových jednotek šetrných k životnímu prostředí. Naším cílem je, aby v obci mohly důstojně žít mladé rodiny, senioři i lidé v obtížné životní situaci. Zavedeme naprosto jasná, spravedlivá a veřejně kontrolovatelná pravidla pro přidělování obecních bytů.",
      },
      en: {
        title: "Quality municipal housing",
        text:  "Affordable housing is one of the key factors of a contented life, so we want to develop quality, affordable municipal housing. We will focus on energy-saving upgrades to the existing housing stock and on building new, environmentally friendly homes. Our goal is for young families, seniors and people in difficult situations to live here with dignity. We will introduce completely clear, fair and publicly verifiable rules for allocating municipal flats.",
      },
    },
  ],

  /* ========================================================================
     5) LIDÉ  —  the candidates. One "{ ... }" block per person.
        • name / party  → shown the same in both languages.
        • party         → write exactly "Piráti" or "Zelení" (controls the colour tag).
        • photo         → file name inside assets/people/  (lower-case, no spaces).
        • bio           → the Czech (cs) and English (en) description.
        To add a candidate: copy a block, drop their photo into assets/people/,
        and set the matching "photo" file name.
     ====================================================================== */
  people: [
    {
      name: "Vendula Svobodová", party: "Piráti", photo: "vendula-svobodova.jpg",
      cs: { bio: "Vendula se dlouhodobě věnuje rozvoji naší městské části a prosazování transparentní politiky. Jako stávající zastupitelka má bohaté zkušenosti s řešením podnětů občanů v oblasti dopravy a veřejného prostoru. Její prioritou je otevřený úřad, který komunikuje s lidmi a aktivně řeší jejich potřeby. Věří v sílu komunitního života a podporu místních spolků pro lepší sousedské vztahy." },
      en: { bio: "Vendula has long worked on the development of our district and the promotion of transparent politics. As a current councillor she has rich experience handling residents' concerns about transport and public space. Her priority is an open town hall that communicates with people and actively addresses their needs. She believes in the strength of community life and in supporting local clubs for better neighbourly relations." },
    },
    {
      name: "Michala Martišková", party: "Piráti", photo: "michala-martiskova.jpg",
      cs: { bio: "Michala je zkušená politička, která se zaměřuje především na oblast školství a sociálních služeb v naší městské části. Aktivně prosazuje rozšiřování kapacit mateřských škol a modernizaci vzdělávací infrastruktury pro naše děti. Její přístup kombinuje odbornou přípravu a empatii k potřebám rodin ve Starém Lískovci. Usiluje o to, aby naše obec byla místem, kde se všem generacím žije kvalitně a bezpečně." },
      en: { bio: "Michala is an experienced politician who focuses above all on education and social services in our district. She actively promotes expanding nursery-school capacity and modernising educational infrastructure for our children. Her approach combines professional preparation with empathy for the needs of families in Starý Lískovec. She strives to make our district a place where every generation lives well and safely." },
    },
    {
      name: "Martin Novák", party: "Piráti", photo: "martin-novak.jpg",
      cs: { bio: "Martin se v komunální politice soustředí na efektivní nakládání s obecními prostředky a rozvoj moderní infrastruktury. Jeho odbornost v oblasti dat a plánování využívá při prosazování smysluplných investic do dopravy a energeticky úsporného bydlení. Věří, že správa obce musí být založena na faktech a důsledné kontrole, nikoliv na líbivých slibech. Aktivně se podílí na projektech, které zvyšují kvalitu veřejného prostoru v okolí našeho bydliště." },
      en: { bio: "In local politics Martin concentrates on the efficient use of municipal funds and the development of modern infrastructure. He uses his expertise in data and planning to promote meaningful investment in transport and energy-efficient housing. He believes governance must be based on facts and rigorous oversight, not on attractive promises. He takes an active part in projects that improve the quality of public space around our homes." },
    },
    {
      name: "Jan Novotný", party: "Piráti", photo: "jan-novotny.jpg",
      cs: { bio: "Jan je aktivním členem zastupitelstva, který klade velký důraz na udržitelnost a ochranu životního prostředí v našem okolí. Prosazuje konkrétní opatření pro zmírnění dopadů klimatické změny, jako je výsadba zeleně a péče o místní parky. Jako zkušený politik se nebojí otevírat náročná témata a hledat konsenzus pro dobro všech obyvatel Starého Lískovce. Jeho cílem je rozvíjet obec tak, aby byla odolná, zelená a moderní pro příští generace." },
      en: { bio: "Jan is an active member of the council who places great emphasis on sustainability and protecting the environment around us. He promotes concrete measures to ease the impacts of climate change, such as planting greenery and caring for local parks. As an experienced politician he is not afraid to open difficult topics and seek consensus for the good of all residents of Starý Lískovec. His goal is to develop the district to be resilient, green and modern for generations to come." },
    },
    {
      name: "Anna Kohutková", party: "Zelení", photo: "anna-kohutkova.jpg",
      cs: { bio: "Anna přináší do našeho týmu nový pohled jako odbornice v oblasti zdravotnictví, kde působí jako lékárnice v síti BENU. Věří v důležitost prevence a dostupnosti kvalitní zdravotní péče pro občany všech věkových kategorií v našem obvodu. Své profesní zkušenosti s jednáním s lidmi využije při naslouchání vašim podnětům a potřebám v oblasti sociální a zdravotní prevence. Spojení odbornosti a zájmu o věci veřejné ji vede ke kandidatuře za Zelené s cílem podpořit zdravější Starý Lískovec." },
      en: { bio: "Anna brings a fresh perspective to our team as a healthcare professional, working as a pharmacist in the BENU network. She believes in the importance of prevention and access to quality healthcare for residents of every age in our district. She will use her professional experience of working with people to listen to your suggestions and needs in social and health prevention. Combining expertise with a concern for public affairs leads her to stand for the Greens, with the goal of supporting a healthier Starý Lískovec." },
    },
    {
      name: "Ayudh Ray", party: "Piráti", photo: "ayudh-ray.jpg",
      cs: { bio: "Bio bude doplněno." },
      en: { bio: "Bio to be added." },
    },
    {
      name: "Kateřina Křížová", party: "Piráti", photo: "katerina-krizova.jpg",
      cs: { bio: "Bio bude doplněno." },
      en: { bio: "Bio to be added." },
    },
    {
      name: "Jakub Czapek", party: "Piráti", photo: "czapek-jakub.jpg",
      cs: { bio: "Jakub je architekt a urbanista, spoluzakladatel studia zaměřeného na udržitelnou architekturu a plánování veřejného prostoru v Brně. Prosazuje otevřenou, participativní přípravu investičních projektů, kde mají občané skutečný vliv na podobu svého okolí. Svou odborností přispívá k rozvoji kvalitnějšího veřejného prostoru, moderních škol i dostupného bydlení. Věří, že funkční architektura a zapojená komunita jsou základem dlouhodobě prosperující čtvrti." },
      en: { bio: "Jakub is an architect and urban planner, co-founder of a studio specialising in sustainable architecture and public-space design in Brno. He champions open, participatory project planning where residents genuinely shape the outcome for their own neighbourhood. His expertise informs proposals for quality public spaces, modern schools and accessible housing. He believes that functional architecture and an engaged community are the foundation of a long-term thriving district." },
    },
  ],

  /* ========================================================================
     5b) OSTATNÍ KANDIDÁTI  —  positions 9–21 on the election list.
         Only name, party and profession are shown (no photo, no bio).
         Use party: "" and profession: "" for open/unfilled slots.
     ====================================================================== */
  people_other: [
    { name: "Jitka Filipová",      party: "Piráti", profession: "doplníme" },
    { name: "Jakub Dlabaja",       party: "Zelení", profession: "manažer" },
    { name: "Václav Maliňák",      party: "Piráti", profession: "doplníme" },
    { name: "Volné místo",         party: "",        profession: "" },
    { name: "Volné místo",         party: "",        profession: "" },
    { name: "Volné místo",         party: "",        profession: "" },
    { name: "Aleš Máchal",         party: "Zelení", profession: "doplníme" },
    { name: "Volné místo",         party: "",        profession: "" },
    { name: "Volné místo",         party: "",        profession: "" },
    { name: "Volné místo",         party: "",        profession: "" },
    { name: "Volné místo",         party: "",        profession: "" },
    { name: "Volné místo",         party: "",        profession: "" },
    { name: "Blažek Hlaváčková",   party: "Piráti", profession: "doplníme" },
  ],

  /* ========================================================================
     6) SETKEJME SE  —  campaign events. One "{ ... }" block per event.
        • date  → ISO format "YYYY-MM-DD" (used to sort and show the date nicely).
        • time  → free text, shown as-is (e.g. "17:00" or "dopoledne").
        Past events automatically get a faded "proběhlo / past" style.
     ====================================================================== */
  events: [
    /* --- past events (dates before launch, kept for the record) --- */
    { date: "2026-04-15", time: "17:00",
      cs: { title: "Zahájení kampaně — kickoff", place: "Kulturní dům Starý Lískovec", desc: "Slavnostní zahájení naší kampaně. Přišlo přes sto sousedů — moc děkujeme!" },
      en: { title: "Campaign launch — kickoff", place: "Starý Lískovec community centre", desc: "The festive launch of our campaign. Over a hundred neighbours joined us — thank you!" } },
    { date: "2026-05-10", time: "10:00",
      cs: { title: "Jarní úklid parku Pod sídlištěm", place: "Park Pod sídlištěm", desc: "Dobrovolný úklid s velkou účastí — posbírali jsme přes 15 pytlů odpadu." },
      en: { title: "Spring clean-up of Pod sídlištěm park", place: "Pod sídlištěm park", desc: "Volunteer clean-up with great turnout — we collected over 15 bags of rubbish." } },
    { date: "2026-05-28", time: "17:00",
      cs: { title: "Diskuse o budoucnosti Slánské ulice", place: "Kavárna Na Rohu", desc: "Živá debata se 40 obyvateli o rekonstrukci chodníků a plánované cyklotrase." },
      en: { title: "Discussion on the future of Slánská street", place: "Na Rohu café", desc: "Lively debate with 40 residents on pavement renovation and the planned cycle path." } },
    { date: "2026-06-05", time: "14:00",
      cs: { title: "Komunitní den u sokolovny", place: "Prostor u sokolovny", desc: "Odpoledne plné sousedských aktivit, hry pro děti a volná debata o dění v obvodu." },
      en: { title: "Community day at the Sokol hall", place: "By the Sokol hall", desc: "An afternoon of neighbourhood activities, games for children and an open debate on district life." } },
    /* --- upcoming events --- */
    { date: "2026-08-08", time: "dopoledne",
      cs: { title: "Komunitní úklid parku „Pod sídlištěm“", place: "Park Pod sídlištěm", desc: "Společně vyčistíme prostor pro rekreaci." },
      en: { title: "Community clean-up of \"Pod sídlištěm\" park", place: "Pod sídlištěm park", desc: "Together we'll tidy up the space for recreation." } },
    { date: "2026-08-13", time: "17:00",
      cs: { title: "Veřejná diskuse o dopravě a parkování", place: "Před místní knihovnou", desc: "Otevřená debata o tom, co vás na cestách trápí." },
      en: { title: "Public debate on transport and parking", place: "In front of the local library", desc: "An open debate about what troubles you on the roads." } },
    { date: "2026-08-22", time: "10:00",
      cs: { title: "Sportovní den s dětmi", place: "Sportovní hřiště u ZŠ Labská", desc: "Dopoledne plné pohybu a her pro celé rodiny." },
      en: { title: "Sports day with children", place: "Sports field by Labská primary school", desc: "A morning full of movement and games for the whole family." } },
    { date: "2026-08-27", time: "17:00",
      cs: { title: "Door-to-door kampaň na sídlišti", place: "Sídliště", desc: "Diskuse s občany přímo u nich doma." },
      en: { title: "Door-to-door campaign on the estate", place: "The housing estate", desc: "Talking with residents right at their doorstep." } },
    { date: "2026-09-05", time: "14:00",
      cs: { title: "Komentovaná prohlídka historie Starého Lískovce", place: "Sraz u kostela sv. Jana Nepomuckého", desc: "Projděme se společně dějinami naší obce." },
      en: { title: "Guided tour of Starý Lískovec's history", place: "Meeting at St John of Nepomuk church", desc: "Let's walk through the history of our district together." } },
    { date: "2026-09-10", time: "17:00",
      cs: { title: "Veřejné čtení pro děti a rodiče v parku", place: "U dětského hřiště v centrální části", desc: "Příběhy pod širým nebem pro malé i velké." },
      en: { title: "Public reading for children and parents in the park", place: "By the playground in the central part", desc: "Stories under the open sky for young and old." } },
    { date: "2026-09-13", time: "15:00",
      cs: { title: "Sousedské odpoledne s diskusí", place: "Prostor u sokolovny", desc: "Posezení, povídání a sdílení nápadů." },
      en: { title: "Neighbourhood afternoon with a discussion", place: "By the Sokol hall", desc: "Sitting together, chatting and sharing ideas." } },
    { date: "2026-09-17", time: "17:00",
      cs: { title: "Door-to-door kampaň v zóně rodinných domků", place: "Zóna rodinných domků", desc: "Osobní rozhovory o rozvoji vaší ulice." },
      en: { title: "Door-to-door campaign in the family-house area", place: "The family-house zone", desc: "Personal conversations about the future of your street." } },
    { date: "2026-09-20", time: "10:00",
      cs: { title: "Úklid okolí tramvajové zastávky", place: "Tramvajová zastávka", desc: "Péče o vizuální čistotu hlavního vstupu do obce." },
      en: { title: "Clean-up around the tram stop", place: "The tram stop", desc: "Caring for the look of the main gateway to the district." } },
    { date: "2026-09-24", time: "17:00",
      cs: { title: "Závěrečná diskuse pod širým nebem", place: "Náměstíčko u nákupního střediska", desc: "Poslední setkání před volbami — přijďte se rozloučit i popovídat." },
      en: { title: "Closing open-air discussion", place: "The small square by the shopping centre", desc: "Our last meeting before the elections — come to chat and say hello." } },
  ],

  /* ========================================================================
     7) AKTUALITY (NEWS)  —  placeholder posts. Replace with real updates
        during the campaign. One "{ ... }" block per post; newest first.
        • image → file in assets/  (or "" to show a branded placeholder).
     ====================================================================== */
  news: [
    { date: "2026-03-01", image: "",
      cs: { title: "Koalice Piráti + Zelení vzniká", excerpt: "Oznamujeme vznik koalice pro komunální volby 2026 ve Starém Lískovci pod názvem SLON — Starý Lískovec ON. Jsme rádi, že stojíme společně." },
      en: { title: "Pirates + Greens coalition formed", excerpt: "We announce the formation of our coalition for the 2026 municipal elections in Starý Lískovec under the name SLON — Starý Lískovec ON." } },
    { date: "2026-04-20", image: "",
      cs: { title: "Zahájili jsme přípravy kampaně", excerpt: "Scházíme se pravidelně a připravujeme program, vizuální identitu a plán setkání s občany. Děkujeme všem dobrovolníkům za pomoc!" },
      en: { title: "Campaign preparations under way", excerpt: "We are meeting regularly and preparing our programme, visual identity and plan for citizen meetings. Thank you to all our volunteers!" } },
    { date: "2026-05-15", image: "",
      cs: { title: "Kandidátní listina potvrzena", excerpt: "Naše kandidátní listina 21 kandidátů za koalici Piráti + Zelení je úředně zaregistrována na Magistrátu města Brna. Jdeme do voleb!" },
      en: { title: "Candidate list confirmed", excerpt: "Our 21-candidate Pirates + Greens coalition list has been officially registered with Brno City Hall. We're running!" } },
    { date: "2026-06-01", image: "",
      cs: { title: "Spustili jsme naši kampaň!", excerpt: "Vítejte na našich nových stránkách. V příštích týdnech zde najdete novinky z kampaně, pozvánky na akce a naše postoje k dění ve Starém Lískovci." },
      en: { title: "Our campaign is live!", excerpt: "Welcome to our new website. Over the coming weeks you'll find campaign news, event invitations and our positions on what's happening in Starý Lískovec here." } },
    { date: "2026-06-15", image: "",
      cs: { title: "Představujeme náš program", excerpt: "Zveřejnili jsme šest programových priorit pro lepší Starý Lískovec. Přečtěte si je v sekci Program a dejte nám vědět, co si o nich myslíte." },
      en: { title: "Introducing our programme", excerpt: "We've published six priorities for a better Starý Lískovec. Read them in the Programme section and let us know what you think." } },
    { date: "2026-07-01", image: "",
      cs: { title: "Brzy se potkáme v ulicích", excerpt: "Připravili jsme řadu setkání, úklidů a diskusí. Podívejte se do sekce Setkejme se a přijďte si s námi popovídat naživo." },
      en: { title: "We'll meet you in the streets soon", excerpt: "We've prepared a series of meetings, clean-ups and discussions. Check the Meet us section and come and talk to us in person." } },
  ],

  /* ========================================================================
     7b) SPOJME SE (CONTACT)  —  the introduction next to the contact form.
         The e-mail, phone and social links themselves come from "config" above.
     ====================================================================== */
  contact: {
    cs: { intro: "Máte dotaz, podnět nebo nám chcete pomoci s kampaní? Neváhejte se na nás obrátit! Jsme tu pro vás a rádi si vyslechneme vaše názory na rozvoj našeho Starého Lískovce." },
    en: { intro: "Do you have a question, a suggestion, or would you like to help with the campaign? Don't hesitate to get in touch! We're here for you and happy to hear your views on the future of our Starý Lískovec." },
  },

  /* ========================================================================
     8) PŘÁTELÉ (PARTNERS)  —  intro paragraph + the parent-party blocks.
        Links come from the "config" section at the top of this file.
     ====================================================================== */
  partners: {
    cs: {
      intro: "Naše kandidátka spojuje síly pro rozvoj Starého Lískovce. Hrdě se hlásíme k hodnotám a celostátnímu programu našich mateřských stran, které nám poskytují zázemí a podporu.",
      outro: "Společně prosazujeme moderní a udržitelný rozvoj nejen v naší městské části, ale i v celém regionu a České republice.",
      pirati_region:   "Piráti Jihomoravského kraje",
      pirati_national: "Česká pirátská strana",
      zeleni_region:   "Zelení v Jihomoravském kraji",
      zeleni_national: "Strana zelených",
    },
    en: {
      intro: "Our candidate list joins forces for the development of Starý Lískovec. We proudly stand by the values and national programme of our parent parties, which give us a base and support.",
      outro: "Together we promote modern, sustainable development not only in our district, but across the whole region and the Czech Republic.",
      pirati_region:   "Pirates of the South Moravian Region",
      pirati_national: "Czech Pirate Party",
      zeleni_region:   "Greens of the South Moravian Region",
      zeleni_national: "The Green Party",
    },
  },

};

/* Make the content available to the other scripts (and to the tests).
   (Do not edit this line.) */
if (typeof window !== "undefined") { window.CONTENT = CONTENT; }
if (typeof module !== "undefined") { module.exports = CONTENT; }
