// página principal (index)

// Script específico para la página de inicio
document.addEventListener('DOMContentLoaded', function() {
    loadNoticias();
    initHeroAnimation();
});

//Script para cargar las noticias
function loadNoticias() {
  fetch('data/news_data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const noticias = data.noticias || [];
      const grid = document.getElementById('noticias-grid');
      if (!grid) {
        console.error('No se encontró el elemento con id="noticias-grid"');
        return;
      }
      //Mostrar las noticias
      noticias.forEach(noticia => {
        const card = document.createElement('div');
        card.classList.add('noticia-card');
        card.innerHTML = `
          <img src="${noticia.imagen}" alt="${noticia.titulo}" style="width:100%; height:auto; border-radius:8px;">
          <h3>${noticia.titulo}</h3>
          <p>${noticia.resumen}</p>
          <small>${noticia.fecha} - <em>${noticia.categoria}</em></small>
        `;
        grid.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error loading JSON:', error);
    });
}


// Función para animación del hero
function initHeroAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroBtn = document.querySelector('.hero-btn');
            
    if (heroTitle) {
        setTimeout(() => heroTitle.classList.add('fade-in'), 200);
        setTimeout(() => heroSubtitle.classList.add('fade-in'), 400);
        setTimeout(() => heroBtn.classList.add('fade-in'), 600);
    }
}

//Página de presupuesto (presupuesto.hmtl)
// Validación de formulario y cálculo de presupuesto
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('presupuestoForm');
    const nombreInput = document.getElementById('nombre');
    const apellidosInput = document.getElementById('apellidos');
    const telefonoInput = document.getElementById('telefono');
    const emailInput = document.getElementById('email');
    const productoSelect = document.getElementById('producto');
    const plazoInput = document.getElementById('plazo');
    const extrasCheckboxes = document.querySelectorAll('input[name="extras"]');
    const condicionesCheckbox = document.getElementById('condiciones');
        const resetBtn = document.getElementById('resetBtn');

    // Elementos para mostrar precios
    const precioBase = document.getElementById('precio-base');
    const precioExtras = document.getElementById('precio-extras');
    const descuentoSpan = document.getElementById('descuento');
    const precioTotal = document.getElementById('precio-total');

    // Función para validar nombre (solo letras, máximo 15 caracteres)
    function validarNombre(nombre) {
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,15}$/;
        return regex.test(nombre);
    }

    // Función para validar apellidos (solo letras, máximo 40 caracteres)
    function validarApellidos(apellidos) {
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,40}$/;
        return regex.test(apellidos);
    }

    // Función para validar teléfono (solo números, máximo 9 dígitos)
    function validarTelefono(telefono) {
        const regex = /^\d{1,9}$/;
        return regex.test(telefono);
    }

    // Función para validar email
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Función para mostrar error
    function mostrarError(campo, mensaje) {
        const errorElement = document.getElementById(campo + '-error');
        const inputElement = document.getElementById(campo);
                
        errorElement.textContent = mensaje;
        errorElement.style.display = 'block';
        inputElement.classList.add('error');
    }

    // Función para limpiar error
    function limpiarError(campo) {
        const errorElement = document.getElementById(campo + '-error');
        const inputElement = document.getElementById(campo);
                
        errorElement.style.display = 'none';
        inputElement.classList.remove('error');
    }

    // Función para calcular presupuesto
    function calcularPresupuesto() {
        // Obtener precio base del producto seleccionado
        const precioBaseValue = parseFloat(productoSelect.value) || 0;
                
        // Calcular precio de extras
        let precioExtrasValue = 0;
        extrasCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                precioExtrasValue += parseFloat(checkbox.value);
            }
        });

            // Calcular descuento por anticipación
        const diasAnticipacion = parseInt(plazoInput.value) || 0;
        let porcentajeDescuento = 0;
                
        if (diasAnticipacion >= 90) {
            porcentajeDescuento = 0.15; // 15% descuento
        } else if (diasAnticipacion >= 60) {
            porcentajeDescuento = 0.10; // 10% descuento
        }

        const subtotal = precioBaseValue + precioExtrasValue;
        const descuentoValue = subtotal * porcentajeDescuento;
        const total = subtotal - descuentoValue;

        // Actualizar elementos del DOM
        precioBase.textContent = `€${precioBaseValue}`;
        precioExtras.textContent = `€${precioExtrasValue}`;
        descuentoSpan.textContent = `-€${descuentoValue.toFixed(2)}`;
        precioTotal.innerHTML = `<strong>€${total.toFixed(2)}</strong>`;
    }

    // Event listeners para validación en tiempo real
    nombreInput.addEventListener('input', function() {
        if (this.value.length > 0) {
            if (validarNombre(this.value)) {
                limpiarError('nombre');
            } else {
                mostrarError('nombre', 'El nombre solo debe contener letras y máximo 15 caracteres');
            }
        } else {
            limpiarError('nombre');
        }
    });

    apellidosInput.addEventListener('input', function() {
        if (this.value.length > 0) {
            if (validarApellidos(this.value)) {
                limpiarError('apellidos');
            } else {
                mostrarError('apellidos', 'Los apellidos solo deben contener letras y máximo 40 caracteres');
            }
        } else {
            limpiarError('apellidos');
        }
    });

    telefonoInput.addEventListener('input', function() {
        if (this.value.length > 0) {
            if (validarTelefono(this.value)) {
                limpiarError('telefono');
            } else {
                mostrarError('telefono', 'El teléfono solo debe contener números y máximo 9 dígitos');
            }
        } else {
            limpiarError('telefono');
        }
    });

    emailInput.addEventListener('input', function() {
        if (this.value.length > 0) {
            if (validarEmail(this.value)) {
                limpiarError('email');
            } else {
                mostrarError('email', 'Por favor ingresa un email válido (ejemplo@gmail.com)');
            }
        } else {
            limpiarError('email');
        }
    });

    // Event listeners para cálculo automático del presupuesto
    productoSelect.addEventListener('change', calcularPresupuesto);
    plazoInput.addEventListener('input', calcularPresupuesto);
            
    extrasCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calcularPresupuesto);
    });

    // Event listener para reset del formulario
    resetBtn.addEventListener('click', function() {
        if (confirm('¿Estás seguro de que quieres resetear el formulario?')) {
            form.reset();

            // Limpiar todos los errores
            ['nombre', 'apellidos', 'telefono', 'email'].forEach(campo => {
                limpiarError(campo);
            });
                    
            // Resetear presupuesto
            calcularPresupuesto();
        }
    });

    // Validación del formulario al enviar
    form.addEventListener('submit', function(e) {
        e.preventDefault();
                
        let formularioValido = true;

        // Validar nombre
        if (!nombreInput.value.trim()) {
            mostrarError('nombre', 'El nombre es obligatorio');
            formularioValido = false;
        } else if (!validarNombre(nombreInput.value)) {
            mostrarError('nombre', 'El nombre solo debe contener letras y máximo 15 caracteres');
            formularioValido = false;
        } else {
            limpiarError('nombre');
        }

        // Validar apellidos
        if (!apellidosInput.value.trim()) {
            mostrarError('apellidos', 'Los apellidos son obligatorios');
            formularioValido = false;
        } else if (!validarApellidos(apellidosInput.value)) {
            mostrarError('apellidos', 'Los apellidos solo deben contener letras y máximo 40 caracteres');
            formularioValido = false;
        } else {
            limpiarError('apellidos');
        }

        // Validar teléfono
        if (!telefonoInput.value.trim()) {
            mostrarError('telefono', 'El teléfono es obligatorio');
            formularioValido = false;
        } else if (!validarTelefono(telefonoInput.value)) {
            mostrarError('telefono', 'El teléfono solo debe contener números y máximo 9 dígitos');
            formularioValido = false;
        } else {
            limpiarError('telefono');
        }

        // Validar email
        if (!emailInput.value.trim()) {
            mostrarError('email', 'El email es obligatorio');
            formularioValido = false;
        } else if (!validarEmail(emailInput.value)) {
            mostrarError('email', 'Por favor ingresa un email válido');
            formularioValido = false;
        } else {
            limpiarError('email');
        }

        // Validar que se haya seleccionado un producto
        if (!productoSelect.value) {
            alert('Por favor selecciona un paquete turístico');
            formularioValido = false;
        }

        // Validar que se hayan aceptado las condiciones
        if (!condicionesCheckbox.checked) {
            alert('Debes aceptar las condiciones de privacidad');
            formularioValido = false;
        }

        // Si el formulario es válido, proceder con el envío
        if (formularioValido) {
            alert('¡Presupuesto enviado correctamente! Te contactaremos pronto.');
            // Aquí normalmente se enviaría el formulario al servidor
            // form.submit();
        }
    });

       // Calcular presupuesto inicial
    calcularPresupuesto();
});


//Página de contacto (contacto.html)
// Inicialización del mapa y funcionalidad de contacto
document.addEventListener('DOMContentLoaded', function() {
    // Coordenadas de la oficina en Cusco
    const oficinaCoordenadas = [-13.5186, -71.9786]; // Av. El Sol, Cusco
            
    // Inicializar mapa con Leaflet
    const mapa = L.map('mapa-leaflet').setView(oficinaCoordenadas, 15);
            
    // Añadir capa de mapa base (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(mapa);
            
    // Marcador de la oficina
    const marcadorOficina = L.marker(oficinaCoordenadas).addTo(mapa);
    marcadorOficina.bindPopup(`
        <div style="text-align: center;">
            <h3>Perú Destinos</h3>
            <p><strong>Av. El Sol 123, Cusco</strong></p>
            <p>📞 +51 84 123 456</p>
            <p>📧 info@perudestinos.com</p>
        </div>
    `).openPopup();
            
    // Variables para control de ruta
    let rutaLayer = null;
    let marcadorUsuario = null;
            
    // Función para calcular ruta usando OpenRouteService API
    async function calcularRuta() {
        const direccionUsuario = document.getElementById('direccionUsuario').value.trim();
                
        if (!direccionUsuario) {
            alert('Por favor ingresa tu dirección');
            return;
        }
                
        try {
            // Mostrar indicador de carga
            document.getElementById('tiempoViaje').textContent = 'Calculando...';
            document.getElementById('distanciaViaje').textContent = 'Calculando...';
                    
            // Geocodificar la dirección del usuario usando Nominatim
            const geocodeResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccionUsuario)}&limit=1`);
            const geocodeData = await geocodeResponse.json();
                    
            if (geocodeData.length === 0) {
                throw new Error('No se pudo encontrar la dirección');
            }
                    
            const userCoords = [parseFloat(geocodeData[0].lat), parseFloat(geocodeData[0].lon)];
                    
            // Limpiar marcador anterior del usuario
            if (marcadorUsuario) {
                mapa.removeLayer(marcadorUsuario);
            }
                    
            // Añadir marcador del usuario
            marcadorUsuario = L.marker(userCoords).addTo(mapa);
            marcadorUsuario.bindPopup(`
                <div style="text-align: center;">
                    <h3>Tu ubicación</h3>
                    <p>${direccionUsuario}</p>
                </div>
            `);
                    
            // Ajustar vista para mostrar ambos puntos
            const grupo = new L.featureGroup([marcadorOficina, marcadorUsuario]);
            mapa.fitBounds(grupo.getBounds().pad(0.1));
                    
            // Simular cálculo de ruta (en producción usarías una API real de routing)
            // Para este ejemplo, calculamos distancia aproximada y tiempo estimado
            const distancia = mapa.distance(userCoords, oficinaCoordenadas);
            const distanciaKm = (distancia / 1000).toFixed(1);
            const tiempoMinutos = Math.round((distancia / 1000) * 3); // Estimación: 3 min por km
                    
            // Crear línea de ruta simple
            if (rutaLayer) {
                mapa.removeLayer(rutaLayer);
            }
                    
            rutaLayer = L.polyline([userCoords, oficinaCoordenadas], {
                color: 'red',
                weight: 3,
                opacity: 0.7
            }).addTo(mapa);
                    
            // Actualizar información de viaje
            document.getElementById('tiempoViaje').textContent = `Tiempo estimado: ${tiempoMinutos} min`;
            document.getElementById('distanciaViaje').textContent = `Distancia: ${distanciaKm} km`;
                    
        } catch (error) {
            console.error('Error al calcular ruta:', error);
            alert('Error al calcular la ruta. Verifica que la dirección sea correcta.');
            document.getElementById('tiempoViaje').textContent = 'Tiempo estimado: --';
            document.getElementById('distanciaViaje').textContent = 'Distancia: --';
        }
    }
            
    // Event listener para calcular ruta
    document.getElementById('calcularRuta').addEventListener('click', calcularRuta);
            
    // Event listener para Enter en el input de dirección
    document.getElementById('direccionUsuario').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calcularRuta();
        }
    });
            
    // Formulario de contacto
    const contactoForm = document.getElementById('contactoForm');
            
    contactoForm.addEventListener('submit', function(e) {
        e.preventDefault();
                
        // Validar formulario
        const nombre = document.getElementById('nombreContacto').value.trim();
        const email = document.getElementById('emailContacto').value.trim();
        const asunto = document.getElementById('asunto').value;
        const mensaje = document.getElementById('mensaje').value.trim();
                
        if (!nombre || !email || !asunto || !mensaje) {
            alert('Por favor completa todos los campos obligatorios');
            return;
        }
                
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor ingresa un email válido');
            return;
        }
                
        // Simular envío del formulario
        alert('¡Mensaje enviado correctamente! Te responderemos pronto.');
        contactoForm.reset();
    });
            
    // Botones de contacto alternativo
    document.getElementById('videoCallBtn').addEventListener('click', function(e) {
        e.preventDefault();
        alert('¡Función de videollamada próximamente! Por ahora puedes contactarnos por WhatsApp.');
    });
            
    document.getElementById('citaBtn').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Para agendar una cita presencial, llámanos al +51 84 123 456 o escríbenos por WhatsApp.');
    });
});

// Script específico para la galería (galeria.html)
document.addEventListener('DOMContentLoaded', function() {
    initGallery();
});

let currentImageIndex = 0;
let galleryImages = [];

function initGallery() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    
    // Inicializar array de imágenes
    updateGalleryImages();

    // Event listeners para filtros
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Actualizar botón activo
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar imágenes
            filterGallery(filter);
        });
    });

    // Event listeners para abrir lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const img = this.querySelector('.gallery-image');
            const title = this.querySelector('.gallery-overlay h3').textContent;
            const description = this.querySelector('.gallery-overlay p').textContent;
            
            openLightbox(img.src, title, description, index);
        });
    });

    // Event listeners para cerrar lightbox
    const closeBtn = document.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Event listeners para navegación en lightbox
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Teclado para navegación
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
        }
    });

    // Animación de entrada para las imágenes
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    galleryItems.forEach(item => {
        observer.observe(item);
    });
}

function filterGallery(filter) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const category = item.dataset.category;
        
        if (filter === 'all' || category === filter) {
            item.style.display = 'block';
            setTimeout(() => {
                item.classList.add('fade-in');
            }, 100);
        } else {
            item.style.display = 'none';
            item.classList.remove('fade-in');
        }
    });

    // Actualizar array de imágenes visibles
    updateGalleryImages();
}

function updateGalleryImages() {
    const visibleItems = document.querySelectorAll('.gallery-item[style*="block"], .gallery-item:not([style*="none"])');
    galleryImages = Array.from(visibleItems).map(item => {
        const img = item.querySelector('.gallery-image');
        const title = item.querySelector('.gallery-overlay h3').textContent;
        const description = item.querySelector('.gallery-overlay p').textContent;
        return { src: img.src, title, description };
    });
}

function openLightbox(src, title, description, index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxDescription = document.querySelector('.lightbox-description');
    
    lightboxImage.src = src;
    lightboxTitle.textContent = title;
    lightboxDescription.textContent = description;
    
    currentImageIndex = index;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showPrevImage() {
    if (galleryImages.length === 0) return;
    
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
}

function showNextImage() {
    if (galleryImages.length === 0) return;
    
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxDescription = document.querySelector('.lightbox-description');
    
    const currentImage = galleryImages[currentImageIndex];
    lightboxImage.src = currentImage.src;
    lightboxTitle.textContent = currentImage.title;
    lightboxDescription.textContent = currentImage.description;
}











// Función para resaltar la página activa en la navegación
function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Función para animaciones al hacer scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.card, .section');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// Función para smooth scroll en links internos
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Función para validar email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para validar solo letras
function validateLettersOnly(text) {
    const letterRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return letterRegex.test(text);
}

// Función para validar solo números
function validateNumbersOnly(text) {
    const numberRegex = /^[0-9]+$/;
    return numberRegex.test(text);
}

// Función para mostrar mensajes de error
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    input.classList.add('error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Función para ocultar mensajes de error
function hideError(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    input.classList.remove('error');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

// Función para cargar contenido JSON
async function loadJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading JSON:', error);
        return null;
    }
}

// Función para formatear fecha
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

// Función para formatear precio
function formatPrice(price) {
    return new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN'
    }).format(price);
}

// Función para mostrar/ocultar loader
function showLoader(element) {
    element.innerHTML = '<div class="loader">Cargando...</div>';
}

function hideLoader(element) {
    const loader = element.querySelector('.loader');
    if (loader) {
        loader.remove();
    }
}

// Función para crear elementos HTML de forma segura
function createElement(tag, className = '', content = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.textContent = content;
    return element;
}

// Función para debounce (evitar múltiples ejecuciones)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Función para lazy loading de imágenes
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Función para manejar errores globalmente
function handleError(error, context = '') {
    console.error(`Error ${context}:`, error);
    // Aquí podrías enviar el error a un servicio de logging
}

// Función para inicializar todas las funcionalidades comunes
function initCommonFeatures() {
    highlightActiveNav();
    initScrollAnimations();
    initSmoothScroll();
    initLazyLoading();
}

// Objeto para almacenar datos globales
const AppData = {
    currentPage: '',
    userData: {},
    cache: new Map()
};

// Función para guardar datos en caché
function cacheData(key, data) {
    AppData.cache.set(key, {
        data: data,
        timestamp: Date.now()
    });
}

// Función para obtener datos del caché
function getCachedData(key, maxAge = 5 * 60 * 1000) { // 5 minutos por defecto
    const cached = AppData.cache.get(key);
    if (cached && (Date.now() - cached.timestamp) < maxAge) {
        return cached.data;
    }
    return null;
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initCommonFeatures();
    
    // Detectar la página actual
    AppData.currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Agregar event listeners para formularios
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
});

// Manejar errores no capturados
window.addEventListener('error', function(e) {
    handleError(e.error, 'Uncaught error');
});

// Manejar promesas rechazadas
window.addEventListener('unhandledrejection', function(e) {
    handleError(e.reason, 'Unhandled promise rejection');
});

// Exportar funciones para uso en otras páginas
window.AppUtils = {
    validateEmail,
    validateLettersOnly,
    validateNumbersOnly,
    showError,
    hideError,
    loadJSON,
    formatDate,
    formatPrice,
    showLoader,
    hideLoader,
    createElement,
    debounce,
    handleError,
    cacheData,
    getCachedData
};