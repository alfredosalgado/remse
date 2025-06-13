document.addEventListener("DOMContentLoaded", function () {
  const btn = document.querySelector('.whatsapp-btn');

  if (btn) {
    btn.addEventListener('click', function (event) {
      event.preventDefault(); // Evita que el navegador siga el enlace `href`
      const phone = '56987713323'; // Número de teléfono
      const message = 'Hola, me interesa obtener más información.';
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    });
  } else {
    console.error("No se encontró el botón de WhatsApp en el DOM.");
  }
});

// Obtén el botón de "Subir"
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Cuando el usuario haga scroll hacia abajo, muestra el botón
window.onscroll = function () {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    scrollToTopBtn.style.display = "flex"; // Muestra el botón
  } else {
    scrollToTopBtn.style.display = "none"; // Oculta el botón
  }
};

// Cuando el usuario haga clic en el botón, realiza el desplazamiento suave
scrollToTopBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Evita la acción predeterminada de ancla

  // Desplazamiento suave hasta la parte superior
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Añade la transición suave
  });
});





document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('main, section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const openIcon = document.getElementById('menu-open-icon');
    const closeIcon = document.getElementById('menu-close-icon');

    // --- Mobile Menu Toggle ---
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        openIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    });

    // --- Close Mobile Menu on Link Click ---
    const mobileLinks = document.querySelectorAll('#mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            openIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        });
    });
    
    // --- Active Link Highlighting on Scroll ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if (section.id) {
            observer.observe(section);
        }
    });

    // --- Workshop Gallery ---
    const galleryContainer = document.getElementById('gallery');
    if(galleryContainer) { // Check if gallery exists
        const wrapper = document.getElementById('gallery-wrapper');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const modal = document.getElementById('image-modal');
        const modalImg = document.getElementById('modal-image');
        const closeModalBtn = document.getElementById('close-modal-btn');

        // --- Configuration ---
        const totalImages = 26; // Define the total number of images
        const imagePath = 'assets/img/galeria/'; // Define the path to the images
        let currentIndex = 0;
        let autoSlideInterval;

        // --- Generate Gallery Items ---
        function createGallery() {
            for (let i = 1; i <= totalImages; i++) {
                const div = document.createElement('div');
                div.className = 'gallery-item';
                
                const img = document.createElement('img');
                // IMPORTANT: Replace placehold.co with your actual image path
                // Example for local files: img.src = `${imagePath}${i}.jpg`; 
                img.src = `${imagePath}${i}.jpg`;
                img.alt = `Imagen del taller ${i}`;
                img.className = 'w-full h-96 object-cover';
                img.dataset.index = i - 1;

                div.appendChild(img);
                wrapper.appendChild(img);
            }
        }

        // --- Carousel Logic ---
        function updateCarousel() {
            if (wrapper.children.length > 0) {
                const itemWidth = wrapper.children[0].offsetWidth + 20; // 20 for margin
                const newTransform = -currentIndex * itemWidth;
                wrapper.style.transform = `translateX(${newTransform}px)`;
            }
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % totalImages;
            updateCarousel();
        }

        function showPrev() {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            updateCarousel();
        }

        // --- Modal Logic ---
        function openModal(src) {
            modalImg.src = src;
            modal.classList.remove('hidden');
            stopAutoSlide();
        }

        function closeModal() {
            modal.classList.add('hidden');
            startAutoSlide();
        }
        
        // --- Auto Slide ---
        function startAutoSlide() {
            stopAutoSlide(); // Clear any existing interval
            autoSlideInterval = setInterval(showNext, 3000); // Change image every 3 seconds
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        // --- Event Listeners ---
        nextBtn.addEventListener('click', () => {
            showNext();
            startAutoSlide();
        });
        prevBtn.addEventListener('click', () => {
            showPrev();
            startAutoSlide();
        });
        
        wrapper.addEventListener('click', (e) => {
            if(e.target.tagName === 'IMG') {
                openModal(e.target.src);
            }
        });

        closeModalBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        galleryContainer.addEventListener('mouseenter', stopAutoSlide);
        galleryContainer.addEventListener('mouseleave', startAutoSlide);
        
        // --- Initialize ---
        createGallery();
        startAutoSlide();
        window.addEventListener('resize', updateCarousel);
    }

    // --- Contact Form ---
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = this.querySelector('[name="nombre"]').value;
        const apellido = this.querySelector('[name="apellido"]').value;
        const email = this.querySelector('[name="email"]').value;
        const telefono = this.querySelector('[name="telefono"]').value;
        const tipoClienteRadio = this.querySelector('[name="tipo_cliente"]:checked');
        const mensaje = this.querySelector('[name="mensaje"]').value;
        
        if (!tipoClienteRadio) {
            alert('Por favor, selecciona si eres Empresa o Persona Natural.');
            return;
        }
        
        const tipoCliente = tipoClienteRadio.value;

        const whatsappNumber = '56987713323';
        let messageBody = `Hola, me contacto desde la web:\n\n`;
        messageBody += `*Nombre:* ${nombre} ${apellido}\n`;
        messageBody += `*Tipo de Cliente:* ${tipoCliente}\n`;
        messageBody += `*Email:* ${email}\n`;
        messageBody += `*Teléfono:* ${telefono}\n`;
        if (mensaje) {
          messageBody += `*Mensaje:* ${mensaje}`;
        }
        
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(messageBody)}`;
        
        window.open(whatsappUrl, '_blank');
    });

});