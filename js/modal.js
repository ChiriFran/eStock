/* ========= GLOBAL SCROLL ========= */
let savedScrollY = 0;

/* ========= STARTER MODAL ========= */
const starterModal = document.getElementById("starterModal");
const starterOverlay = document.getElementById("starterOverlay");
const openStarter = document.querySelector(".open-starter-modal");
const closeStarter = document.getElementById("closeStarter");

const starterTl = gsap.timeline({ paused: true });

starterTl
  .to(starterOverlay, {
    opacity: 1,
    pointerEvents: "auto",
    duration: 0.3,
  })
  .to(
    starterModal,
    {
      y: "-50%",
      opacity: 1,
      pointerEvents: "auto",
      duration: 0.45,
      ease: "power3.out",
    },
    "-=0.15"
  );

openStarter.addEventListener("click", () => {
  closeProModal(true);
  savedScrollY = window.scrollY;
  document.body.style.top = `-${savedScrollY}px`;
  document.body.classList.add("modal-open");
  starterTl.play(0);
});

function closeStarterModal(skipScrollRestore) {
  gsap.to(starterModal, {
    y: "100%",
    opacity: 0,
    pointerEvents: "none",
    duration: 0.35,
  });

  gsap.to(starterOverlay, {
    opacity: 0,
    pointerEvents: "none",
    duration: 0.3,
    onComplete: () => {
      document.body.classList.remove("modal-open");
      document.body.style.top = "";
      if (!skipScrollRestore) {
        window.scrollTo(0, savedScrollY);
      }
    },
  });
}

closeStarter.addEventListener("click", () => closeStarterModal());
starterOverlay.addEventListener("click", () => closeStarterModal());

/* ========= PRO MODAL ========= */
const proModal = document.getElementById("proModal");
const proOverlay = document.getElementById("proOverlay");
const openPro = document.querySelector(".open-pro-modal");
const closePro = document.getElementById("closePro");

const proTl = gsap.timeline({ paused: true });

proTl
  .to(proOverlay, {
    opacity: 1,
    pointerEvents: "auto",
    duration: 0.3,
  })
  .to(
    proModal,
    {
      y: "-50%",
      opacity: 1,
      pointerEvents: "auto",
      duration: 0.45,
      ease: "power3.out",
    },
    "-=0.15"
  );

openPro.addEventListener("click", () => {
  closeStarterModal(true);
  savedScrollY = window.scrollY;
  document.body.style.top = `-${savedScrollY}px`;
  document.body.classList.add("modal-open");
  proTl.play(0);
});

function closeProModal(skipScrollRestore) {
  gsap.to(proModal, {
    y: "100%",
    opacity: 0,
    pointerEvents: "none",
    duration: 0.35,
  });

  gsap.to(proOverlay, {
    opacity: 0,
    pointerEvents: "none",
    duration: 0.3,
    onComplete: () => {
      document.body.classList.remove("modal-open");
      document.body.style.top = "";
      if (!skipScrollRestore) {
        window.scrollTo(0, savedScrollY);
      }
    },
  });
}

closePro.addEventListener("click", () => closeProModal());
proOverlay.addEventListener("click", () => closeProModal());

/* ESC para ambos */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeStarterModal();
    closeProModal();
  }
});

/* ========= SECTION TOGGLES (accordion) ========= */
document.querySelectorAll(".section-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const content = btn.nextElementSibling;
    const isOpen = content.classList.contains("is-open");

    const modal = btn.closest(".modal-content");
    modal.querySelectorAll(".section-content.is-open").forEach((openContent) => {
      if (openContent !== content) {
        openContent.classList.remove("is-open");
        openContent.previousElementSibling.setAttribute("aria-expanded", "false");
      }
    });

    if (isOpen) {
      content.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    } else {
      content.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
    }
  });
});
