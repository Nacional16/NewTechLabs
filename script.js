

document.addEventListener('DOMContentLoaded', () => {
  let slideIndex = 0;
  const slides = document.querySelectorAll('.carousel-slide');
  const totalSlides = slides.length;
  const intervalTime = 3000; // Tiempo en ms para cambiar de imagen
  let autoPlay;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      slide.style.display = i === index ? 'block' : 'none';
      slide.setAttribute('aria-hidden', i !== index);
    });
  }

  function changeSlide(step = 1) {
    slideIndex = (slideIndex + step + totalSlides) % totalSlides;
    showSlide(slideIndex);
  }

  function startAutoPlay() {
    autoPlay = setInterval(() => changeSlide(1), intervalTime);
  }

  function stopAutoPlay() {
    clearInterval(autoPlay);
  }

  // Pausar cuando el mouse está encima del carrusel
  const carousel = document.querySelector('.carousel');
  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);

  // Control con teclado
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') changeSlide(-1);
    if (e.key === 'ArrowRight') changeSlide(1);
  });

  // Inicializar
  showSlide(slideIndex);
  startAutoPlay();
});