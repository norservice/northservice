document.addEventListener("DOMContentLoaded", () => {
  // ----- Carrusel -----
  const slidesEl = document.querySelector(".slides");
  const slides = document.querySelectorAll(".slide");
  const total = slides.length;
  let index = 0;
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const dotsEl = document.querySelector(".dots");

  function goTo(i) {
    index = (i + total) % total;
    slidesEl.style.transform = `translateX(${-index * 100}%)`;
    updateDots();
  }

  prevBtn.addEventListener("click", () => goTo(index - 1));
  nextBtn.addEventListener("click", () => goTo(index + 1));

  // Crear puntos
  for (let i = 0; i < total; i++) {
    const d = document.createElement("button");
    d.className = "dot";
    d.setAttribute("aria-label", "Ir a imagen " + (i + 1));
    d.addEventListener("click", () => goTo(i));
    dotsEl.appendChild(d);
  }

  function updateDots() {
    const ds = dotsEl.querySelectorAll(".dot");
    ds.forEach((x, idx) => (x.style.opacity = idx === index ? "1" : "0.4"));
  }

  // Auto-play
  let autoplay = setInterval(() => goTo(index + 1), 5000);
  document
    .querySelector(".carousel")
    .addEventListener("mouseenter", () => clearInterval(autoplay));
  document
    .querySelector(".carousel")
    .addEventListener(
      "mouseleave",
      () => (autoplay = setInterval(() => goTo(index + 1), 5000))
    );

  goTo(0);

  // ----- Menú hamburguesa -----
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  if (menuToggle && menu) {
    // Abrir/cerrar menú
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.classList.toggle("menu-open");
    });

    // Cerrar al hacer clic en un enlace
    document.querySelectorAll(".menu a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("menu-open");
      });
    });

    // Cerrar al hacer clic fuera
    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
        menu.classList.remove("menu-open");
      }
    });
  }
});
