document.addEventListener('DOMContentLoaded', () => {
    // Inicializar los botones de compra
    inicializarBotonesCompra();
});

function inicializarBotonesCompra() {
    const botonesCompra = document.querySelectorAll('.btn-comprar');
    
    botonesCompra.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const producto = {
                id: e.target.dataset.id,
                nombre: e.target.dataset.nombre,
                precio: parseFloat(e.target.dataset.precio),
                imagen: e.target.dataset.imagen
            };

            // Usar el método estático de la clase Carrito para agregar el producto
            Carrito.agregarItem(producto);

            // Animación del botón
            animarBotonCompra(e.target);
        });
    });
}

function animarBotonCompra(boton) {
    // Guardar el texto original
    const textoOriginal = boton.textContent;
    
    // Cambiar el texto y estilo
    boton.textContent = '¡Añadido!';
    boton.style.backgroundColor = '#16a34a';
    
    // Deshabilitar el botón temporalmente
    boton.disabled = true;
    
    // Restaurar el botón después de 1.5 segundos
    setTimeout(() => {
        boton.textContent = textoOriginal;
        boton.style.backgroundColor = '';
        boton.disabled = false;
    }, 1500);
}

// Funcionalidad del menú desplegable
document.querySelectorAll('.dropdown-toggle').forEach(dropdownToggle => {
    dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const dropdownMenu = e.target.nextElementSibling;
        
        // Toggle aria-expanded
        const isExpanded = e.target.getAttribute('aria-expanded') === 'true';
        e.target.setAttribute('aria-expanded', !isExpanded);
        
        // Toggle visibility
        if (isExpanded) {
            dropdownMenu.style.opacity = '0';
            dropdownMenu.style.visibility = 'hidden';
            dropdownMenu.style.transform = 'translateY(-10px)';
        } else {
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.visibility = 'visible';
            dropdownMenu.style.transform = 'translateY(0)';
        }
    });
});

// Cerrar menús desplegables al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            toggle.setAttribute('aria-expanded', 'false');
        });
        
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.style.opacity = '0';
            menu.style.visibility = 'hidden';
            menu.style.transform = 'translateY(-10px)';
        });
    }
});

// Navegación por teclado en el menú
document.querySelectorAll('.dropdown-menu').forEach(menu => {
    const items = menu.querySelectorAll('a');
    const firstItem = items[0];
    const lastItem = items[items.length - 1];

    menu.addEventListener('keydown', (e) => {
        const target = e.target;
        
        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (target === lastItem) {
                    firstItem.focus();
                } else {
                    target.nextElementSibling?.querySelector('a')?.focus();
                }
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                if (target === firstItem) {
                    lastItem.focus();
                } else {
                    target.previousElementSibling?.querySelector('a')?.focus();
                }
                break;
                
            case 'Escape':
                e.preventDefault();
                target.closest('.dropdown').querySelector('.dropdown-toggle').focus();
                break;
        }
    });
}); 