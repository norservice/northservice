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

  // --- Menú hamburguesa ---
const toggle = document.querySelector('.menu-toggle');
const menu   = document.querySelector('.menu');

if (toggle && menu) {
  // abrir/cerrar con el botón ☰
  toggle.addEventListener('click', function(e) {
    e.stopPropagation(); // evita que el click cierre de inmediato
    menu.classList.toggle('menu-open');
  });

  // cerrar al hacer clic en un enlace del menú
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('menu-open');
    });
  });

  // cerrar al hacer clic fuera del menú
  document.addEventListener('click', function(e) {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove('menu-open');
    }
  });
}
