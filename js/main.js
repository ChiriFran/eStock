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
const heroTitle = new SplitType(".hero h1", {
  types: "words",
});

gsap.set(".hero-copy", { perspective: 600 });
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
const heroText = new SplitType(".hero p:not(.eyebrow):not(.stat-number):not(.stat-text)", { types: "words" });

gsap.from(heroText.words, {
  opacity: 0,
  y: 16,
  filter: "blur(3px)",
  stagger: 0.009,
  duration: 0.5,
  ease: "power2.out",
});

/* hero CTA */
gsap.from(".hero .contactoBtn", {
  opacity: 0,
  scale: 0.88,
  y: 10,
  duration: 0.65,
  delay: 0.35,
  ease: "back.out(1.8)",
});
gsap.from(".hero .secondaryBtn", {
  opacity: 0,
  x: -15,
  duration: 0.5,
  delay: 0.5,
  ease: "power2.out",
});

/* hero stats – counter animation */
const counterData = [
  { prefix: "$", suffix: "M+", target: 50 },
  { prefix: "+", suffix: "", target: 450 },
  { prefix: "", suffix: "", target: 2 },
];

document.querySelectorAll(".stat-number").forEach((el, i) => {
  const { prefix = "", suffix = "", target } = counterData[i] || {};
  el.textContent = prefix + "0" + suffix;
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration: 2,
    delay: 0.3 + i * 0.12,
    ease: "power2.out",
    onUpdate() {
      el.textContent = prefix + Math.round(obj.val).toLocaleString("es-AR") + suffix;
    },
  });
});

/* hero stats – label texts */
const statTexts = new SplitType(".stat-text", { types: "words" });
gsap.from(statTexts.words, {
  opacity: 0,
  y: 18,
  stagger: 0.08,
  duration: 0.55,
  delay: 0.3,
  ease: "power2.out",
});

/* hero bento cards – entrada stagger */
gsap.from(".bento-item", {
  opacity: 0,
  y: 30,
  scale: 0.95,
  stagger: 0.12,
  duration: 0.8,
  delay: 0.2,
  ease: "power3.out",
});

/* hero mouse parallax (desktop only) */
if (window.matchMedia("(min-width: 769px) and (hover: hover)").matches) {
  const bentoItems = document.querySelectorAll(".bento-item");
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.addEventListener("mousemove", (e) => {
      const xPct = e.clientX / window.innerWidth - 0.5;
      const yPct = e.clientY / window.innerHeight - 0.5;
      bentoItems.forEach((item, i) => {
        const factor = i === 0 ? 12 : 18;
        gsap.to(item, { x: xPct * factor, y: yPct * factor, duration: 1.4, ease: "power2.out" });
      });
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
    clearProps: "all",
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

ScrollTrigger.matchMedia({
  // Desktop: scroll horizontal
  "(min-width: 769px)": function () {
    const scrollInner = document.querySelector(".scrollInner");
    const items = gsap.utils.toArray(".scrollItem");
    const progressBar = document.querySelector(".scrollProgressBar");
    const dots = document.querySelectorAll(".scrollDot");
    const totalSlides = items.length;

    scrollTween = gsap.to(scrollInner, {
      x: () => -(scrollInner.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: ".scrollSection",
        start: "top top",
        end: () => `+=${scrollInner.scrollWidth - window.innerWidth}`,
        scrub: 3.5,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressBar) {
            progressBar.style.width = `${(self.progress * 100).toFixed(1)}%`;
          }
          const activeIndex = Math.round(self.progress * (totalSlides - 1));
          dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === activeIndex);
          });
        },
      },
    });

    // Dot click navigation
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const index = parseInt(dot.dataset.index);
        const totalWidth = scrollInner.scrollWidth - window.innerWidth;
        const targetProgress = index / (totalSlides - 1);
        const st = scrollTween.scrollTrigger;
        const scrollTarget = st.start + targetProgress * totalWidth;
        window.scrollTo({ top: scrollTarget, behavior: "smooth" });
      });
    });

    // Parallax on images
    items.forEach((item) => {
      const img = item.querySelector(".scrollMedia img");
      if (img) {
        gsap.to(img, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            containerAnimation: scrollTween,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        });
      }
    });

    // Scale effect
    items.forEach((item) => {
      gsap.fromTo(
        item,
        { scale: 0.92, opacity: 0.5 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            containerAnimation: scrollTween,
            start: "left 80%",
            end: "left 20%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        item,
        { scale: 1, opacity: 1 },
        {
          scale: 0.92,
          opacity: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            containerAnimation: scrollTween,
            start: "right 20%",
            end: "right 80%",
            scrub: true,
          },
        }
      );
    });

    // Entrance animations - desktop only
    gsap.utils.toArray(".scrollItem").forEach((item) => {
      const content = item.querySelector(".scrollContent");
      const media = item.querySelector(".scrollMedia img");
      const features = item.querySelectorAll(".scrollFeatures li");
      const tag = item.querySelector(".scrollTag");
      const title = item.querySelector(".scrollTitle");

      gsap.set(content, { opacity: 0, x: -25 });
      gsap.set(media, { opacity: 0, x: 25, scale: 0.97 });
      gsap.set(features, { opacity: 0, y: 14 });
      if (tag) gsap.set(tag, { opacity: 0, y: 8 });
      if (title) gsap.set(title, { opacity: 0, y: 10 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: item,
            containerAnimation: scrollTween,
            start: "left 85%",
            once: true,
          },
        })
        .to(tag, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
        .to(title, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.4")
        .to(content, { opacity: 1, x: 0, duration: 0.9, ease: "power2.out" }, "-=0.55")
        .to(features, { opacity: 1, y: 0, stagger: 0.06, duration: 0.6, ease: "power2.out" }, "-=0.5")
        .to(media, { opacity: 1, x: 0, scale: 1, duration: 1, ease: "power2.out" }, "-=0.7");
    });
  },

  // Mobile: slider con touch swipe
  "(max-width: 768px)": function () {
    if (scrollTween) scrollTween.kill();

    const scrollInner = document.querySelector(".scrollInner");
    const items = gsap.utils.toArray(".scrollItem");
    const dots = document.querySelectorAll(".scrollDot");
    const totalSlides = items.length;
    let currentSlide = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    // Reset all items to visible
    items.forEach((item) => {
      item.style.opacity = "1";
      item.style.transform = "none";
      item.querySelectorAll(".scrollContent, .scrollMedia img, .scrollTag, .scrollTitle, .scrollFeatures li").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
    });

    function goToSlide(index) {
      if (index < 0 || index >= totalSlides) return;
      currentSlide = index;
      scrollInner.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle("active", i === currentSlide));
    }

    // Touch events
    scrollInner.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      scrollInner.style.transition = "none";
    }, { passive: true });

    scrollInner.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
      const diff = currentX - startX;
      const offset = -(currentSlide * 100) + (diff / window.innerWidth * 100);
      scrollInner.style.transform = `translateX(${offset}%)`;
    }, { passive: true });

    scrollInner.addEventListener("touchend", () => {
      if (!isDragging) return;
      isDragging = false;
      scrollInner.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
      const diff = currentX - startX;
      const threshold = window.innerWidth * 0.2;
      if (diff < -threshold && currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
      } else if (diff > threshold && currentSlide > 0) {
        goToSlide(currentSlide - 1);
      } else {
        goToSlide(currentSlide);
      }
    }, { passive: true });

    // Dots click
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        scrollInner.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
        goToSlide(parseInt(dot.dataset.index));
      });
    });

    goToSlide(0);
  },
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

/* =========================
   CLIENTES SECTION
========================= */
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

  /* Mobile (más liviano, sin SplitType) */
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

/* =========================
   BENTO ZOOM - LIGHTBOX
========================= */
(function () {
  const lightbox = document.getElementById("pvw-lightbox");
  const lightboxImg = document.querySelector(".pvw-lightbox-img");
  if (!lightbox || !lightboxImg) return;

  function openBentoLightbox(src) {
    lightbox.classList.add("pvw-active");
    lightboxImg.src = src;
    lightboxImg.style.transform = "scale(0.95)";
    lightboxImg.style.opacity = "0";
    requestAnimationFrame(() => {
      lightboxImg.style.transition = "all 0.3s ease";
      lightboxImg.style.transform = "scale(1)";
      lightboxImg.style.opacity = "1";
    });
  }

  function closeBentoLightbox() {
    lightboxImg.style.transform = "scale(0.95)";
    lightboxImg.style.opacity = "0";
    setTimeout(() => {
      lightbox.classList.remove("pvw-active");
    }, 200);
  }

  document.querySelectorAll(".bento-zoom").forEach((card) => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img");
      if (img) openBentoLightbox(img.src);
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const img = card.querySelector("img");
        if (img) openBentoLightbox(img.src);
      }
    });
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target !== lightboxImg) closeBentoLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("pvw-active")) {
      closeBentoLightbox();
    }
  });
})();
