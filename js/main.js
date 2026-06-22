/* Logo – char cascade */
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

/* HERO TITLE */
const heroTitle = new SplitType(".hero-title", {
  types: "words",
});

gsap.set(".hero-info", { perspective: 600 });
gsap.from(heroTitle.words, {
  opacity: 0,
  y: 30,
  rotateX: 40,
  transformOrigin: "center bottom",
  filter: "blur(4px)",
  stagger: 0.07,
  duration: 0.85,
  ease: "power3.out",
});

/* hero Text */
const heroText = new SplitType(".hero-text", { types: "words" });

gsap.from(heroText.words, {
  opacity: 0,
  y: 16,
  filter: "blur(3px)",
  stagger: 0.009,
  duration: 0.5,
  ease: "power2.out",
});

/* hero CTA */
gsap.from(".hero-cta-btn", {
  opacity: 0,
  scale: 0.88,
  y: 10,
  duration: 0.65,
  delay: 0.35,
  ease: "back.out(1.8)",
});
gsap.from(".hero-cta-link", {
  opacity: 0,
  x: -15,
  duration: 0.5,
  delay: 0.5,
  ease: "power2.out",
});

/* hero stats – counter animation */
const counterData = [
  { prefix: "$", target: 50000000 },
  { prefix: "+", target: 450 },
  { prefix: "",  target: 2 },
];

document.querySelectorAll(".number").forEach((el, i) => {
  const { prefix = "", target } = counterData[i] || {};
  el.textContent = prefix + "0";
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration: 2,
    delay: 0.3 + i * 0.12,
    ease: "power2.out",
    onUpdate() {
      el.textContent = prefix + Math.round(obj.val).toLocaleString("es-AR");
    },
  });
});

/* hero stats – label texts */
const statTexts = new SplitType(".text", { types: "words" });
gsap.from(statTexts.words, {
  opacity: 0,
  y: 18,
  stagger: 0.08,
  duration: 0.55,
  delay: 0.3,
  ease: "power2.out",
});

/* hero stat hover */
const heroStats = document.querySelectorAll(".hero-stat");

heroStats.forEach((stat) => {
  const bg = stat.querySelector(".hover-bg");

  stat.addEventListener("mouseenter", () => {
    gsap.to(bg, {
      scaleY: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  });

  stat.addEventListener("mouseleave", () => {
    gsap.to(bg, {
      scaleY: 0,
      duration: 0.4,
      ease: "power2.in",
    });
  });
});

/* hero mouse parallax (desktop only) */
if (window.matchMedia("(min-width: 769px) and (hover: hover)").matches) {
  const heroDeco = document.querySelectorAll(".hero-deco");
  const heroImgParallax = document.querySelector(".hero-image img");
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.addEventListener("mousemove", (e) => {
      const xPct = e.clientX / window.innerWidth - 0.5;
      const yPct = e.clientY / window.innerHeight - 0.5;
      gsap.to(heroDeco, { x: xPct * 22, y: yPct * 22, duration: 1.4, ease: "power2.out" });
      if (heroImgParallax) {
        gsap.to(heroImgParallax, { x: xPct * -18, y: yPct * -18, duration: 1.4, ease: "power2.out" });
      }
    });
  }
}

/* services items – premium & mobile safe */
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".hero-services-item").forEach((item, index) => {
  gsap.set(item, {
    opacity: 0,
    y: 50,
    rotateX: 10,
    scale: 0.95,
    transformPerspective: 700,
  });

  gsap.to(item, {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    duration: 0.85,
    ease: "expo.out",
    delay: index * 0.1,
    scrollTrigger: {
      trigger: item,
      start: "top 85%",
      once: true,
    },
  });
});

/* video section – entrada premium + stagger + floating */

const videoTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".videoContainer",
    start: "top 80%",
    once: true,
  },
});

videoTl
  .from(".videoContent", {
    opacity: 0,
    y: 20,
    duration: 0.5,
    ease: "power2.out",
  })
  .from(
    ".videoText h2, .videoText p",
    {
      opacity: 0,
      y: 18,
      duration: 0.55,
      ease: "power2.out",
      stagger: 0.08,
    },
    "-=0.3",
  )
  .from(
    ".videoMockup img",
    {
      opacity: 0,
      y: 40,
      duration: 0.7,
      ease: "power3.out",
      onComplete: startVideoFloating,
    },
    "-=0.45",
  );

/* floating suave del mockup */
function startVideoFloating() {
  gsap.to(".videoMockup img", {
    y: "+=28",
    duration: 2.2,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });
}

// Forzar recalcular el ScrollTrigger tras la carga
gsap.delayedCall(0.1, () => ScrollTrigger.refresh());

// Scroll horizontal
let scrollTween;

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.matchMedia({
  // 🖥️ Desktop: scroll horizontal
  "(min-width: 769px)": function () {
    const scrollInner = document.querySelector(".scrollInner");

    scrollTween = gsap.to(scrollInner, {
      x: () => -(scrollInner.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: ".scrollSection",
        start: "top top",
        end: () => `+=${scrollInner.scrollWidth - window.innerWidth}`,
        scrub: 2,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
  },

  // 📱 Mobile: sin scroll horizontal
  "(max-width: 768px)": function () {
    if (scrollTween) scrollTween.kill();
    ScrollTrigger.getAll().forEach((st) => {
      if (st.trigger && st.trigger.classList.contains("scrollSection")) {
        st.kill();
      }
    });
  },
});

/* animaciones de entrada scroll horizontal */
gsap.utils.toArray(".scrollItem").forEach((item) => {
  const content = item.querySelector(".scrollContent");
  const media = item.querySelector(".scrollMedia img");
  const features = item.querySelectorAll(".scrollFeatures li");

  gsap.set(content, { opacity: 0, x: -35 });
  gsap.set(media, { opacity: 0, x: 35, scale: 0.95 });
  gsap.set(features, { opacity: 0, y: 18 });

  gsap
    .timeline({
      scrollTrigger: {
        trigger: item,
        containerAnimation: scrollTween, // ✅ CLAVE
        start: "left 70%",
        once: true,
      },
    })
    .to(content, {
      opacity: 1,
      x: 0,
      duration: 0.65,
      ease: "power3.out",
    })
    .to(
      features,
      {
        opacity: 1,
        y: 0,
        stagger: 0.07,
        duration: 0.45,
        ease: "power2.out",
      },
      "-=0.35",
    )
    .to(
      media,
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.7,
        ease: "expo.out",
      },
      "-=0.45",
    );
});

/* anim requerimientos */
gsap.from(".requirements-header h2, .requirements-header p", {
  opacity: 0,
  y: 20,
  duration: 0.6,
  ease: "power2.out",
  stagger: 0.12,
  scrollTrigger: {
    trigger: ".requirements-section",
    start: "top 80%",
    once: true,
  },
});

gsap.utils.toArray(".requirement-card").forEach((card, i) => {
  gsap.from(card, {
    opacity: 0,
    x: i % 2 === 0 ? -30 : 30,
    y: 20,
    scale: 0.96,
    duration: 0.65,
    ease: "power3.out",
    delay: i * 0.09,
    scrollTrigger: {
      trigger: ".requirements-grid",
      start: "top 78%",
      once: true,
    },
  });
});

gsap.from(".requirements-footer", {
  opacity: 0,
  y: 18,
  duration: 0.5,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".requirements-footer",
    start: "top 85%",
    once: true,
  },
});

ScrollTrigger.matchMedia({
  // 📱 MOBILE
  "(max-width: 768px)": function () {
    gsap.utils.toArray(".scrollItem").forEach((item) => {
      const content = item.querySelector(".scrollContent");
      const media = item.querySelector(".scrollMedia img");
      const features = item.querySelectorAll(".scrollFeatures li");

      if (!content || !media) return;

      gsap.set([content, media, features], {
        opacity: 0,
        y: 24,
      });

      gsap.set(media, { scale: 0.98 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            once: true,
          },
        })
        .to(content, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        })
        .to(
          features,
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.35,
            ease: "power2.out",
          },
          "-=0.25",
        )
        .to(
          media,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            ease: "power3.out",
          },
          "-=0.35",
        );
    });
  },
});

/* =========================
   CLIENTES SECTION
========================= */
gsap.registerPlugin(ScrollTrigger);

/* Desktop (con SplitType como tu hero) */
ScrollTrigger.matchMedia({
  "(min-width: 769px)": function () {
    // dividir texto
    const clientesTitle = new SplitType(".clientes-title", {
      types: "words",
    });

    const clientesSubtitle = new SplitType(".clientes-subtitle", {
      types: "words",
    });

    const clientesTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".clientes-section",
        start: "top 80%",
        once: true,
      },
    });

    clientesTl
      // título
      .from(clientesTitle.words, {
        opacity: 0,
        y: 35,
        stagger: 0.06,
        duration: 0.7,
        ease: "power3.out",
      })
      // subtítulo
      .from(
        clientesSubtitle.words,
        {
          opacity: 0,
          y: 20,
          stagger: 0.02,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.4",
      )
      // logos
      .from(
        ".clientes-logos a",
        {
          opacity: 0,
          y: 30,
          scale: 0.88,
          filter: "blur(8px)",
          stagger: 0.18,
          duration: 0.85,
          ease: "expo.out",
        },
        "-=0.3",
      );
  },

  /* 📱 Mobile (más liviano, sin SplitType) */
  "(max-width: 768px)": function () {
    gsap.from(".clientes-title, .clientes-subtitle", {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".clientes-section",
        start: "top 85%",
        once: true,
      },
    });

    gsap.from(".clientes-logos a", {
      opacity: 0,
      y: 20,
      stagger: 0.12,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".clientes-logos",
        start: "top 85%",
        once: true,
      },
    });
  },
});

/* =========================
   HOVER LOGOS (DESKTOP ONLY)
========================= */
if (window.matchMedia("(hover: hover)").matches) {
  document.querySelectorAll(".clientes-logos img").forEach((logo) => {
    logo.addEventListener("mouseenter", () => {
      gsap.to(logo, {
        scale: 1.06,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    logo.addEventListener("mouseleave", () => {
      gsap.to(logo, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });
}

/* footer */
gsap.from(".footerContainer h2", {
  opacity: 0,
  y: 30,
  duration: 0.6,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".footerContainer",
    start: "top 85%",
    once: true,
  },
});

gsap.from(".footerContainer .contactoBtn", {
  opacity: 0,
  y: 20,
  scale: 0.95,
  duration: 0.5,
  ease: "power2.out",
  delay: 0.2,
  scrollTrigger: {
    trigger: ".footerContainer",
    start: "top 85%",
    once: true,
    onEnter: () => {
      gsap.to(".footerContainer .contactoBtn", {
        scale: 1.04,
        duration: 1.3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.7,
      });
    },
  },
});
