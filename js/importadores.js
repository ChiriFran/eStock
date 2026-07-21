document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const isImportadoresPage = document.querySelector(".importadores-hero") !== null;
  if (!isImportadoresPage) return;

  /* ── Header ── */
  const logo = document.querySelector(".logo");
  if (logo) {
    gsap.from(logo, {
      opacity: 0, y: -14,
      duration: 0.5, ease: "power3.out",
    });
  }

  const menuItems = document.querySelectorAll(".menu-item");
  if (menuItems.length) {
    gsap.fromTo(menuItems,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, delay: 0.1, ease: "power2.out" }
    );
  }

  /* ── Hero ── */
  const heroH1 = document.querySelector(".importadores-hero h1");
  if (heroH1) {
    gsap.fromTo(heroH1,
      { opacity: 0, y: 30, filter: "blur(4px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, delay: 0.1, ease: "power3.out" }
    );
  }

  const heroPs = document.querySelectorAll(".importadores-hero-copy > p");
  if (heroPs.length) {
    gsap.fromTo(heroPs,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, delay: 0.15, ease: "power2.out" }
    );
  }

  const heroBtns = document.querySelectorAll(".importadores-hero-buttons a");
  if (heroBtns.length) {
    gsap.fromTo(heroBtns,
      { opacity: 0, y: 14, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.55, delay: 0.3, ease: "back.out(1.5)" }
    );
  }

  const heroCard = document.querySelector(".importadores-visual-card");
  if (heroCard) {
    gsap.fromTo(heroCard,
      { opacity: 0, y: 24, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: 0.25, ease: "power3.out" }
    );
  }

  const heroStats = document.querySelector(".importadores-visual-stats");
  if (heroStats) {
    gsap.fromTo(heroStats,
      { opacity: 0, y: 12 },
      {
        opacity: 1, y: 0, duration: 0.5, delay: 0.45, ease: "power2.out",
        onComplete() {
          const counters = heroStats.querySelectorAll("strong[data-target]");
          counters.forEach((el) => {
            const target = +el.dataset.target;
            const prefix = el.dataset.prefix || "";
            const suffix = el.dataset.suffix || "";
            const obj = { val: 0 };
            gsap.to(obj, {
              val: target,
              duration: 1.8,
              ease: "power2.out",
              onUpdate() {
                el.textContent = prefix + Math.round(obj.val) + suffix;
              },
            });
          });
        },
      }
    );
  }

  /* ── Pain Points ── */
  const ppHeader = document.querySelector(".painpoints-header");
  if (ppHeader) {
    gsap.fromTo(ppHeader,
      { opacity: 0, y: 28 },
      {
        opacity: 1, y: 0, duration: 0.65, ease: "power2.out",
        scrollTrigger: { trigger: ppHeader, start: "top 88%" },
      }
    );
  }

  const ppCards = document.querySelectorAll(".bento-cell");
  if (ppCards.length) {
    gsap.fromTo(ppCards,
      { opacity: 0, y: 22 },
      {
        opacity: 1, y: 0, stagger: 0.07, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: ".painpoints-grid", start: "top 88%" },
      }
    );

    ppCards.forEach(cell => {
      cell.addEventListener("click", () => {
        ppCards.forEach(c => {
          if (c !== cell) c.classList.remove("flipped");
        });
        cell.classList.toggle("flipped");
      });

      cell.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          cell.click();
        }
      });
    });
  }

  /* ── Solution ── */
  const solCopy = document.querySelector(".solution-copy");
  if (solCopy) {
    gsap.fromTo(solCopy,
      { opacity: 0, x: -28 },
      {
        opacity: 1, x: 0, duration: 0.65, ease: "power2.out",
        scrollTrigger: { trigger: ".solution-section", start: "top 82%" },
      }
    );
  }

  const solFeatures = document.querySelectorAll(".solution-feature");
  if (solFeatures.length) {
    gsap.fromTo(solFeatures,
      { opacity: 0, y: 18 },
      {
        opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: ".solution-features", start: "top 88%" },
      }
    );
  }

  const solPreview = document.querySelector(".solution-preview");
  if (solPreview) {
    gsap.fromTo(solPreview,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".solution-visual", start: "top 85%" },
      }
    );

    const solBadges = solPreview.querySelectorAll(".stat-badge");
    if (solBadges.length) {
      gsap.fromTo(solBadges,
        { opacity: 0, y: 15 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.5, delay: 0.4, ease: "back.out(1.3)",
          scrollTrigger: { trigger: ".solution-visual", start: "top 85%" },
        }
      );
    }
  }

  /* ── Audience Chips ── */
  const audHeader = document.querySelector(".audience-header");
  if (audHeader) {
    gsap.fromTo(audHeader,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: ".audience-section", start: "top 88%" },
      }
    );
  }

  const audChips = document.querySelectorAll(".audience-chip");
  if (audChips.length) {
    gsap.fromTo(audChips,
      { opacity: 0, y: 14, scale: 0.94 },
      {
        opacity: 1, y: 0, scale: 1, stagger: 0.06, duration: 0.45, ease: "back.out(1.3)",
        scrollTrigger: { trigger: ".audience-chips", start: "top 90%" },
      }
    );
  }

  /* ── CTA ── */
  const ctaContent = document.querySelector(".cta-content");
  if (ctaContent) {
    gsap.fromTo(ctaContent,
      { opacity: 0, y: 28 },
      {
        opacity: 1, y: 0, duration: 0.65, ease: "power2.out",
        scrollTrigger: { trigger: ".cta-section", start: "top 88%" },
      }
    );
  }
});
