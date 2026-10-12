(function () {
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");
  const overlay = document.getElementById("menuOverlay");
  const closeBtn = document.getElementById("menuClose");

  if (!hamburger || !menu) return;

  const dropdowns = menu.querySelectorAll("[data-dropdown]");
  const isMobile = () => window.matchMedia("(max-width: 768px)").matches;
  const noHover = () => window.matchMedia("(hover: none)").matches;

  function closeDropdowns() {
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("open");
      const toggle = dropdown.querySelector(".menu-toggle");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    });
  }

  function setMenu(open) {
    menu.classList.toggle("open", open);
    hamburger.classList.toggle("active", open);
    hamburger.setAttribute("aria-expanded", String(open));
    hamburger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    document.body.classList.toggle("menu-open", open);
    if (overlay) overlay.classList.toggle("is-visible", open);
    if (!open) closeDropdowns();
  }

  hamburger.addEventListener("click", () => {
    setMenu(!menu.classList.contains("open"));
  });

  if (closeBtn) closeBtn.addEventListener("click", () => setMenu(false));
  if (overlay) overlay.addEventListener("click", () => setMenu(false));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("open")) setMenu(false);
  });

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".menu-toggle");
    if (!toggle) return;

    toggle.addEventListener("click", () => {
      if (!isMobile() && !noHover()) return;
      const open = dropdown.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  });

  document.addEventListener("click", (event) => {
    dropdowns.forEach((dropdown) => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("open");
        const toggle = dropdown.querySelector(".menu-toggle");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (menu.classList.contains("open")) setMenu(false);
    });
  });

  window.addEventListener("resize", () => {
    if (!isMobile() && menu.classList.contains("open")) setMenu(false);
  });
})();
