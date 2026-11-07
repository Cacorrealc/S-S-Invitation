
/* ==================================================
   S&S | INVITACIÓN DE MATRIMONIO
   Sebastián & Santiago
   27 de noviembre de 2026
================================================== */


/* ==================================================
   01. CONFIGURACIÓN GENERAL
================================================== */

const CONFIG = {
    RSVP_FORM_URL: "",

    MUSIC_AUTOPLAY_ON_ENTRY: true,

    PHOTOS_PATH: "assets/photos/"
};


/* ==================================================
   02. ELEMENTOS DEL DOCUMENTO
================================================== */

// Pantalla de bienvenida
const intro = document.getElementById("intro");
const invitation = document.getElementById("invitation");
const enterButton = document.getElementById("enterButton");

// Reproductor de música
const weddingMusic = document.getElementById("weddingMusic");
const musicToggle = document.getElementById("musicToggle");

// Confirmación de asistencia
const rsvpButton = document.getElementById("rsvpButton");
const rsvpNote = document.getElementById("rsvpNote");


/* ==================================================
   03. CONFIGURACIÓN DE MÚSICA
================================================== */

// La canción se reproduce una sola vez.
if (weddingMusic) {
    weddingMusic.loop = false;
    weddingMusic.volume = 0.7;
}


/* ==================================================
   04. ACTUALIZACIÓN DEL BOTÓN DE MÚSICA
================================================== */

function updateMusicButton() {

    if (!weddingMusic || !musicToggle) return;

    const isPlaying = !weddingMusic.paused;

    musicToggle.setAttribute(
        "aria-pressed",
        String(isPlaying)
    );

    musicToggle.setAttribute(
        "aria-label",
        isPlaying ? "Pausar música" : "Reproducir música"
    );

    musicToggle.innerHTML = isPlaying
        ? '♫ <span>Pausar</span>'
        : '♫ <span>Música</span>';

}


/* ==================================================
   05. REPRODUCIR MÚSICA
================================================== */

async function startMusic() {

    if (!weddingMusic) return;

    try {

        // Si terminó, vuelve al comienzo.
        if (weddingMusic.ended) {
            weddingMusic.currentTime = 0;
        }

        await weddingMusic.play();

    } catch (error) {

        console.warn(
            "No se pudo reproducir la música:",
            error
        );

    }

    updateMusicButton();

}


/* ==================================================
   06. PAUSAR MÚSICA
================================================== */

function pauseMusic() {

    if (!weddingMusic) return;

    weddingMusic.pause();

    updateMusicButton();

}


/* ==================================================
   07. CONTROL DEL BOTÓN DE MÚSICA
================================================== */

if (musicToggle && weddingMusic) {

    musicToggle.addEventListener("click", () => {

        if (weddingMusic.paused) {

            startMusic();

        } else {

            pauseMusic();

        }

    });

    weddingMusic.addEventListener(
        "play",
        updateMusicButton
    );

    weddingMusic.addEventListener(
        "pause",
        updateMusicButton
    );

    weddingMusic.addEventListener(
        "ended",
        updateMusicButton
    );

    updateMusicButton();

}


/* ==================================================
   08. PANTALLA DE BIENVENIDA
================================================== */

if (intro && invitation && enterButton) {

    // Bloquea el desplazamiento antes de entrar.
    document.body.classList.add("locked");

    enterButton.addEventListener("click", () => {

        // Desbloquear desplazamiento.
        document.body.classList.remove("locked");

        // Mostrar invitación.
        invitation.classList.remove("is-hidden");

        // Animación de salida.
        intro.classList.add("is-leaving");

        // Eliminar pantalla inicial.
        window.setTimeout(() => {
            intro.remove();
        }, 1050);

        // Reproducir canción al ingresar.
        if (CONFIG.MUSIC_AUTOPLAY_ON_ENTRY) {
            startMusic();
        }

        // Ir al comienzo de la invitación.
        document.getElementById("inicio")?.scrollIntoView({
            behavior: "smooth"
        });

    });

}


/* ==================================================
   09. CONFIRMACIÓN DE ASISTENCIA
================================================== */

if (rsvpButton && rsvpNote) {

    const formURL = CONFIG.RSVP_FORM_URL.trim();

    // Aceptar únicamente enlaces HTTPS.
    const validURL = /^https:\/\/.+/i.test(formURL);

    if (validURL) {

        rsvpButton.href = formURL;

        rsvpNote.textContent =
            "Recuerda confirmar antes del 23 de noviembre de 2026.";

    } else {

        // Desactivar el botón mientras no exista enlace.
        rsvpButton.removeAttribute("href");

        rsvpButton.setAttribute(
            "aria-disabled",
            "true"
        );

        rsvpNote.textContent =
            "El formulario de confirmación estará disponible próximamente.";

    }

}


/* ==================================================
   10. CARGA DE FOTOGRAFÍAS
================================================== */

const photoFiles = {
    "hero": "portada.jpg",
    "photo-1": "foto-1.jpg",
    "photo-2": "foto-2.jpg",
    "photo-3": "foto-3.jpg"
};

document.querySelectorAll("[data-image]").forEach(slot => {

    const imageKey = slot.dataset.image;

    const fileName = photoFiles[imageKey];

    if (!fileName) return;

    const imagePath = CONFIG.PHOTOS_PATH + fileName;

    const image = new Image();

    image.onload = () => {

        if (imageKey === "hero") {

            // Imagen de fondo de la portada.
            slot.style.backgroundImage = `
                linear-gradient(
                    90deg,
                    rgba(4,14,27,0.85),
                    rgba(4,14,27,0.35)
                ),
                url("${imagePath}")
            `;

            slot.classList.add("has-image");

            // Eliminar texto provisional.
            const placeholder =
                slot.querySelector(".image-placeholder");

            if (placeholder) {
                placeholder.remove();
            }

        } else {

            // Insertar fotografía en la galería.
            image.alt =
                "Fotografía de Sebastián y Santiago";

            image.loading = "lazy";

            slot.innerHTML = "";

            slot.appendChild(image);

        }

    };

    image.onerror = () => {

        console.warn(
            "No se encontró la fotografía:",
            imagePath
        );

    };

    image.src = imagePath;

});


/* ==================================================
   11. ANIMACIONES AL HACER SCROLL
================================================== */

const revealElements =
    document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {

        observer.observe(element);

    });

} else {

    // Compatibilidad con navegadores antiguos.
    revealElements.forEach(element => {

        element.classList.add("visible");

    });

}

/* ==========================================
   CARRUSEL AUTOMÁTICO DE FOTOGRAFÍAS S&S
========================================== */

const carousel = document.querySelector(".wedding-carousel");

if (carousel) {

    const slides = carousel.querySelectorAll(".carousel-slide");
    const prevButton = carousel.querySelector(".carousel-prev");
    const nextButton = carousel.querySelector(".carousel-next");
    const dotsContainer = carousel.querySelector(".carousel-dots");

    let currentSlide = 0;
    let carouselInterval = null;

    const slideDuration = 4000;

    /* ======================================
       CREAR INDICADORES
    ====================================== */

    slides.forEach((slide, index) => {

        const dot = document.createElement("button");

        dot.classList.add("carousel-dot");
        dot.type = "button";
        dot.setAttribute(
            "aria-label",
            `Mostrar fotografía ${index + 1}`
        );

        dotsContainer.appendChild(dot);

        dot.addEventListener("click", () => {
            showSlide(index);
            restartCarousel();
        });

    });

    const dots = dotsContainer.querySelectorAll(".carousel-dot");

    /* ======================================
       MOSTRAR FOTOGRAFÍA
    ====================================== */

    function showSlide(index) {

        if (!slides.length) return;

        currentSlide = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {

            slide.classList.toggle("active", i === currentSlide);
            slide.setAttribute(
                "aria-hidden",
                String(i !== currentSlide)
            );

        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentSlide);
            dot.setAttribute("aria-current", i === currentSlide ? "true" : "false");
        });

    }

    /* ======================================
       SIGUIENTE / ANTERIOR
    ====================================== */

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    /* ======================================
       REPRODUCCIÓN AUTOMÁTICA
    ====================================== */

    function startCarousel() {

        if (carouselInterval || slides.length < 2) return;

        carouselInterval = window.setInterval(() => {
            nextSlide();
        }, slideDuration);

    }

    function stopCarousel() {

        if (carouselInterval) {
            window.clearInterval(carouselInterval);
            carouselInterval = null;
        }

    }

    function restartCarousel() {
        stopCarousel();
        if (!document.hidden && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            startCarousel();
        }
    }

    /* ======================================
       CONTROLES MANUALES
    ====================================== */

    nextButton.addEventListener("click", () => {
        nextSlide();
        restartCarousel();
    });

    prevButton.addEventListener("click", () => {
        prevSlide();
        restartCarousel();
    });

    /* ======================================
       PAUSAR CUANDO NO SE ESTÁ VIENDO
    ====================================== */

    const carouselObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting && !document.hidden) {
                restartCarousel();
            } else {
                stopCarousel();
            }

        });

    }, { threshold: 0.25 });

    carouselObserver.observe(carousel);

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            stopCarousel();
        } else if (carousel.getBoundingClientRect().top < window.innerHeight &&
                   carousel.getBoundingClientRect().bottom > 0) {
            restartCarousel();
        }
    });

    /* ======================================
       INICIAR
    ====================================== */

    showSlide(0);

}



/* ==================================================
   12. FIN DEL JAVASCRIPT
================================================== */
