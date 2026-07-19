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
    email:            "info@pirati-zeleni-liskovec.cz",    // your campaign e-mail
    phone:            "",                            // hidden — no phone support
    facebook:         "https://www.facebook.com/pirati.staryliskovec/",
    instagram:        "https://www.instagram.com/pirati.staryliskovec/",
    twitter:          "",                            // X/Twitter URL (empty = hidden)
    youtube:          "",                            // YouTube channel URL (empty = hidden)

    // Working contact form. Create a free form at https://formspree.io, then paste
    // ONLY the code from your form URL here (the part after /f/). Example: "xpzgkqab".
    // Leave as "" and the form falls back to opening the visitor's e-mail app instead.
    formspreeId:      "xpqvqdzl",                     // Formspree form for info@pirati-zeleni-liskovec.cz

    // Newsletter sign-up. Paste the "form action" URL from your e-mail tool
    // (Mailchimp / Ecomail / MailerLite). Leave "" to disable the newsletter box.
    newsletterAction: "",

    // Links to the parent parties (Přátelé section).
    piratiRegion:   "https://jihomoravsky.pirati.cz/",
    piratiNational: "https://www.pirati.cz/",
    zeleniRegion:   "",
    zeleniNational: "https://www.zeleni.cz/",

    // Set to false in prod (publish script flips this) to hide the incomplete candidate list.
    show_other_candidates: false,
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
      dev_banner: "",

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
      hero_title_1:  "PIRÁTI",
      hero_title_2:  "A ZELENÍ",
      hero_tagline:  "Otevřeně, nápaditě. Zapojte se s námi!",
      hero_cta_1:    "Náš program",
      hero_cta_2:    "Setkejme se",
      hero_cta_share: "Sdílet",
      where_to_vote: "Kde volit?",
      hero_logo_alt: "Logo Piráti a Zelení pro Lískovec",

      // -- Section titles + lead sentences --
      about_title:    "O nás",
      about_lead:     "Koalice Pirátů a Zelených pro Brno – Starý Lískovec.",
      program_title:  "Program",
      program_lead:   "Šest priorit pro lepší Starý Lískovec. Klikněte na bod a rozbalte detail.",
      people_title:   "Lidé",
      people_lead:    "Lidé, kteří za tímto programem stojí.",
      meet_title:     "Setkejme se",
      meet_lead:      "Přijďte za námi do ulic. Těšíme se na vás.",
      event_past:     "Proběhlo",
      events_older:   "Předchozí",
      events_newer:   "Následující",
      news_title:     "Kronika",
      news_lead:      "Příběhy z naší kampaně.",
      contact_title:  "Spojme se",
      contact_lead:   "Ozvěte se nám. Každá zpráva, komentář i sdílení nám pomáhá.",
      partners_title: "Přátelé",
      partners_lead:  "Jsme součástí celku. Hrdě se hlásíme k našim mateřským stranám.",

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
      footer_about:   "Koalice Pirátů a Zelených pro městskou část Brno – Starý Lískovec.",
      footer_rights:  "Vytvořeno s nasazením pro Starý Lískovec.",
      footer_credit:  "Web vytváříme vlastními silami s pomocí umělé inteligence. Našli jste chybu nebo nepřesnost? Dejte nám prosím vědět na ",
      footer_nav:     "Rozcestník",
      menu_open:      "Otevřít menu",
      menu_close:     "Zavřít menu",
      img_placeholder:"Místo pro fotografii — doplníme brzy",
    },

    en: {
      // -- Dev disclaimer banner --
      dev_banner: "",

      nav_about:     "About",
      nav_program:   "Programme",
      nav_people:    "People",
      nav_meet:      "Meet us",
      nav_news:      "Story Book",
      nav_contact:   "Get in touch",
      nav_partners:  "Friends",

      hero_kicker:   "Municipal elections Brno — autumn 2026",
      hero_title_1:  "PIRATES",
      hero_title_2:  "AND GREENS",
      hero_tagline:  "Openly, creatively. Get involved with us!",
      hero_cta_1:    "Our programme",
      hero_cta_2:    "Meet us",
      hero_cta_share: "Share",
      where_to_vote: "Where to vote?",
      hero_logo_alt: "Piráti a Zelení pro Lískovec logo",

      about_title:    "About us",
      about_lead:     "A coalition of the Pirates and the Greens for Brno – Starý Lískovec.",
      program_title:  "Programme",
      program_lead:   "Six priorities for a better Starý Lískovec. Click a point to expand it.",
      people_title:   "People",
      people_lead:    "The people behind this programme.",
      meet_title:     "Meet us",
      meet_lead:      "Come and find us on the streets. We look forward to seeing you.",
      event_past:     "Done",
      events_older:   "Previous",
      events_newer:   "Next",
      news_title:     "Story Book",
      news_lead:      "Stories from our campaign.",
      contact_title:  "Get in touch",
      contact_lead:   "Reach out to us. Every message, comment and share helps.",
      partners_title: "Friends",
      partners_lead:  "We are part of something bigger. We proudly stand with our parent parties.",

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
      footer_about:   "A coalition of the Pirates and the Greens for the Brno – Starý Lískovec district.",
      footer_rights:  "Made with dedication for Starý Lískovec.",
      footer_credit:  "We are building this site ourselves with the help of artificial intelligence. Found an error or an inaccuracy? Please let us know at ",
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
      "Jsme tým lidí, kterým Brno – Starý Lískovec není lhostejný.",
      "Rádi bychom, aby byla radnice otevřena veřejnosti a městská část byla vedena transparentně, pečovalo se o veřejné prostranství a předcházelo se zbytečným poškozením majetku. Chceme, aby se v Brně-Starém Lískovci cítili dobře všichni občané, bez ohledu na to, zda zde žijí jako několikátá generace, nebo se přistěhovali letos, jsou senioři, děti nebo lidé se zdravotním omezením.",
      "Podporujeme aktivní životní styl, kvalitní vzdělávání a ochranu zeleně ve městě.",
      "Jsme tu pro vás, připraveni naslouchat a pracovat s plným nasazením.",
      "Jsme koalice Pirátů a Zelených.",
      "Děkujeme, že nám věříte a podporujete naši vizi pro Brno – Starý Lískovec.",
    ],
    en: [
      "We are a team of people who care about Brno – Starý Lískovec.",
      "We would like the town hall to be open to the public and the district to be run transparently, with proper care for public spaces and prevention of unnecessary damage to property. We want all residents of Brno – Starý Lískovec to feel at home, regardless of whether they have lived here for generations or moved in this year, whether they are seniors, children or people with health limitations.",
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
        text:  "We call for quality, accessible nurseries and primary schools. We will support modern teaching methods and the development of skills that prepare children for the challenges of the 21st century. We will listen to both parents and children and help them resolve any issues at schools and nurseries. We will give children the opportunity to engage with public spaces. We want parents and children to feel safe in Lískovec. We will provide schools and nurseries with support to improve the quality of catering. We will open school playgrounds to the public, as is common in other parts of Brno.",
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
        text:  "We will contribute to the creation and revitalisation of playgrounds to cover all age groups. We will support diverse cultural and sports activities in Lískovec and establish a community centre serving local associations and all residents as a meeting place. We will create a permanent home for regular farmers' markets. We will ensure transparent support for associations and equal access to that support. We want to work closely with the SVČ Lužánky Linka branch, Orel, Sokol and other associations to ensure leisure activities not only for children.",
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
        text:  "Decisions about the district's development must be based on facts and data. We do not want to waste resources on projects with no real benefit. We will insist on the efficiency and sustainability of investments. To maintain and manage public spaces, we want to establish our own maintenance crew. This will allow us to respond more quickly to your reports submitted through the municipal defect-reporting app.",
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
        text:  "The district manages more than 600 flats. We will oversee transparency in the allocation of flats. We will ensure that applicants are routinely verified to ensure they do not own another residential property, and that occupancy checks are carried out to prevent the subletting of municipal flats. We will invest in the housing stock to bring accommodation up to today's standards. We will monitor non-payment of rent and pursue unpaid rent. We will prevent attempts to privatise municipal flats.",
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
      en: { profession: "geoinformatics specialist, chair of Blechy v kožichu association, Starý Lískovec councillor, MP", bio: "Vendula co-founded Blechy v kožichu, an association bringing cultural and educational life to Starý Lískovec. Before her parental leave she worked in data analysis. She has been a councillor in Starý Lískovec since 2022. Her wish for the district is that it finally comes alive and stops being a playground reserved for the ruling clique." },
    },
    {
      name: "Michala Martišková", party: "Piráti", photo: "michala-martiskova.jpg",
      age: 42,
      cs: { profession: "advokátka", bio: "Michala je advokátka se zaměřením na bytové právo a zastupování dětí a mladistvých v trestním řízení. Ve volném čase se snaží oživit Starý Lískovec, ať už jako členka spolku Blechy v kožichu nebo jako vedoucí oddílu rodičů s dětmi v místním Sokole. V Lískovci žije 14 let a byla by ráda, aby přestal být pro občany jen anonymní noclehárnou, aby se tu lépe žilo, sousedé se znali a mohli se potkávat v příjemném a bezpečném veřejném prostranství." },
      en: { profession: "lawyer", bio: "Michala is a lawyer specialising in housing law and representation of children and young people in criminal proceedings. In her free time she works to enliven Starý Lískovec — as a member of Blechy v kožichu and leader of the parents-with-children section at the local Sokol. She has lived here 14 years and would love the district to stop being an anonymous dormitory, and become a place where neighbours know each other and meet in pleasant, safe public spaces." },
    },
    {
      name: "Martin Novák", party: "Piráti", photo: "martin-novak.jpg",
      age: 36,
      cs: { profession: "dopravní inženýr, zastupitel ve Starém Lískovci", bio: "Martin má vlastní firmu, se kterou navrhuje veřejná prostranství pro malé obce i náměstí v několika krajských městech. Své zkušenosti by rád využil i v Lískovci, ze kterého by chtěl udělat bezpečné místo s prostorem pro setkávání a kulturou pro všechny věkové kategorie. Pokud ho nepotkáte na dětském hřišti nebo při běhu, bude to nejspíš tím, že je zrovna někde na cestách — je totiž cestovatel." },
      en: { profession: "transport engineer, Starý Lískovec councillor", bio: "Martin runs his own firm designing public spaces — from small villages to squares in several regional cities. He would like to put that experience to use in Lískovec too, turning it into a safe place with room to meet and culture for all ages. If you don't run into him at a playground or out for a run, he's probably off travelling somewhere — he's a keen traveller at heart." },
    },
    {
      name: "Jan Novotný", party: "Piráti", photo: "jan-novotny.jpg",
      age: 42,
      cs: { profession: "vědecký pracovník", bio: "Jan zná Starý Lískovec od dětství — chodil do ZŠ Labská a posledních deset let bydlí na Kosmonautů. Má zkušenosti z obecního a krajského zastupitelstva (2014–2024). Jako vědec s doktorátem z aplikované matematiky, který se věnuje dálkovému průzkumu Země, má blízko k mapám, datům a životnímu prostředí. Chtěl by se zaměřit na péči o zeleň, promyšlený rozvoj čtvrti, volný čas dětí a otevřenou komunikaci radnice s občany. Ve volném čase vyráží s dětmi do české přírody a tvoří sudoku a logické úlohy." },
      en: { profession: "researcher", bio: "Jan has known Starý Lískovec since childhood — he attended ZŠ Labská and has lived on Kosmonautů Street for the past ten years. He has experience from municipal and regional councils (2014–2024). A scientist with a doctorate in applied mathematics who works in Earth remote sensing, he has a natural affinity for maps, data and the environment. He'd like to focus on caring for greenery, thoughtful development of the district, leisure for children, and open communication between the town hall and residents. In his free time he heads into the Czech countryside with his kids and creates sudoku and logic puzzles." },
    },
    {
      name: "Anna Kohutková", party: "Zelení", photo: "anna-kohutkova.jpg",
      age: 39,
      cs: { profession: "lékárnice", bio: "Anna ve Starém Lískovci bydlí téměř celý život, s manželem zde vychovává dceru a již několik let pracuje v lékárně na místní poliklinice. Ráda se prochází místními zákoutími a sní o tom, jak by se v Lískovci mohlo žít ještě lépe. Baví ji povídat si s lidmi a poslouchat jejich příběhy." },
      en: { profession: "pharmacist", bio: "Anna has lived in Starý Lískovec for almost her entire life, where she and her husband are raising their daughter — and where she has worked for several years at the pharmacy in the local polyclinic. She loves exploring local nooks and dreaming of how life in Lískovec could be even better. She enjoys chatting with people and listening to their stories." },
    },
    {
      name: "Ayudh Ray", party: "Piráti", photo: "ayudh-ray.jpg",
      age: 21,
      cs: { profession: "student, koordinátor Mladého Pirátstva", bio: "Ayudh je student Fakulty sociálních věd Univerzity Karlovy. Je koordinátorem Mladého Pirátstva v Jihomoravském kraji a bývalým 1. místopředsedou Krajského studentského sněmu Jihomoravského kraje. Dlouhodobě se věnuje participaci mladých lidí a jednal s krajskými institucemi. Během války na Ukrajině pomáhal s integrací uprchlíků výukou češtiny. Jeho prioritou je kvalitní veřejný prostor, dostupná doprava a více prostoru pro mladé lidi." },
      en: { profession: "student, Young Pirates coordinator", bio: "Ayudh is a student at the Faculty of Social Sciences, Charles University. He is the coordinator of Young Pirates in the South Moravian Region and a former 1st Vice-Chair of the Regional Student Senate of the South Moravian Region. He has long focused on youth participation and has engaged with regional institutions. During the war in Ukraine he helped refugees integrate by teaching Czech. His priorities are quality public spaces, accessible transport and more room for young people." },
    },
    {
      name: "Kateřina Křížová", party: "Piráti", photo: "katerina-krizova.jpg",
      age: 30,
      cs: { profession: "asistentka pedagoga, studentka PedF", bio: "Kateřina ve Starém Lískovci s malou přestávkou bydlí celý svůj život. Nyní zde s manželem vychovává dvě děti, díky kterým zjistila, jak důležitou součástí života je kultura. Jako zakládající členka spolku Blechy v kožichu se snaží oživit kulturní prostředí a spojit komunitu v naší městské části." },
      en: { profession: "teaching assistant, student of pedagogy", bio: "Kateřina has lived in Starý Lískovec for almost her entire life. She is now raising two children here with her husband, and through them discovered just how important cultural life really is. As a founding member of Blechy v kožichu she works to revive the cultural scene and bring the community in our district together." },
    },
    {
      name: "Hana Blažek Hlaváčková", party: "Piráti", photo: "hana-blazek-hlavackova.jpg",
      age: 36,
      cs: { profession: "datová analytička", bio: "Hana je vystudovaná učitelka, ale většinu pracovního života věnovala datové analýze a správě systémů v mezinárodní firmě. Nyní je na rodičovské dovolené. Ve volném čase ráda čte, kreativně tvoří s dětmi a jezdí na výlety. Ve Starém Lískovci by ráda viděla komunitu pro všechny věkové kategorie, která by se navzájem podporovala." },
      en: { profession: "data analyst", bio: "Hana trained as a teacher but spent most of her career in data analysis and systems administration at an international company. She is currently on parental leave. In her free time she enjoys reading, creative activities with her children and day trips. In Starý Lískovec she would love to see a community that spans all age groups and supports one another." },
    },
  ],

  /* ========================================================================
     5b) OSTATNÍ KANDIDÁTI  —  positions 9–21 on the election list.
         Only name, party and profession are shown (no photo, no bio).
         Use party: "" and profession: "" for open/unfilled slots.
     ====================================================================== */
  people_other: [
    { name: "Jakub Czapek",        party: "Piráti", profession: "doplníme" },
    { name: "Jakub Dlabaja",       party: "Zelení", age: 27,
      cs: { profession: "koordinátor servisních operací" },
      en: { profession: "service operations coordinator" } },
    { name: "Jitka Filipová",      party: "Piráti", profession: "doplníme" },
    { name: "Volné místo",         party: "",        profession: "" },
    { name: "Volné místo",         party: "",        profession: "" },
    { name: "Volné místo",         party: "",        profession: "" },
    { name: "Aleš Máchal",         party: "Zelení", age: 74,
      cs: { profession: "ekopedagog, důchodce" },
      en: { profession: "eco-educator, retired" } },
    { name: "Volné místo",         party: "",        profession: "" },
    { name: "Volné místo",         party: "",        profession: "" },
    { name: "Volné místo",         party: "",        profession: "" },
    { name: "Volné místo",         party: "",        profession: "" },
    { name: "Volné místo",         party: "",        profession: "" },
    { name: "Volné místo",         party: "",        profession: "" },
  ],

  /* ========================================================================
     6) SETKEJME SE  —  campaign events. One "{ ... }" block per event.
        • date  → ISO format "YYYY-MM-DD" (used to sort and show the date nicely).
        • time  → free text, shown as-is (e.g. "17:00" or "dopoledne").
        Past events automatically get a faded "proběhlo / past" style.

        Optional, used only for Google's Event structured data:
        • host             → real-world organizer, e.g. "Blechy v kožichu z.s.",
                              when it's someone else's event we're just promoting.
                              Omit when the coalition itself is organizing.
        • durationMinutes  → overrides the 2h default event length.
        • price            → overrides the "free" (0 CZK) default.
        • image            → "assets/" + image, same convention as news items;
                              falls back to the shared OG image if omitted.
     ====================================================================== */
  events: [
    { date: "2026-07-20", time: "17:30",
      fb:  "https://www.facebook.com/blechyvkozichu/",
      host: "Blechy v kožichu z.s.",
      map: "https://mapy.com/cs/turisticka?source=base&id=2569303&x=16.5598997&y=49.1681551&z=19&ovl=3",
      cs: { title: "Blechy čtou dětem", place: "Červené hřiště", desc: "Každé prázdninové pondělí v 17:30 čtou Blechy v kožichu z.s. dětem na Červeném hřišti naproti Potrefené huse. Knížky vyberte na jejich Facebooku." },
      en: { title: "Blechy čtou dětem", place: "Červené hřiště", desc: "Every summer-holiday Monday at 17:30, Blechy v kožichu z.s. read to children at Červené hřiště opposite Potrefená husa. Choose the book on their Facebook page." } },
    { date: "2026-07-27", time: "17:30",
      fb:  "https://www.facebook.com/blechyvkozichu/",
      host: "Blechy v kožichu z.s.",
      map: "https://mapy.com/cs/turisticka?source=base&id=2569303&x=16.5598997&y=49.1681551&z=19&ovl=3",
      cs: { title: "Blechy čtou dětem", place: "Červené hřiště", desc: "Každé prázdninové pondělí v 17:30 čtou Blechy v kožichu z.s. dětem na Červeném hřišti naproti Potrefené huse. Knížky vyberte na jejich Facebooku." },
      en: { title: "Blechy čtou dětem", place: "Červené hřiště", desc: "Every summer-holiday Monday at 17:30, Blechy v kožichu z.s. read to children at Červené hřiště opposite Potrefená husa. Choose the book on their Facebook page." } },
    { date: "2026-08-03", time: "17:30",
      fb:  "https://www.facebook.com/blechyvkozichu/",
      host: "Blechy v kožichu z.s.",
      map: "https://mapy.com/cs/turisticka?source=base&id=2569303&x=16.5598997&y=49.1681551&z=19&ovl=3",
      cs: { title: "Blechy čtou dětem", place: "Červené hřiště", desc: "Každé prázdninové pondělí v 17:30 čtou Blechy v kožichu z.s. dětem na Červeném hřišti naproti Potrefené huse. Knížky vyberte na jejich Facebooku." },
      en: { title: "Blechy čtou dětem", place: "Červené hřiště", desc: "Every summer-holiday Monday at 17:30, Blechy v kožichu z.s. read to children at Červené hřiště opposite Potrefená husa. Choose the book on their Facebook page." } },
    { date: "2026-08-10", time: "17:30",
      fb:  "https://www.facebook.com/blechyvkozichu/",
      host: "Blechy v kožichu z.s.",
      map: "https://mapy.com/cs/turisticka?source=base&id=2569303&x=16.5598997&y=49.1681551&z=19&ovl=3",
      cs: { title: "Blechy čtou dětem", place: "Červené hřiště", desc: "Každé prázdninové pondělí v 17:30 čtou Blechy v kožichu z.s. dětem na Červeném hřišti naproti Potrefené huse. Knížky vyberte na jejich Facebooku." },
      en: { title: "Blechy čtou dětem", place: "Červené hřiště", desc: "Every summer-holiday Monday at 17:30, Blechy v kožichu z.s. read to children at Červené hřiště opposite Potrefená husa. Choose the book on their Facebook page." } },
    { date: "2026-08-17", time: "17:30",
      fb:  "https://www.facebook.com/blechyvkozichu/",
      host: "Blechy v kožichu z.s.",
      map: "https://mapy.com/cs/turisticka?source=base&id=2569303&x=16.5598997&y=49.1681551&z=19&ovl=3",
      cs: { title: "Blechy čtou dětem", place: "Červené hřiště", desc: "Každé prázdninové pondělí v 17:30 čtou Blechy v kožichu z.s. dětem na Červeném hřišti naproti Potrefené huse. Knížky vyberte na jejich Facebooku." },
      en: { title: "Blechy čtou dětem", place: "Červené hřiště", desc: "Every summer-holiday Monday at 17:30, Blechy v kožichu z.s. read to children at Červené hřiště opposite Potrefená husa. Choose the book on their Facebook page." } },
    { date: "2026-08-24", time: "17:30",
      fb:  "https://www.facebook.com/blechyvkozichu/",
      host: "Blechy v kožichu z.s.",
      map: "https://mapy.com/cs/turisticka?source=base&id=2569303&x=16.5598997&y=49.1681551&z=19&ovl=3",
      cs: { title: "Blechy čtou dětem", place: "Červené hřiště", desc: "Každé prázdninové pondělí v 17:30 čtou Blechy v kožichu z.s. dětem na Červeném hřišti naproti Potrefené huse. Knížky vyberte na jejich Facebooku." },
      en: { title: "Blechy čtou dětem", place: "Červené hřiště", desc: "Every summer-holiday Monday at 17:30, Blechy v kožichu z.s. read to children at Červené hřiště opposite Potrefená husa. Choose the book on their Facebook page." } },
    { date: "2026-08-31", time: "17:30",
      fb:  "https://www.facebook.com/blechyvkozichu/",
      host: "Blechy v kožichu z.s.",
      map: "https://mapy.com/cs/turisticka?source=base&id=2569303&x=16.5598997&y=49.1681551&z=19&ovl=3",
      cs: { title: "Blechy čtou dětem", place: "Červené hřiště", desc: "Každé prázdninové pondělí v 17:30 čtou Blechy v kožichu z.s. dětem na Červeném hřišti naproti Potrefené huse. Knížky vyberte na jejich Facebooku." },
      en: { title: "Blechy čtou dětem", place: "Červené hřiště", desc: "Every summer-holiday Monday at 17:30, Blechy v kožichu z.s. read to children at Červené hřiště opposite Potrefená husa. Choose the book on their Facebook page." } },
  ],

  /* ========================================================================
     7) AKTUALITY (NEWS)  —  placeholder posts. Replace with real updates
        during the campaign. One "{ ... }" block per post; newest first.
        • image → file in assets/  (or "" to show a branded placeholder).
     ====================================================================== */
  news: [
    { date: "2026-07-13", image: "news-blechy-kdysi-strom.jpg",
      cs: { title: "Blechy čtou dětem - Kdysi jsem byla strom", excerpt: "V pondělí 13. července jsme se opět sešli v hojném počtu na červeném hřišti. Děti s nadšením poslouchaly příběh knihy samotné o tom, jak přišla na svět. Čtení se tentokrát ujal Jan Novotný. Po pohádce vedla Michala Martišková osvěžující zvířecí rozcvičku." },
      en: { title: "Blechy Read to Kids - Once I Was a Tree", excerpt: "On Monday 13 July we again gathered in large numbers at Červené hřiště. The children eagerly listened to the story of the book itself — how it came into being. This time the reading was led by Jan Novotný. After the story, Michala Martišková led a refreshing animal-themed warm-up." } },
    { date: "2026-06-12", image: "news-divadylko.jpg",
      cs: { title: "Divadýlko s popletenou pohádkou", excerpt: "Ve čtvrtek 12. června jsme na skákacím hřišti na Bosonožské odehráli už podruhé Divadýlko s popletenou pohádkou. Děti usedly na deky a staly se součástí příběhu – napovídaly, smály se a v půlce si společně zacvičily. Pak přišel na řadu jezevec Chrujda a pohádka mohla dobře dopadnout. Akce Blechy v kožichu z.s., kterou vedla naše jednička Vendula Svobodová spolu s Kateřinou Křížovou." },
      en: { title: "Little Theatre with a Mixed-Up Fairy Tale", excerpt: "On Friday 12 June we performed our mixed-up fairy tale show for the second time, at the play area on Bosonožská street. Children settled on blankets and became part of the story — whispering cues, laughing, and joining a short stretch break at half time. Then came the badger Chrujda and the tale ended well. An event by Blechy v kožichu z.s., led by our lead candidate Vendula Svobodová together with Kateřina Křížová." } },
    { date: "2026-06-23", image: "news-kvetinovy-swap.jpg",
      cs: { title: "Vyměň kytku III", excerpt: "V pondělí 23. června jsme se sešli v Sady Kafé na květinovém swapu – komunitní výměně pokojových i zahradních rostlin. Každý přinesl přebytky z domova nebo zahrady a odnesl si domů něco nového. U skleničky místního moštu jsme si povídali o zeleni, o sousedství a o tom, jak pečovat o naši čtvrť. Děkujeme všem, kdo dorazili!" },
      en: { title: "Plant Swap III", excerpt: "On Monday 23 June we gathered at Sady Kafé for a flower swap – a community exchange of houseplants and garden plants. Everyone brought surplus from home or their garden and took something new home. Over a glass of local juice we talked about greenery, community and how to take care of our neighbourhood. Thank you to everyone who came!" } },
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
      intro: "Naše kandidátka spojuje síly pro rozvoj Starého Lískovce. Hrdě se hlásíme k hodnotám a celostátnímu programu našich mateřských stran, které nám poskytují zázemí a podporu.",
      outro: "Společně prosazujeme moderní a udržitelný rozvoj nejen v naší městské části, ale i v celém regionu a České republice.",
      pirati_region:   "Piráti Jihomoravského kraje",
      pirati_national: "Česká pirátská strana",
      zeleni_region:   "Zelení v Jihomoravském kraji",
      zeleni_national: "Strana zelených",
    },
    en: {
      intro: "Our candidates join forces for the development of Starý Lískovec. We proudly stand by the values and national programme of our parent parties, which provide us with support and a shared platform.",
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
