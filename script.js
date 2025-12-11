
document.addEventListener('DOMContentLoaded', () => {
  // ===== MENÚ HAMBURGUESA =====
  const menuToggle = document.getElementById('menu-toggle');
  const navbar = document.querySelector('.navbar');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navbar.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', navbar.classList.contains('active'));
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('active');
      });
    });
  }

  // Dropdown en móvil
  document.querySelectorAll('.dropdown').forEach(dropdown => {
    const link = dropdown.querySelector('a');
    if (link) {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.classList.toggle('active');
        }
      });
    }
  });

  // ===== CARRUSEL =====
  let slideIndex = 0;
  const slides = document.querySelectorAll('.carousel-slide');
  const totalSlides = slides.length;
  const intervalTime = 3000;
  let autoPlay = null;

  if (totalSlides === 0) {
    console.warn('No se encontraron .carousel-slide');
    return;
  }

  function clampIndex(index) {
    return ((index % totalSlides) + totalSlides) % totalSlides;
  }

  function showSlide(index) {
    index = clampIndex(index);
    slides.forEach((slide, i) => {
      const isActive = i === index;
      slide.classList.toggle('active', isActive);
      slide.style.display = isActive ? 'block' : 'none';
      slide.setAttribute('aria-hidden', (!isActive).toString());
    });
    slideIndex = index;
  }

  function changeSlide(step = 1) {
    showSlide(slideIndex + step);
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlay = setInterval(() => changeSlide(1), intervalTime);
  }

  function stopAutoPlay() {
    if (autoPlay !== null) {
      clearInterval(autoPlay);
      autoPlay = null;
    }
  }

  const carousel = document.querySelector('.carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') changeSlide(-1);
    if (e.key === 'ArrowRight') changeSlide(1);
  });

  showSlide(slideIndex);
  startAutoPlay();

  // ===== DATOS DE PRODUCTOS Y SERVICIOS =====
  const productData = {
    1: {
      name: 'Laptop Gamer Asus',
      desc: 'Potente laptop gamer con procesador de última generación, ideal para gaming y trabajo profesional.',
      specs: ['Procesador: Intel i9-13900H', 'RAM: 32GB DDR5', 'SSD: 1TB NVMe', 'GPU: RTX 4080', 'Pantalla: 16" 2560x1600 @165Hz'],
      price: '$2,499 USD'
    },
    2: {
      name: 'Laptop Lenovo',
      desc: 'Laptop versátil para profesionales, con excelente balance entre rendimiento y portabilidad.',
      specs: ['Procesador: Intel i7-1365U', 'RAM: 16GB DDR5', 'SSD: 512GB NVMe', 'Pantalla: 14" Full HD @60Hz', 'Batería: hasta 10 horas'],
      price: '$899 USD'
    },
    3: {
      name: 'All-in-One HP',
      desc: 'PC todo-en-uno compacto, perfecto para espacios reducidos con rendimiento de escritorio.',
      specs: ['Procesador: Intel i5-12400', 'RAM: 8GB DDR4', 'SSD: 256GB', 'Pantalla: 24" Full HD Touch', 'Almacenamiento: 1TB HDD'],
      price: '$1,199 USD'
    },
    4: {
      name: 'Desktop Dell',
      desc: 'PC de escritorio de alto rendimiento para trabajo intensivo, edición y desarrollo.',
      specs: ['Procesador: AMD Ryzen 9 7950X', 'RAM: 64GB DDR5', 'SSD: 2TB NVMe', 'GPU: RTX 4070 Ti', 'Conectividad: WiFi 6E'],
      price: '$3,299 USD'
    }
  };

  const serviceData = {
    1: {
      name: 'Consultoría Tecnológica',
      desc: 'Asesoramiento experto para transformar tu negocio con soluciones tecnológicas innovadoras.',
      features: ['Diagnóstico de infraestructura TI', 'Planificación estratégica digital', 'Selección de tecnologías', 'Implementación guiada', 'Capacitación del equipo'],
      images: ['img/service1.png', 'img/service1.png', 'img/service1.png']
    },
    2: {
      name: 'Venta de Equipos',
      desc: 'Amplio catálogo de equipos de marcas líderes con garantía y soporte técnico.',
      features: ['Laptops y Desktops', 'Servidores profesionales', 'Accesorios y periféricos', 'Financiamiento disponible', 'Entrega e instalación'],
      images: ['img/service2.png', 'img/service2.png', 'img/service2.png']
    },
    3: {
      name: 'Soporte Técnico',
      desc: 'Soporte 24/7 para garantizar que tus sistemas funcionen siempre al máximo rendimiento.',
      features: ['Soporte remoto 24/7', 'Mantenimiento preventivo', 'Resolución de incidencias', 'Monitoreo de sistemas', 'Reportes periódicos'],
      images: ['img/service3.png', 'img/service3.png', 'img/service3.png']
    }
  };

  // ===== MODALES DE PRODUCTOS =====
  const productModal = document.getElementById('productModal');
  const closeProductModal = document.getElementById('closeProductModal');

  document.querySelectorAll('.carousel-slide .clickable-img').forEach(img => {
    img.addEventListener('click', (e) => {
      const productId = e.target.closest('.carousel-slide').dataset.product;
      const data = productData[productId];

      document.getElementById('modalProductTitle').textContent = data.name;
      document.getElementById('modalProductImage').src = e.target.src;
      document.getElementById('modalProductName').textContent = data.name;
      document.getElementById('modalProductDesc').textContent = data.desc;
      document.getElementById('modalProductPrice').textContent = data.price;

      const specsList = document.getElementById('modalProductSpecs');
      specsList.innerHTML = data.specs.map(spec => `<li>${spec}</li>`).join('');

      productModal.classList.add('active');
    });
  });

  closeProductModal.addEventListener('click', () => productModal.classList.remove('active'));

  // ===== MODALES DE SERVICIOS =====
  const serviceModal = document.getElementById('serviceModal');
  const closeServiceModal = document.getElementById('closeServiceModal');

  document.querySelectorAll('.service-card .clickable-img').forEach(img => {
    img.addEventListener('click', (e) => {
      const serviceId = e.target.closest('.service-card').dataset.service;
      const data = serviceData[serviceId];

      document.getElementById('modalServiceTitle').textContent = data.name;
      document.getElementById('modalServiceMainImage').src = data.images[0];
      document.getElementById('modalServiceName').textContent = data.name;
      document.getElementById('modalServiceDesc').textContent = data.desc;

      const featuresList = document.getElementById('modalServiceFeatures');
      featuresList.innerHTML = data.features.map(feature => `<li>${feature}</li>`).join('');

      const thumbsContainer = document.getElementById('galleryThumbs');
      thumbsContainer.innerHTML = data.images.map((img, idx) => 
        `<img class="gallery-thumb ${idx === 0 ? 'active' : ''}" src="${img}" data-index="${idx}" alt="Servicio ${idx + 1}">`
      ).join('');

      document.querySelectorAll('.gallery-thumb').forEach(thumb => {
        thumb.addEventListener('click', () => {
          document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
          document.getElementById('modalServiceMainImage').src = thumb.src;
        });
      });

      serviceModal.classList.add('active');
    });
  });

  closeServiceModal.addEventListener('click', () => serviceModal.classList.remove('active'));

  // Cerrar modales al hacer clic fuera
  window.addEventListener('click', (e) => {
    if (e.target === productModal) productModal.classList.remove('active');
    if (e.target === serviceModal) serviceModal.classList.remove('active');
  });

  // Cerrar modales con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      productModal.classList.remove('active');
      serviceModal.classList.remove('active');
    }
  });

  // Cerrar menú al cambiar tamaño
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navbar.classList.remove('active');
    }
  });
});