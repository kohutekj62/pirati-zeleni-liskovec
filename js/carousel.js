/* ==========================================================================
   carousel.js  —  the photo carousels in the Kampaň section
   ==========================================================================
   The carousels, their titles and their photos come from content.js →
   carousels: — edit them there, not here.

   What it does:
   • Builds one small carousel per entry in content.js → carousels:, side by
     side (one under the other on a phone). They run in parallel, but start a
     moment apart so they do not all flip at the same instant.
   • Each one shows one photo at a time and fades to the next. A carousel with
     order: "fixed" goes through its photos in the listed order — that is how
     a story or a before → after reads in sequence; "random" shuffles them
     anew on every visit.
   • A click on the photo opens its Facebook post (or our Facebook page).
   • Every carousel switches every 5 s; the first one starts at second 0, the
     next at 1, then 2, … so they always flip one second apart.
   • Pauses while the mouse is over it, while a control has keyboard focus,
     while it is scrolled out of view and while the browser tab is hidden.
   • Visitors who asked their system for reduced motion get it paused, with
     the ⏸/⏵ button and the dots shown so they can browse by hand.
   • On a phone you can swipe, and the ← → keys work once a photo has focus.
   • A photo is only downloaded shortly before it is shown, so visitors
     who scroll past do not pay for the whole set.
   ========================================================================== */

const CAROUSEL = (function () {

  /* How long each slide stays on screen, in milliseconds. */
  var SHOW = 5000;
  /* Carousel number n shows its first photo n × this many ms after it comes into view
     (the first at second 0, the next at 1, …), then flips every SHOW ms — so the
     carousels always flip one second apart. */
  var STAGGER = 1000;

  var all = [];

  function t(key) { return I18N.t(key); }
  function el(tag, cls, attrs) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    for (var k in attrs || {}) node.setAttribute(k, attrs[k]);
    return node;
  }

  /* Put a list into a random order (Fisher–Yates shuffle). */
  function shuffle(list) {
    for (var i = list.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = list[i]; list[i] = list[j]; list[j] = tmp;
    }
    return list;
  }

  /* Which network a link points to, for screen readers ("… (Facebook)"). */
  function networkName(url) {
    if (/instagram\.com/i.test(url)) return "Instagram";
    return "Facebook";
  }

  /* One carousel, built from one entry of content.js → carousels: */
  function Carousel(group, index) {
    var self = this;
    var items = (group.slides || []).filter(function (it) { return it.image; });
    if (group.order === "random") shuffle(items);

    self.group = group;
    self.slides = [];
    self.dots = [];
    self.current = 0;
    self.playing = true;        // what the visitor chose with the ⏸/⏵ button
    self.inView = false; self.hovered = false; self.focused = false;
    self.timer = null;
    self.index = index;
    self.waiting = true;        // first photo not revealed yet

    var root     = self.root = el("section", "carousel carousel--" + (group.shape === "landscape" ? "landscape" : "portrait"));
    var heading  = self.heading = el("h3", "carousel__title");
    var viewport = el("div", "carousel__viewport");
    var dotBox   = el("div", "carousel__dots");
    var toggle   = self.toggle = el("button", "carousel__toggle", { type: "button" });

    root.classList.add("carousel--waiting");
    root.setAttribute("role", "region");
    root.setAttribute("aria-roledescription", "carousel");
    root.appendChild(heading);

    items.forEach(function (item, i) {
      var url = item.link || CONTENT.config.facebook;
      var a = el("a", "carousel__slide", { href: url, target: "_blank", rel: "noopener noreferrer" });

      /* The photo blurred and stretched behind itself fills the frame if the
         photo's shape does not quite match it. (Photos get their address only
         in load() — that defers the download.) */
      var backdrop = el("img", "carousel__backdrop", { alt: "", "aria-hidden": "true", loading: "lazy", decoding: "async" });
      var main     = el("img", "carousel__img", { loading: "lazy", decoding: "async" });
      a.appendChild(backdrop);
      a.appendChild(main);
      var where = el("span", "visually-hidden");
      where.textContent = " (" + networkName(url) + ")";
      a.appendChild(where);
      viewport.appendChild(a);

      self.slides.push({ item: item, node: a, imgs: [backdrop, main], src: item.image, loaded: false });

      var dot = el("button", "carousel__dot", { type: "button" });
      dot.addEventListener("click", function () { self.go(i); });
      self.dots.push(dot);
      dotBox.appendChild(dot);
    });

    toggle.addEventListener("click", function () {
      self.playing = !self.playing;
      self.updateToggle();
      self.schedule();
    });

    root.appendChild(viewport);
    if (items.length > 1) {
      var controls = el("div", "carousel__controls");
      controls.appendChild(toggle);
      controls.appendChild(dotBox);
      root.appendChild(controls);
    }

    /* Swipe on touch screens */
    var startX = null, startY = null;
    viewport.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX; startY = e.touches[0].clientY;
    }, { passive: true });
    viewport.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      var dy = e.changedTouches[0].clientY - startY;
      startX = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) { self.step(dx < 0 ? 1 : -1); }
    });

    /* Arrow keys once a dot, the button or a photo has focus */
    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { self.step(1);  e.preventDefault(); }
      if (e.key === "ArrowLeft")  { self.step(-1); e.preventDefault(); }
    });

    root.addEventListener("mouseenter", function () { self.hovered = true;  self.schedule(); });
    root.addEventListener("mouseleave", function () { self.hovered = false; self.schedule(); });
    /* Only keyboard focus pauses it: a mouse click on a dot leaves focus on
       the dot, and the carousel should not stay frozen after that. */
    root.addEventListener("focusin", function (e) {
      try { self.focused = e.target.matches(":focus-visible"); } catch (err) { self.focused = true; }
      if (e.target === toggle) self.focused = false;   // ⏵ pressed from the keyboard should play
      self.schedule();
    });
    root.addEventListener("focusout", function (e) {
      if (!root.contains(e.relatedTarget)) { self.focused = false; self.schedule(); }
    });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        self.inView = entries[0].isIntersecting;
        if (self.inView) self.load(self.current);
        self.schedule();
      }, { threshold: 0.3 }).observe(root);
    } else {
      self.inView = true;
    }

    /* The ⏸ button and the dots stay hidden — except for visitors who asked for
       reduced motion: nothing moves for them, so they need the dots to browse. */
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      self.playing = false;
      self.reveal();
      root.classList.add("carousel--manual");
    }
  }

  /* Texts for the current language (title, alt texts, button labels). */
  Carousel.prototype.applyText = function () {
    var self = this, lang = I18N.lang;
    var title = self.group.title[lang] || self.group.title.cs || "";
    self.heading.textContent = title;
    self.root.setAttribute("aria-label", title);
    self.slides.forEach(function (s, i) {
      s.imgs[1].alt = s.item[lang] || s.item.cs || "";
      self.dots[i].setAttribute("aria-label", t("carousel_slide") + " " + (i + 1) + " / " + self.slides.length);
    });
    self.updateToggle();
  };

  Carousel.prototype.updateToggle = function () {
    this.toggle.setAttribute("aria-label", t(this.playing ? "carousel_pause" : "carousel_play"));
    this.toggle.classList.toggle("is-paused", !this.playing);
  };

  /* Give a slide's photos their address — that is what starts the download. */
  Carousel.prototype.load = function (i) {
    var s = this.slides[i];
    if (!s || s.loaded) return;
    s.imgs.forEach(function (img) { img.src = "assets/" + s.src; });
    s.loaded = true;
  };

  Carousel.prototype.show = function (i) {
    var n = this.slides.length;
    this.current = (i + n) % n;
    this.load(this.current);
    this.load((this.current + 1) % n);     // fetch the next one in the meantime

    var cur = this.current;
    this.slides.forEach(function (s, k) { s.node.classList.toggle("is-active", k === cur); });
    this.dots.forEach(function (d, k) {
      if (k === cur) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current");
    });
  };

  Carousel.prototype.reveal = function () {
    this.waiting = false;
    this.root.classList.remove("carousel--waiting");
  };
  Carousel.prototype.step = function (dir) { this.reveal(); this.show(this.current + dir); this.schedule(); };
  Carousel.prototype.go   = function (i)   { this.reveal(); this.show(i);                   this.schedule(); };

  /* (Re)start the countdown to the next slide — or stop it if the carousel
     should not move right now. */
  Carousel.prototype.schedule = function () {
    var self = this;
    clearTimeout(self.timer);
    self.timer = null;
    if (!self.playing || !self.inView || self.hovered || self.focused || document.hidden || self.slides.length < 2) return;
    if (self.waiting) {
      self.timer = setTimeout(function () { self.reveal(); self.schedule(); }, self.index * STAGGER);
    } else {
      self.timer = setTimeout(function () { self.step(1); }, SHOW);
    }
  };

  /* ---- start ------------------------------------------------------------- */
  function init() {
    var box = document.getElementById("campaign-carousel");
    var groups = CONTENT.carousels || [];
    if (!box || !groups.length) return;

    groups.forEach(function (group, i) {
      var c = new Carousel(group, i);
      if (!c.slides.length) return;
      all.push(c);
      box.appendChild(c.root);
      c.applyText();
      c.show(0);
    });
    box.hidden = false;
    all.forEach(function (c) { c.schedule(); });

    document.addEventListener("slon:langchange", function () { all.forEach(function (c) { c.applyText(); }); });
    document.addEventListener("visibilitychange", function () { all.forEach(function (c) { c.schedule(); }); });
  }

  return { init: init };
})();
