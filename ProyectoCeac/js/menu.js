// Actualizar año actual
document.getElementById('currentYear').textContent = new Date().getFullYear();

// despliegue menu
document.querySelectorAll('.dropdown').forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');

    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !isExpanded);
    });

    // Cerrar despliegue menu al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            toggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Cerrar despliegue menu con la tecla escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            toggle.setAttribute('aria-expanded', 'false');
            toggle.focus();
        }
    });
});

// Buscador
document.querySelector('.buscador').addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = document.getElementById('buscar').value.trim();
    if (searchTerm) {
        // Here you would typically redirect to a search results page
        console.log('Buscando:', searchTerm);
        alert(`Buscando: "${searchTerm}"`);
    }
});

// Funcionalidad de los botones de usuario y carrito
document.querySelector('[aria-label="Perfil de usuario"]').addEventListener('click', () => {
    alert('Funcionalidad de perfil de usuario');
});

document.querySelector('[aria-label="Carrito de compras"]').addEventListener('click', () => {
    alert('Funcionalidad del carrito de compras');
});

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
    // Analytics code would go here
    console.log('Page fully loaded');
});

// Mejoras de accesibilidad
document.addEventListener('keydown', (e) => {
    // ir al contenido principal de la pestaña de la cabecera
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