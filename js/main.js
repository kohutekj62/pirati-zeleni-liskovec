/* ==========================================================================
   main.js  —  everything the visitor can click
   ==========================================================================
   This file:
     • starts the page (sets the language, draws the lists, fills the year)
     • opens / closes the mobile menu (hamburger)
     • switches Czech ⇄ English when the language toggle is clicked
     • flips the elephant cards to the real photos
     • handles the contact form and the newsletter sign-up
     • shows the "back to top" button and highlights the current menu item

   Each feature is in its own clearly-named function below, so if you want to
   tweak one behaviour you can jump straight to it.
   ========================================================================== */

(function () {
  "use strict";

  /* =======================================================================
     STARTUP  —  runs once when the page is ready
     ===================================================================== */
  function init() {
    I18N.initLang();        // read remembered language (Czech by default)
    I18N.apply();           // fill in all the fixed labels
    RENDER.renderAll();     // build the lists (program, people, events, …)
    updateLangToggle();     // show the right CZ/EN state on the switch

    document.getElementById("year").textContent = new Date().getFullYear();

    setupDevBanner();
    setupMenu();
    setupLanguageToggle();
    setupElephantFlip();
    setupContactForm();
    setupNewsletter();
    setupBackToTop();
    setupScrollSpy();
    updateMenuLabel();      // localise the hamburger's hidden label

    // Keep the toggle + menu label correct after a language switch
    document.addEventListener("slon:langchange", function () {
      updateLangToggle();
      updateMenuLabel();
    });
  }

  /* =======================================================================
     DEV DISCLAIMER BANNER  —  dismissible with the ✕ button.
     Hidden for the rest of the session once closed (sessionStorage).
     ===================================================================== */
  function setupDevBanner() {
    var banner = document.getElementById("dev-banner");
    if (!banner) return;

    // Stay hidden if the visitor already closed it this session.
    if (sessionStorage.getItem("slon-dev-banner-closed")) {
      banner.hidden = true;
      return;
    }

    document.getElementById("dev-banner-close").addEventListener("click", function () {
      banner.hidden = true;
      try { sessionStorage.setItem("slon-dev-banner-closed", "1"); } catch (e) {}
    });

    // Update the close button's aria-label when the language switches.
    document.addEventListener("slon:langchange", function () {
      var btn = document.getElementById("dev-banner-close");
      if (btn) btn.setAttribute("aria-label", I18N.lang === "en" ? "Close" : "Zavřít");
    });
  }

  /* =======================================================================
     MOBILE MENU  (hamburger)
     ===================================================================== */
  function setupMenu() {
    var btn = document.getElementById("menu-btn");
    var nav = document.getElementById("main-nav");
    var header = document.querySelector(".site-header");

    function closeMenu() {
      nav.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      updateMenuLabel();
    }
    function toggleMenu() {
      // Snap the dropdown to the actual header bottom so it aligns correctly
      // whether or not the dev-banner is visible above the header.
      if (header) {
        nav.style.top = header.getBoundingClientRect().bottom + "px";
      }
      var open = nav.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      updateMenuLabel();
    }

    btn.addEventListener("click", toggleMenu);
    // Close the menu after tapping a link, or when pressing Escape
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) closeMenu(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  }

  function updateMenuLabel() {
    var btn = document.getElementById("menu-btn");
    if (!btn) return;
    var open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-label", I18N.t(open ? "menu_close" : "menu_open"));
  }

  /* =======================================================================
     LANGUAGE TOGGLE  (CZ ⇄ EN)
     ===================================================================== */
  function setupLanguageToggle() {
    var toggle = document.getElementById("lang-toggle");
    toggle.addEventListener("click", function () {
      I18N.setLang(I18N.lang === "cs" ? "en" : "cs");
    });
  }

  function updateLangToggle() {
    var toggle = document.getElementById("lang-toggle");
    var isEn = (I18N.lang === "en");
    toggle.classList.toggle("is-en", isEn);
    toggle.querySelectorAll(".lang-toggle__opt").forEach(function (opt) {
      opt.classList.toggle("is-active", opt.getAttribute("data-lang-value") === I18N.lang);
    });
  }

  /* =======================================================================
     THE ELEPHANT FLIP  (click a card → show the real photo, click → back)
     Each card flips on its own. Works with mouse, touch and keyboard.
     ===================================================================== */
  function setupElephantFlip() {
    document.addEventListener("click", function (e) {
      var card = e.target.closest(".flip-card");
      if (!card) return;

      var flipped = card.classList.toggle("is-flipped");
      card.setAttribute("aria-pressed", flipped ? "true" : "false");

      // Update the spoken label so screen-reader users know what the click does next
      var person = card.closest(".person");
      var name = person ? person.querySelector(".person__name").textContent : "";
      card.setAttribute("aria-label",
        I18N.t(flipped ? "card_flip_to_elephant" : "card_flip_to_photo") + ": " + name);
    });
  }

  /* =======================================================================
     CONTACT FORM
     • If you set a Formspree ID in content.js → sends a real e-mail.
     • If not → opens the visitor's own e-mail app (mailto fallback).
     ===================================================================== */
  function setupContactForm() {
    var form = document.getElementById("contact-form");
    var status = document.getElementById("cf-status");
    var submit = document.getElementById("cf-submit");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      setStatus(status, "", "");

      // Built-in browser validation (required fields + valid e-mail)
      if (!form.checkValidity()) {
        setStatus(status, I18N.t("form_required"), "is-error");
        form.reportValidity();
        return;
      }

      var data = {
        name:    form.elements.name.value.trim(),
        email:   form.elements.email.value.trim(),
        message: form.elements.message.value.trim(),
      };

      var formspreeId = (CONTENT.config.formspreeId || "").trim();

      if (formspreeId) {
        // ---- Real send via Formspree ----
        var original = submit.textContent;
        submit.disabled = true;
        submit.textContent = I18N.t("form_sending");
        fetch("https://formspree.io/f/" + formspreeId, {
          method: "POST",
          headers: { "Accept": "application/json" },
          body: new FormData(form),
        })
        .then(function (res) {
          if (res.ok) { setStatus(status, I18N.t("form_success"), "is-ok"); form.reset(); }
          else { setStatus(status, I18N.t("form_error"), "is-error"); }
        })
        .catch(function () { setStatus(status, I18N.t("form_error"), "is-error"); })
        .finally(function () { submit.disabled = false; submit.textContent = original; });
      } else {
        // ---- Fallback: open the visitor's e-mail app ----
        var to = CONTENT.config.email || "";
        var subject = encodeURIComponent("Web: zpráva od " + data.name);
        var body = encodeURIComponent(data.message + "\n\n— " + data.name + " (" + data.email + ")");
        try { window.location.href = "mailto:" + to + "?subject=" + subject + "&body=" + body; } catch (err) { /* ignore */ }
        setStatus(status, I18N.t("form_success"), "is-ok");
        form.reset();
      }
    });
  }

  /* =======================================================================
     NEWSLETTER  (only shown if you set newsletterAction in content.js)
     ===================================================================== */
  function setupNewsletter() {
    var form = document.getElementById("newsletter-form");
    var action = (CONTENT.config.newsletterAction || "").trim();
    if (!action) return;          // not configured → stays hidden

    form.hidden = false;
    var status = document.getElementById("nl-status");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      // Send to your e-mail provider. We can't read the reply (cross-site),
      // so we optimistically show "done" once the request goes out.
      fetch(action, { method: "POST", mode: "no-cors", body: new FormData(form) })
        .then(function () { setStatus(status, I18N.t("news_signup_ok"), "is-ok"); form.reset(); })
        .catch(function () { setStatus(status, I18N.t("form_error"), "is-error"); });
    });
  }

  /* =======================================================================
     BACK-TO-TOP BUTTON
     ===================================================================== */
  function setupBackToTop() {
    var btn = document.getElementById("to-top");
    btn.setAttribute("aria-label", I18N.t("back_to_top"));
    window.addEventListener("scroll", function () {
      btn.hidden = window.scrollY < 400;
    }, { passive: true });
    btn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  }

  /* =======================================================================
     SCROLL SPY  —  underline the menu item for the section you're looking at
     ===================================================================== */
  function setupScrollSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".main-nav a"));
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });

    var sections = links
      .map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
      .filter(Boolean);

    if (!("IntersectionObserver" in window) || !sections.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (a) { a.classList.remove("is-current"); });
          var active = byId[entry.target.id];
          if (active) active.classList.add("is-current");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* small helper for the form status messages */
  function setStatus(node, text, cls) {
    node.textContent = text;
    node.className = "form-status" + (cls ? " " + cls : "");
  }

  /* ---- go! (scripts are at the end of <body>, so the page is ready) ---- */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
