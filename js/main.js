gsap.from(".logo", {
  y: -100,
  ease: "power3.out",
  duration: 1,
});

gsap.from(".menu-item", {
  y: -100,
  ease: "power3.out",
  duration: 1,
  stagger: 0.1,
});

/* HERO TITLE */
const heroTitle = new SplitType(".hero-title", {
  types: "words",
});

gsap.from(heroTitle.words, {
  opacity: 0,
  y: 40,
  stagger: 0.05,
  duration: 0.8,
  ease: "power3.out",
});

/* hero Text */
// Dividir el párrafo en palabras
const heroText = new SplitType(".hero-text", { types: "words" });

gsap.from(heroText.words, {
  opacity: 0,
  y: 20,
  stagger: 0.008, // muy rápido
  duration: 0.5,
  ease: "power2.out",
});

/* hero stats */
// Dividir números y textos
const statNumbers = new SplitType(".number", { types: "chars" });
const statTexts = new SplitType(".text", { types: "words" });

// Animar números (caracteres)
gsap.from(statNumbers.chars, {
  opacity: 0,
  y: 20,
  stagger: 0.05,
  duration: 0.5,
  ease: "power2.out",
});

// Animar textos (palabras)
gsap.from(statTexts.words, {
  opacity: 0,
  y: 20,
  stagger: 0.08,
  duration: 0.5,
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

/* services items */
gsap.registerPlugin(ScrollTrigger);

// Inicializar las tarjetas con opacity 0 y scale reducido
/* services items – efecto alternativo */
/* services items – premium & mobile safe */
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".hero-services-item").forEach((item, index) => {
  gsap.set(item, {
    opacity: 0,
    y: 40,
    scale: 0.94,
    transformPerspective: 800,
  });

  gsap.to(item, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.7,
    ease: "expo.out",
    delay: index * 0.08,
    scrollTrigger: {
      trigger: item,
      start: "top 85%",
      once: true,
    },
  });
});

/* mockup */
/* video section – entrada premium + stagger + floating */
gsap.registerPlugin(ScrollTrigger);

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

/* animaiones de entrada scroll horizontal */
gsap.utils.toArray(".scrollItem").forEach((item) => {
  const content = item.querySelector(".scrollContent");
  const media = item.querySelector(".scrollMedia img");
  const features = item.querySelectorAll(".scrollFeatures li");

  gsap.set([content, media, features], {
    opacity: 0,
    y: 24,
  });

  gsap.set(media, {
    scale: 0.97,
  });

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
      y: 0,
      duration: 0.55,
      ease: "power3.out",
    })
    .to(
      features,
      {
        opacity: 1,
        y: 0,
        stagger: 0.06,
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.3",
    )
    .to(
      media,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.4",
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

gsap.from(".requirement-card", {
  opacity: 0,
  y: 28,
  scale: 0.96,
  duration: 0.6,
  ease: "power3.out",
  stagger: 0.1,
  scrollTrigger: {
    trigger: ".requirements-grid",
    start: "top 75%",
    once: true,
  },
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
          y: 40,
          scale: 0.94,
          stagger: 0.15,
          duration: 0.7,
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
  },
});
