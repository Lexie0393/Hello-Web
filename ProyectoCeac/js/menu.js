// Actualizar año actual
document.getElementById('currentYear')?.textContent = new Date().getFullYear();

// Manejo de menús desplegables
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.navegacion__enlace');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        // Mostrar menú al pasar el mouse
        dropdown.addEventListener('mouseenter', () => {
            menu.style.display = 'block';
        });
        
        // Ocultar menú al quitar el mouse
        dropdown.addEventListener('mouseleave', () => {
            menu.style.display = 'none';
        });
        
        // Para dispositivos táctiles
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
            }
        });
    });
});

// Cerrar menús al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.style.display = 'none';
        });
    }
});

// Buscador
document.querySelector('.buscador')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = document.getElementById('buscar').value.trim();
    if (searchTerm) {
        console.log('Buscando:', searchTerm);
        alert(`Buscando: "${searchTerm}"`);
    }
});

// Funcionalidad del carrito
const cartBtn = document.getElementById('cartBtn');
const miniCart = document.getElementById('miniCart');
const closeCart = document.getElementById('closeCart');

if (cartBtn && miniCart) {
    cartBtn.onclick = function() {
        miniCart.classList.toggle('active');
    };
}

if (closeCart && miniCart) {
    closeCart.onclick = function() {
        miniCart.classList.remove('active');
    };
}

// carga de imagenes
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Optimización del rendimiento
window.addEventListener('load', () => {
    console.log('Page fully loaded');
});

// Mejoras de accesibilidad
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && document.activeElement === document.querySelector('.header__logo')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Saltar al contenido principal';
        skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50';
        document.body.insertBefore(skipLink, document.body.firstChild);

        skipLink.addEventListener('click', () => {
            document.querySelector('main').focus();
            skipLink.remove();
        });
    }
});