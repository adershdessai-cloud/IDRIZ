/**
 * IDRIZ FACILITIES — Scroll-reveal via Intersection Observer
 */
(function () {
  "use strict";

  var prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var targets = document.querySelectorAll(".reveal");

  if (!targets.length) return;

  if (prefersReduced || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) {
      el.classList.add("is-revealed");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        obs.unobserve(entry.target);
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -6% 0px",
      threshold: 0.08,
    }
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });
})();
