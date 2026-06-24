gsap.registerPlugin(ScrollTrigger);

const isPortfolioPage = document.querySelector(".portfolio-hero") !== null;

if (isPortfolioPage) {
  /* ── Header ── */
  const logoSplit = new SplitType(".logo", { types: "chars" });
  gsap.from(logoSplit.chars, {
    opacity: 0, y: -20, rotateX: -50,
    transformPerspective: 300,
    stagger: 0.05, duration: 0.55, ease: "power3.out",
  });

  gsap.set(".menu-item", { opacity: 0, clipPath: "inset(0 0 100% 0)" });
  gsap.to(".menu-item", {
    opacity: 1, clipPath: "inset(0 0 0% 0)",
    duration: 0.55, ease: "power3.out",
    stagger: 0.08, delay: 0.15,
    clearProps: "opacity,clipPath",
  });

  /* ── Hero ── */
  const heroTitleSplit = new SplitType(".portfolio-hero h1", { types: "words" });
  gsap.from(heroTitleSplit.words, {
    opacity: 0, y: 28, rotateX: 10,
    transformOrigin: "center bottom",
    filter: "blur(4px)",
    stagger: 0.06, duration: 0.85, ease: "power3.out",
  });

  gsap.from(".portfolio-hero p", {
    opacity: 0, y: 18, stagger: 0.06,
    duration: 0.65, delay: 0.15, ease: "power2.out",
  });

  gsap.from(".portfolio-hero-buttons a", {
    opacity: 0, y: 16, scale: 0.96,
    stagger: 0.12, duration: 0.65, delay: 0.35,
    ease: "back.out(1.7)",
  });

  /* ── Click to expand project cards ── */
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", () => {
      const wasExpanded = card.classList.contains("expanded");
      document.querySelectorAll(".project-card.expanded").forEach((c) => c.classList.remove("expanded"));
      if (!wasExpanded) card.classList.add("expanded");
    });
  });
}
