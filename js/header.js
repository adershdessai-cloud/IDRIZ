/**
 * IDRIZ FACILITIES — Header interactions
 * Glass → solid on scroll · Mobile drawer nav · Active section link
 */
(function () {
  "use strict";

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const overlay = document.querySelector(".nav-overlay");
  const navLinks = document.querySelectorAll(".site-nav__link");
  const ctaLinks = document.querySelectorAll(".site-nav__cta a");

  if (!header || !toggle || !nav || !overlay) return;

  const SCROLL_THRESHOLD = 24;
  const sectionIds = ["home", "about", "services", "contact"];

  function setScrolledState() {
    header.classList.toggle("is-scrolled", window.scrollY > SCROLL_THRESHOLD);
  }

  function openNav() {
    nav.classList.add("is-open");
    overlay.classList.add("is-visible");
    overlay.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    document.body.classList.add("nav-open");
  }

  function closeNav() {
    nav.classList.remove("is-open");
    overlay.classList.remove("is-visible");
    overlay.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("nav-open");
  }

  function toggleNav() {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    if (isOpen) closeNav();
    else openNav();
  }

  function setActiveLink() {
    const scrollPos = window.scrollY + header.offsetHeight + 24;
    let current = "home";

    sectionIds.forEach(function (id) {
      const section = document.getElementById(id);
      if (section && section.offsetTop <= scrollPos) {
        current = id;
      }
    });

    navLinks.forEach(function (link) {
      const href = link.getAttribute("href") || "";
      const isActive = href === "#" + current;
      if (isActive) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  toggle.addEventListener("click", toggleNav);
  overlay.addEventListener("click", closeNav);

  navLinks.forEach(function (link) {
    link.addEventListener("click", closeNav);
  });
  ctaLinks.forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeNav();
  });

  window.addEventListener("resize", function () {
    if (window.matchMedia("(min-width: 1024px)").matches) closeNav();
  });

  window.addEventListener(
    "scroll",
    function () {
      setScrolledState();
      setActiveLink();
    },
    { passive: true }
  );

  setScrolledState();
  setActiveLink();
})();
