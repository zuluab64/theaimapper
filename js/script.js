/* AIMapper — minimal, unobtrusive JS.
   Only responsibility: accessible mobile navigation toggle. */
(function () {
  "use strict";

  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("mobile-menu");
  if (!toggle || !menu) return;

  function closeMenu() {
    toggle.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
  }

  toggle.addEventListener("click", function () {
    var open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    menu.classList.toggle("is-open", !open);
  });

  // Close when a link is tapped (navigating within the page or to a new page).
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) closeMenu();
  });

  // Close on Escape for keyboard users.
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });
})();

/* Cursor-follow spotlight on cards (brand interaction). */
(function () {
  "use strict";
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var cards = document.querySelectorAll(".card");
  Array.prototype.forEach.call(cards, function (card) {
    card.addEventListener("mousemove", function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
      card.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
    });
    card.addEventListener("mouseenter", function () { card.style.setProperty("--op", "1"); });
    card.addEventListener("mouseleave", function () { card.style.setProperty("--op", "0"); });
  });
})();
