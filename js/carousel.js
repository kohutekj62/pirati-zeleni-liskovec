/* ==========================================================================
   carousel.js  —  the photo carousel in the Kampaň section
   ==========================================================================
   The photos and their descriptions come from content.js → carousel: —
   edit them there, not here.

   What it does:
   • Shows one photo at a time and fades to the next one every few seconds.
   • A before/after pair is one slide showing both photos together: side by
     side, or one above the other on a phone.
   • A click on the photo opens its Facebook post (or our Facebook page).
   • Pauses while the mouse is over it, while a control has keyboard focus,
     while it is scrolled out of view and while the browser tab is hidden.
   • Visitors who asked their system for reduced motion get it paused; the
     ⏵ button starts it.
   • The dots below jump to a slide; on a phone you can also swipe, and the
     ← → keys work once a control has focus.
   • A photo is only downloaded shortly before it is shown, so visitors
     who scroll past do not pay for the whole set.
   ========================================================================== */

const CAROUSEL = (function () {

  /* How long each thing stays on screen, in milliseconds. */
  var SHOW_PHOTO = 5000;    // a single photo
  var SHOW_PAIR  = 7000;    // a before/after pair — two photos to take in

  var root, slides = [], dots = [], toggle;
  var current = 0;
  var playing = true;        // what the visitor chose with the ⏸/⏵ button
  var inView = false, hovered = false, focused = false;
  var timer = null;

  function t(key) { return I18N.t(key); }
  function el(tag, cls, attrs) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    for (var k in attrs || {}) node.setAttribute(k, attrs[k]);
    return node;
  }

  /* Which network a link points to, for screen readers ("… (Facebook)"). */
  function networkName(url) {
    if (/instagram\.com/i.test(url)) return "Instagram";
    return "Facebook";
  }

  /* ---- building ---------------------------------------------------------- */
  function build(items) {
    var viewport = el("div", "carousel__viewport");
    var dotBox   = el("div", "carousel__dots");
    toggle       = el("button", "carousel__toggle", { type: "button" });

    items.forEach(function (item, i) {
      var isPair = !!(item.before && item.after);
      var url    = item.link || CONTENT.config.facebook;
      var a = el("a", "carousel__slide", { href: url, target: "_blank", rel: "noopener noreferrer" });

      /* The photo blurred and stretched behind itself fills the frame when the
         photo's shape does not match it (portrait posters in a landscape box). */
      var first = isPair ? item.before : item.image;
      var lazy = { loading: "lazy", decoding: "async" };
      var backdrop = el("img", "carousel__backdrop", { alt: "", "aria-hidden": "true", loading: "lazy", decoding: "async" });
      /* (the photos get their address only in load() — that defers the download) */
      var main     = el("img", "carousel__img", lazy);
      a.appendChild(backdrop);

      var after = null;
      if (isPair) {
        /* Both photos at once, "before" first in reading order */
        after = el("img", "carousel__img", lazy);
        var pair = el("div", "carousel__pair");
        pair.appendChild(main);
        pair.appendChild(after);
        a.appendChild(pair);
      } else {
        a.appendChild(main);
      }
      var where = el("span", "visually-hidden");
      where.textContent = " (" + networkName(url) + ")";
      a.appendChild(where);
      viewport.appendChild(a);

      slides.push({ item: item, node: a, imgs: [backdrop, main, after], srcs: [first, first, item.after], loaded: false });

      var dot = el("button", "carousel__dot", { type: "button" });
      dot.addEventListener("click", function () { go(i); });
      dots.push(dot);
      dotBox.appendChild(dot);
    });

    toggle.addEventListener("click", function () {
      playing = !playing;
      updateToggle();
      schedule();
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
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) { if (dx < 0) step(1); else step(-1); }
    });

    /* Arrow keys once a dot, the button or a photo has focus */
    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { step(1);  e.preventDefault(); }
      if (e.key === "ArrowLeft")  { step(-1); e.preventDefault(); }
    });

    root.addEventListener("mouseenter", function () { hovered = true;  schedule(); });
    root.addEventListener("mouseleave", function () { hovered = false; schedule(); });
    /* Only keyboard focus pauses it: a mouse click on a dot leaves focus on
       the dot, and the carousel should not stay frozen after that. */
    root.addEventListener("focusin", function (e) {
      try { focused = e.target.matches(":focus-visible"); } catch (err) { focused = true; }
      if (e.target === toggle) focused = false;   // ⏵ pressed from the keyboard should play
      schedule();
    });
    root.addEventListener("focusout",   function (e) {
      if (!root.contains(e.relatedTarget)) { focused = false; schedule(); }
    });
    document.addEventListener("visibilitychange", schedule);

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting;
        if (inView) load(current);
        schedule();
      }, { threshold: 0.3 }).observe(root);
    } else {
      inView = true;
    }
  }

  /* Texts for the current language (alt texts, button labels). */
  function applyText() {
    var lang = I18N.lang;
    root.setAttribute("aria-label", t("carousel_label"));
    slides.forEach(function (s, i) {
      var text = s.item[lang] || s.item.cs || "";
      if (s.imgs[2]) {
        s.imgs[1].alt = text.before || "";
        s.imgs[2].alt = text.after || "";
      } else {
        s.imgs[1].alt = typeof text === "string" ? text : "";
      }
      dots[i].setAttribute("aria-label", t("carousel_slide") + " " + (i + 1) + " / " + slides.length);
    });
    updateToggle();
  }

  function updateToggle() {
    toggle.setAttribute("aria-label", t(playing ? "carousel_pause" : "carousel_play"));
    toggle.classList.toggle("is-paused", !playing);
  }

  /* ---- showing ----------------------------------------------------------- */
  /* Give a slide's photos their address — that is what starts the download. */
  function load(i) {
    var s = slides[i];
    if (!s || s.loaded) return;
    s.imgs.forEach(function (img, k) { if (img) img.src = "assets/" + s.srcs[k]; });
    s.loaded = true;
  }

  function show(i) {
    current = (i + slides.length) % slides.length;
    load(current);
    load((current + 1) % slides.length);     // fetch the next one in the meantime

    slides.forEach(function (s, k) { s.node.classList.toggle("is-active", k === current); });
    dots.forEach(function (d, k) {
      if (k === current) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current");
    });
  }

  function isPair(i) { return !!slides[i].imgs[2]; }

  function step(dir) { show(current + dir); schedule(); }
  function go(i)     { show(i);             schedule(); }

  /* (Re)start the countdown to the next slide — or stop it if the carousel
     should not move right now. */
  function schedule() {
    clearTimeout(timer);
    timer = null;
    if (!playing || !inView || hovered || focused || document.hidden || slides.length < 2) return;
    timer = setTimeout(function () { step(1); }, isPair(current) ? SHOW_PAIR : SHOW_PHOTO);
  }

  /* ---- start ------------------------------------------------------------- */
  function init() {
    root = document.getElementById("campaign-carousel");
    var items = (CONTENT.carousel || []).filter(function (it) { return it.image || (it.before && it.after); });
    if (!root || !items.length) return;

    root.setAttribute("role", "region");
    root.setAttribute("aria-roledescription", "carousel");
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) playing = false;

    build(items);
    applyText();
    show(0);
    root.hidden = false;
    schedule();

    document.addEventListener("slon:langchange", applyText);
  }

  return { init: init };
})();
