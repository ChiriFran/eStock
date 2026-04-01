(() => {
    // 🔥 FORZAR LIGHTBOX GLOBAL REAL
    let lightbox = document.getElementById("pvw-lightbox");

    if (lightbox && lightbox.parentNode !== document.body) {
        document.body.appendChild(lightbox); // 👈 lo saca de la card
    }

    const lightboxImg = document.querySelector(".pvw-lightbox-img");
    const closeBtn = document.querySelector(".pvw-close");

    let activeImages = [];
    let currentIndex = 0;

    function openPvwLightbox(src, images, index) {
        activeImages = images;
        currentIndex = index;

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

    function closePvwLightbox() {
        lightboxImg.style.transform = "scale(0.95)";
        lightboxImg.style.opacity = "0";

        setTimeout(() => {
            lightbox.classList.remove("pvw-active");
        }, 200);
    }

    function showNext() {
        if (!activeImages.length) return;
        currentIndex = (currentIndex + 1) % activeImages.length;
        lightboxImg.src = activeImages[currentIndex].src;
    }

    function showPrev() {
        if (!activeImages.length) return;
        currentIndex = (currentIndex - 1 + activeImages.length) % activeImages.length;
        lightboxImg.src = activeImages[currentIndex].src;
    }

    // eventos globales
    closeBtn?.addEventListener("click", closePvwLightbox);

    lightbox?.addEventListener("click", (e) => {
        if (e.target !== lightboxImg) closePvwLightbox();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closePvwLightbox();
        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
    });

    // SLIDERS
    document.querySelectorAll("[data-pvw-slider]").forEach(wrapper => {
        const slides = wrapper.querySelector(".pvw-slides");
        const images = wrapper.querySelectorAll(".pvw-slide");
        const next = wrapper.querySelector(".pvw-next");
        const prev = wrapper.querySelector(".pvw-prev");

        let index = 0;
        const total = images.length;

        if (total <= 1) {
            wrapper.classList.add("pvw-single");
        }

        function update() {
            slides.style.transform = `translateX(-${index * 100}%)`;
        }

        next?.addEventListener("click", () => {
            index = (index + 1) % total;
            update();
        });

        prev?.addEventListener("click", () => {
            index = (index - 1 + total) % total;
            update();
        });

        // swipe
        let startX = 0;

        slides.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
        });

        slides.addEventListener("touchend", (e) => {
            const endX = e.changedTouches[0].clientX;

            if (startX - endX > 50) next?.click();
            if (endX - startX > 50) prev?.click();
        });

        // 👇 CLICK CORRECTO
        images.forEach((img, i) => {
            img.addEventListener("click", () => {
                openPvwLightbox(img.src, Array.from(images), i);
            });
        });
    });
})();