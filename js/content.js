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
    facebook:         "https://www.facebook.com/pirati.staryliskovec/",
    instagram:        "https://www.instagram.com/pirati.staryliskovec/",
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
      hero_kicker:   "Komunální volby Brno — podzim 2026",
      hero_title_1:  "STARÝ LÍSKOVEC",
      hero_title_2:  "ON",
      hero_tagline:  "Otevřeně, nápaditě. Zapněte s námi Starý Lískovec!",
      hero_cta_1:    "Náš program",
      hero_cta_2:    "Setkejme se",
      hero_cta_share: "Sdílet",
      where_to_vote: "Kde volit?",
      hero_logo_alt: "Logo Starý Lískovec ON",

      // -- Section titles + lead sentences --
      about_title:    "O nás",
      about_lead:     "Koalice Pirátů a Zelených pro Brno-Starý Lískovec.",
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

      hero_kicker:   "Municipal elections Brno — autumn 2026",
      hero_title_1:  "STARÝ LÍSKOVEC",
      hero_title_2:  "ON",
      hero_tagline:  "Openly, creatively. Turn Starý Lískovec ON with us!",
      hero_cta_1:    "Our programme",
      hero_cta_2:    "Meet us",
      hero_cta_share: "Share",
      where_to_vote: "Where to vote?",
      hero_logo_alt: "Starý Lískovec ON logo",

      about_title:    "About us",
      about_lead:     "A coalition of the Pirates and the Greens for Brno-Starý Lískovec.",
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
      "Jsme tým lidí, kterým Brno-Starý Lískovec není lhostejný.",
      "Rádi bychom, aby byla radnice otevřena veřejnosti a městská část byla vedena transparentně, pečovalo se o veřejné prostranství a předcházelo se zbytečným poškozením majetku. Chceme, aby se v Brně-Starém Lískovci cítili dobře všichni občané, bez ohledu na to, zda zde žijí jako několikátá generace, nebo se přistěhovali letos, jsou senioři, děti nebo lidé se zdravotním omezením.",
      "Podporujeme aktivní životní styl, kvalitní vzdělávání a ochranu zeleně ve městě.",
      "Jsme tu pro vás, připraveni naslouchat a pracovat s plným nasazením.",
      "Jsme koalice Pirátů a Zelených.",
      "Děkujeme, že nám věříte a podporujete naši vizi pro Brno – Starý Lískovec.",
    ],
    en: [
      "We are a team of people who care about Brno-Starý Lískovec.",
      "We would like the town hall to be open to the public and the district to be run transparently, with proper care for public spaces and prevention of unnecessary damage to property. We want all residents of Brno-Starý Lískovec to feel at home, regardless of whether they have lived here for generations or moved in this year, whether they are seniors, children or people with health limitations.",
      "We support an active lifestyle, quality education and the protection of urban greenery.",
      "We are here for you, ready to listen and work with full commitment.",
      "We are a coalition of the Pirates and the Greens.",
      "Thank you for believing in us and supporting our vision for Brno – Starý Lískovec.",
    ],
  },

  /* ========================================================================
     4) PROGRAM  —  six priorities. Each "{ ... }" block is one point.
        To add a point, copy a whole block (including the comma) and edit it.
     ====================================================================== */
  program: [
    {
      icon: "",
      cs: {
        title: "Otevřený a přívětivý úřad",
        text:  "Úřad má být službou pro občany. Proto chceme zlepšit fungování úřadu a hlavně komunikaci s občany. Budeme naslouchat podnětům občanů a pořádat pravidelná setkání, aby občané věděli, s jakými problémy se na nás mohou obrátit a jak jim může být úřad nápomocen. Část rozpočtu chceme nabídnout pro projekty obyvatel v rámci participativního rozpočtu, abyste si mohli sami rozhodnout, co vám nejvíce chybí. Zvýšíme dostupnost úřadu zavedením úředních hodin každý den.",
      },
      en: {
        title: "An open, welcoming town hall",
        text:  "The town hall should be a service for residents. We want to improve how the office functions and above all how it communicates with citizens. We will listen to residents' suggestions and hold regular meetings so that people know what problems they can bring to us and how the office can help them. Part of the budget will be offered for residents' projects through a participatory budget, so that you can decide for yourselves what you need most. We will increase accessibility by introducing office hours every day.",
      },
    },
    {
      icon: "",
      cs: {
        title: "Živý a udržovaný veřejný prostor",
        text:  "Starý Lískovec je rozdělen na dvě části — starší zástavbu rodinných domů a zcela odlišné paneláky ze 70. let. Není ale důvod, aby byli stejně rozděleni i obyvatelé. Chceme, aby veřejný prostor patřil všem generacím a obyvatelům Starého Lískovce. Kromě oprav a výstavby ve veřejném prostoru je potřeba dbát především na údržbu — pečovat o vzrostlé stromy, aby se nemusely kácet, udržovat trávníky, zajistit bezpečný prostor na dětských hřištích a najít bezpečný a hezký prostor i pro starší generace. Budeme podporovat adopci zeleně a tvorbu předzahrádek na městských pozemcích. Chceme ekologizaci budov v majetku města instalací zelených střech a fasád a zavedením hospodaření s dešťovou vodou. V neposlední řadě musíme v Lískovci dbát na bezbariérovost.",
      },
      en: {
        title: "A lively, well-kept public space",
        text:  "Starý Lískovec is divided into two parts — the older family-house area and the very different panel blocks from the 1970s. But there is no reason for residents to be equally divided. We want public space to belong to all generations and all residents of Starý Lískovec. Beyond repairs and construction, maintenance must come first — caring for mature trees so they don't need to be felled, maintaining lawns, ensuring safe children's playgrounds, and finding safe, pleasant spaces for older generations too. We will support the adoption of greenery and the creation of front gardens on municipal land. We want to green city-owned buildings by installing green roofs and facades and introducing rainwater management. Last but not least, we must ensure full accessibility in Lískovec.",
      },
    },
    {
      icon: "",
      cs: {
        title: "Kvalitní školy a školky",
        text:  "Požadujeme kvalitní a dostupné mateřské školy i základní školy. Budeme podporovat moderní metody výuky a rozvoj kompetencí, které děti připraví na výzvy 21. století. Budeme naslouchat rodičům i dětem a pomáhat jim v řešení případných problémů ve školách i školkách. Dáme možnost dětem, aby se zapojily do veřejného prostoru. Chceme, aby se rodiče i děti cítili v Lískovci bezpečně. Poskytneme školám i školkám podporu pro zkvalitnění stravování. Otevřeme školní hřiště veřejnosti, tak jak je to běžné v jiných částech Brna.",
      },
      en: {
        title: "Quality nurseries and schools",
        text:  "We demand quality and accessible nurseries and primary schools. We will support modern teaching methods and the development of skills that prepare children for the challenges of the 21st century. We will listen to both parents and children and help them resolve any issues at schools and nurseries. We will give children the opportunity to engage with public spaces. We want parents and children to feel safe in Lískovec. We will provide schools and nurseries with support to improve the quality of catering. We will open school playgrounds to the public, as is common in other parts of Brno.",
      },
    },
    {
      icon: "",
      cs: {
        title: "Kultura, sport a komunita",
        text:  "Přispějeme ke vzniku a revitalizaci hřišť tak, aby pokrývala všechny věkové skupiny. Podpoříme různorodost kulturních a sportovních aktivit v Lískovci a zajistíme vznik komunitního centra, které bude sloužit místním spolkům a všem občanům pro setkávání. Vytvoříme zázemí pro pravidelné farmářské trhy. Zajistíme transparentní podporu spolků a rovné podmínky při jejím čerpání. Chceme úzce spolupracovat s pobočkou SVČ Lužánky Linka, Orlem, Sokolem a dalšími spolky, abychom zajistili volnočasové aktivity nejen pro děti.",
      },
      en: {
        title: "Culture, sport and community",
        text:  "We will contribute to the creation and revitalisation of playgrounds to cover all age groups. We will support the diversity of cultural and sports activities in Lískovec and ensure the creation of a community centre serving local associations and all residents as a meeting place. We will create a base for regular farmers' markets. We will ensure transparent support for associations and equal conditions for accessing it. We want to work closely with the SVČ Lužánky Linka branch, Orel, Sokol and other associations to ensure leisure activities not only for children.",
      },
    },
    {
      icon: "",
      cs: {
        title: "Plánování založené na datech",
        text:  "Rozhodování o rozvoji městské části musí být založeno na faktech a datech. Nechceme plýtvat prostředky na projekty, které nemají reálný přínos. Chceme dbát na efektivitu a udržitelnost investic. Pro údržbu a správu veřejného prostranství chceme zřídit vlastní četu. Budeme tak schopni rychleji reagovat na vaše podněty z aplikace na hlášení závad na městském majetku.",
      },
      en: {
        title: "Data-based planning",
        text:  "Decisions about the district's development must be based on facts and data. We do not want to waste resources on projects with no real benefit. We will insist on the efficiency and sustainability of investments. To maintain and manage public spaces, we want to establish our own maintenance crew. This will allow us to respond more quickly to your reports through the app for reporting defects on municipal property.",
      },
    },
    {
      icon: "",
      cs: {
        title: "Kvalitní obecní bydlení",
        text:  "Městská část má ve správě více než 600 bytů. Dohlédneme na transparentnost při přidělování bytů. Zajistíme, aby bylo důsledně ověřováno, zda žadatelé nejsou vlastníci jiné nemovitosti určené k bydlení, a aby byly prováděny kontroly užívání bytu, aby nemohlo docházet k podnájmu obecních bytů. Investujeme do bytového fondu, aby bydlení odpovídalo dnešní době. Budeme hlídat neplacení nájemného a tyto částky vymáhat. Zabráníme snahám o privatizaci obecních bytů.",
      },
      en: {
        title: "Quality municipal housing",
        text:  "The district manages more than 600 flats. We will oversee transparency in the allocation of flats. We will ensure that applicants are consistently checked to confirm they do not own another residential property, and that occupancy checks are carried out to prevent the subletting of municipal flats. We will invest in the housing stock to bring accommodation up to today's standards. We will monitor non-payment of rent and pursue these amounts. We will prevent attempts to privatise municipal flats.",
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
      age: 34,
      cs: { profession: "geoinformatička, předsedkyně spolku Blechy v kožichu z.s., zastupitelka ve Starém Lískovci, poslankyně PČR", bio: "Vendula stála u zrodu spolku Blechy v kožichu, který se stará o kulturní a vzdělávací rozruch ve Starém Lískovci. Před rodičovskou dovolenou se věnovala datové analýze. Od roku 2022 je zastupitelkou ve Starém Lískovci. Pro Lískovec by si přála, aby konečně ožil a přestal být hřištěm jen pro vládnoucí garnituru." },
      en: { profession: "geoinformaticist, chair of Blechy v kožichu association, Starý Lískovec councillor, MP", bio: "Vendula co-founded Blechy v kožichu, an association bringing cultural and educational life to Starý Lískovec. Before her parental leave she worked in data analysis. She has been a councillor in Starý Lískovec since 2022. Her wish for the district is that it finally comes alive and stops being a playground reserved for the ruling clique." },
    },
    {
      name: "Michala Martišková", party: "Piráti", photo: "michala-martiskova.jpg",
      age: 42,
      cs: { profession: "advokátka", bio: "Michala je advokátka se zaměřením na bytové právo a zastupování dětí a mladistvých v trestním řízení. Ve volném čase se snaží oživit Starý Lískovec, ať už jako členka spolku Blechy v kožichu nebo jako vedoucí oddílu rodičů s dětmi v místním Sokole. V Lískovci žije 14 let a byla by ráda, aby přestal být pro občany jen anonymní noclehárnou, aby se tu lépe žilo, sousedé se znali a mohli se potkávat v příjemném a bezpečném veřejném prostranství." },
      en: { profession: "lawyer", bio: "Michala is a lawyer specialising in housing law and representation of children and young people in criminal proceedings. In her free time she works to enliven Starý Lískovec — as a member of Blechy v kožichu and leader of the parents-with-children section at the local Sokol. She has lived here 14 years and would love the district to stop being an anonymous dormitory, and become a place where neighbours know each other and meet in pleasant, safe public spaces." },
    },
    {
      name: "Martin Novák", party: "Piráti", photo: "martin-novak.jpg",
      cs: { bio: "Bio bude doplněno." },
      en: { bio: "Bio to be added." },
    },
    {
      name: "Jan Novotný", party: "Piráti", photo: "jan-novotny.jpg",
      age: 42,
      cs: { profession: "vědecký pracovník", bio: "Starý Lískovec zná od dětství, vychodil ZŠ Labská, posledních 10 let bydlí na ulici Kosmonautů. Má zkušenosti z obecního a krajského zastupitelstva (2014–2024). Vzhledem k vzdělání (doktorát z aplikované matematiky) a civilnímu povolání v oddělení dálkového průzkumu na Ústavu výzkumu globální změny AVČR má silný vztah především k mapám, datové analýze a oblasti životního prostředí. Kromě důsledné péče o veřejnou zeleň a realizace opatření reagujících na změny klimatu včetně těch nejdrobnějších by se rád zaměřil na promyšlený územní rozvoj, volnočasové aktivity dětí a otevřenou komunikaci samosprávy s občany. Ve volném čase má rád výlety s dětmi českou přírodou a realizuje se jako řešitel a autor sudoku a logických úloh." },
      en: { profession: "researcher", bio: "Jan has known Starý Lískovec since childhood, attended ZŠ Labská primary school, and has lived on Kosmonautů Street for the past ten years. He has experience from municipal and regional councils (2014–2024). His doctoral degree in applied mathematics and work in the remote-sensing department of the Global Change Research Institute (AVČR) give him a strong connection to maps, data analysis and environmental topics. Alongside thorough care for public greenery and climate-adaptation measures — including the smallest ones — he would like to focus on thoughtful spatial development, leisure activities for children and open communication between local government and residents. In his free time he enjoys trips through the Czech countryside with his children and is active as a solver and author of sudoku and logic puzzles." },
    },
    {
      name: "Anna Kohutková", party: "Zelení", photo: "anna-kohutkova.jpg",
      age: 39,
      cs: { profession: "lékárnice", bio: "Anna ve Starém Lískovci bydlí téměř celý život, s manželem zde vychovává dceru a již několik let tady i pracuje. Ráda se prochází místními zákoutími a sní o tom, jak by se v Lískovci mohlo žít ještě lépe. A teď už nechce zůstat jen u snů." },
      en: { profession: "pharmacist", bio: "Anna has lived in Starý Lískovec for almost her entire life, where she and her husband are raising their daughter — and where she has worked for several years too. She loves exploring local nooks and dreaming of how life in Lískovce could be even better. And now she no longer wants to stay merely at the dreaming stage." },
    },
    {
      name: "Ayudh Ray", party: "Piráti", photo: "ayudh-ray.jpg",
      cs: { bio: "Bio bude doplněno." },
      en: { bio: "Bio to be added." },
    },
    {
      name: "Kateřina Křížová", party: "Piráti", photo: "katerina-krizova.jpg",
      age: 30,
      cs: { profession: "asistentka pedagoga, studentka PedF", bio: "Ve Starém Lískovci s malou přestávkou bydlí celý svůj život. Nyní zde s manželem vychovává dvě děti, díky kterým zjistila, že je kulturní život důležitou součástí. Jako zakládající členka spolku Blechy v kožichu se snaží oživit kulturní prostředí a spojit komunitu v naší městské části." },
      en: { profession: "teaching assistant, student of pedagogy", bio: "Kateřina has lived in Starý Lískovec for almost her entire life. She is now raising two children here with her husband, and through them discovered just how important cultural life really is. As a founding member of Blechy v kožichu she works to revive the cultural scene and bring the community in our district together." },
    },
    {
      name: "Jakub Czapek", party: "Piráti", photo: "czapek-jakub.jpg",
      cs: { bio: "Bio bude doplněno." },
      en: { bio: "Bio to be added." },
    },
  ],

  /* ========================================================================
     5b) OSTATNÍ KANDIDÁTI  —  positions 9–21 on the election list.
         Only name, party and profession are shown (no photo, no bio).
         Use party: "" and profession: "" for open/unfilled slots.
     ====================================================================== */
  people_other: [
    { name: "Jitka Filipová",      party: "Piráti", profession: "doplníme" },
    { name: "Jakub Dlabaja",       party: "Zelení", profession: "doplníme" },
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
      cs: { title: "Komunitní úklid parku \"Pod sídlištěm\"", place: "Park Pod sídlištěm", desc: "Společně vyčistíme prostor pro rekreaci." },
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
