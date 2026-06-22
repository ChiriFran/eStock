gsap.registerPlugin(ScrollTrigger);

const isPortfolioPage = document.querySelector(".portfolio-hero") !== null;

if (isPortfolioPage) {
  const logoSplit = new SplitType(".logo", { types: "chars" });
  gsap.from(logoSplit.chars, {
    opacity: 0,
    y: -20,
    rotateX: -50,
    transformPerspective: 300,
    stagger: 0.05,
    duration: 0.55,
    ease: "power3.out",
  });

  gsap.set(".menu-item", { opacity: 0, clipPath: "inset(0 0 100% 0)" });
  gsap.to(".menu-item", {
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
    duration: 0.55,
    ease: "power3.out",
    stagger: 0.08,
    delay: 0.15,
    clearProps: "opacity,clipPath",
  });

  const heroTitleSplit = new SplitType(".portfolio-hero h1", { types: "words" });
  gsap.from(heroTitleSplit.words, {
    opacity: 0,
    y: 28,
    rotateX: 10,
    transformOrigin: "center bottom",
    filter: "blur(4px)",
    stagger: 0.06,
    duration: 0.85,
    ease: "power3.out",
  });

  gsap.from(".portfolio-hero p", {
    opacity: 0,
    y: 18,
    stagger: 0.06,
    duration: 0.65,
    delay: 0.15,
    ease: "power2.out",
  });

  gsap.from(".portfolio-hero-buttons a", {
    opacity: 0,
    y: 16,
    scale: 0.96,
    stagger: 0.12,
    duration: 0.65,
    delay: 0.35,
    ease: "back.out(1.7)",
  });

  gsap.from(".visual-card", {
    opacity: 0,
    y: 38,
    rotation: 3,
    scale: 0.95,
    stagger: 0.14,
    duration: 1,
    ease: "expo.out",
    scrollTrigger: {
      trigger: ".visual-stack",
      start: "top 90%",
      once: true,
    },
  });

  gsap.from(".visual-caption", {
    opacity: 0,
    y: 24,
    duration: 0.85,
    ease: "power3.out",
    stagger: 0.12,
    scrollTrigger: {
      trigger: ".visual-stack",
      start: "top 88%",
      once: true,
    },
  });

  gsap.to(".visual-card img", {
    y: 12,
    duration: 10,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    delay: 1.4,
  });

  // Animate tech cards as a group when the stack section enters view
  gsap.from(".stack-grid .tech-card", {
    opacity: 0,
    y: 36,
    scale: 0.98,
    duration: 0.75,
    ease: "power3.out",
    stagger: 0.12,
    scrollTrigger: {
      trigger: ".stack-section",
      start: "top 78%",
      once: true,
    },
  });

  const aboutTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-portfolio",
      start: "top 78%",
      once: true,
    },
  });

  aboutTl
    .from(".about-copy h2", {
      opacity: 0,
      y: 36,
      duration: 0.8,
      ease: "power3.out",
    })
    .from(
      ".about-copy p",
      {
        opacity: 0,
        y: 26,
        duration: 0.75,
        ease: "power3.out",
      },
      "-=0.6",
    )
    .from(
      ".about-points div",
      {
        opacity: 0,
        y: 38,
        rotation: 1.8,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.11,
      },
      "-=0.5",
    )
    .from(
      ".detail-card",
      {
        opacity: 0,
        x: 40,
        y: 18,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.12,
      },
      "-=0.55",
    );

  gsap.utils.toArray(".detail-card").forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      x: index % 2 === 0 ? -30 : 30,
      y: 18,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 92%",
        once: true,
      },
      delay: index * 0.05,
    });
  });

  gsap.from(".cv-card", {
    opacity: 0,
    y: 42,
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".cv-section",
      start: "top 88%",
      once: true,
    },
  });

  gsap.utils.toArray(".cv-item").forEach((item, index) => {
    gsap.from(item, {
      opacity: 0,
      x: index % 2 === 0 ? -40 : 40,
      y: 24,
      scale: 0.97,
      duration: 0.85,
      ease: "power3.out",
      scrollTrigger: {
        trigger: item,
        start: "top 92%",
        once: true,
      },
      delay: index * 0.08,
    });
  });

  gsap.from(".cv-card .contactoBtn", {
    opacity: 0,
    y: 22,
    duration: 0.7,
    ease: "back.out(1.6)",
    scrollTrigger: {
      trigger: ".cv-card",
      start: "top 94%",
      once: true,
    },
  });

  // Interactive tilt + hover effects for tech cards and detail cards
  function addInteractiveTilt(selector, opts = {}) {
    const els = document.querySelectorAll(selector);
    els.forEach((el) => {
      gsap.set(el, { transformStyle: "preserve-3d", transformPerspective: opts.perspective || 800 });

      const onMove = (e) => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rotateY = (px - 0.5) * (opts.maxRotateY || 12);
        const rotateX = (0.5 - py) * (opts.maxRotateX || 8);

        gsap.to(el, {
          rotationY: rotateY,
          rotationX: rotateX,
          scale: opts.hoverScale || 1.02,
          duration: 0.35,
          ease: "power3.out",
        });

        if (opts.shadow) {
          gsap.to(el, { boxShadow: opts.shadow, duration: 0.35, ease: "power3.out" });
        }
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseenter", () => {
        gsap.to(el, { scale: opts.hoverScale || 1.02, duration: 0.25, ease: "power3.out" });
        if (opts.shadow) gsap.to(el, { boxShadow: opts.shadow, duration: 0.25 });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el, { rotationY: 0, rotationX: 0, scale: 1, duration: 0.6, ease: "power3.out" });
        if (opts.shadow) gsap.to(el, { boxShadow: "0 6px 18px rgba(0,0,0,0.06)", duration: 0.6 });
      });
    });
  }

  // gentle idle float for tech cards to add subtle motion after entrance
  if (window.innerWidth > 700) {
    gsap.to(".stack-grid .tech-card", {
      y: 6,
      duration: 6,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.18,
      delay: 2,
    });
  }

  addInteractiveTilt(".stack-grid .tech-card", {
    maxRotateY: 10,
    maxRotateX: 6,
    hoverScale: 1.03,
    shadow: "0 22px 34px rgba(0,0,0,0.12)",
  });

  addInteractiveTilt(".detail-card", {
    maxRotateY: 8,
    maxRotateX: 6,
    hoverScale: 1.02,
    shadow: "0 18px 28px rgba(0,0,0,0.10)",
  });


  

}
