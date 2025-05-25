// Funcionalidad para la lista de productos
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar los botones de compra
    inicializarBotonesCompra();
    
    // Inicializar funcionalidad de producto individual si estamos en esa página
    inicializarPaginaProducto();
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

// Funcionalidad para la página de detalle de producto
function inicializarPaginaProducto() {
    // Manejo de miniaturas
    const miniaturas = document.querySelectorAll('.miniatura');
    const imagenPrincipal = document.getElementById('imagen-principal');

    miniaturas.forEach(miniatura => {
        miniatura.addEventListener('click', () => {
            // Actualizar imagen principal
            imagenPrincipal.src = miniatura.src;
            imagenPrincipal.alt = miniatura.alt;

            // Actualizar clase activa
            miniaturas.forEach(m => m.classList.remove('activa'));
            miniatura.classList.add('activa');
        });
    });

    // Manejo de cantidad
    const btnDecrementar = document.querySelector('[data-accion="decrementar"]');
    const btnIncrementar = document.querySelector('[data-accion="incrementar"]');
    const inputCantidad = document.getElementById('cantidad');

    btnDecrementar?.addEventListener('click', () => {
        const valorActual = parseInt(inputCantidad.value);
        if (valorActual > 1) {
            inputCantidad.value = valorActual - 1;
        }
    });

    btnIncrementar?.addEventListener('click', () => {
        const valorActual = parseInt(inputCantidad.value);
        if (valorActual < parseInt(inputCantidad.max)) {
            inputCantidad.value = valorActual + 1;
        }
    });

    // Validación de entrada manual de cantidad
    inputCantidad?.addEventListener('change', () => {
        let valor = parseInt(inputCantidad.value);
        const min = parseInt(inputCantidad.min);
        const max = parseInt(inputCantidad.max);

        if (isNaN(valor) || valor < min) {
            inputCantidad.value = min;
        } else if (valor > max) {
            inputCantidad.value = max;
        }
    });

    // Botón de favoritos
    const btnFavorito = document.querySelector('.btn-favorito');
    btnFavorito?.addEventListener('click', () => {
        btnFavorito.classList.toggle('activo');
        if (btnFavorito.classList.contains('activo')) {
            btnFavorito.style.color = '#e53e3e';
        } else {
            btnFavorito.style.color = '';
        }
    });

    // Añadir al carrito desde la página de producto
    const btnAgregarCarrito = document.getElementById('agregar-carrito');
    btnAgregarCarrito?.addEventListener('click', () => {
        const cantidad = parseInt(inputCantidad.value);
        const producto = {
            id: document.getElementById('referencia-producto').textContent,
            nombre: document.getElementById('nombre-producto').textContent,
            precio: parseFloat(document.getElementById('precio-producto').textContent),
            cantidad: cantidad,
            imagen: imagenPrincipal.src
        };

        // Disparar evento personalizado para el carrito
        const evento = new CustomEvent('agregarAlCarrito', {
            detail: producto
        });
        document.dispatchEvent(evento);

        // Mostrar confirmación
        mostrarNotificacion('Producto añadido al carrito');
    });
}

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion';
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);

    // Añadir estilos
    notificacion.style.position = 'fixed';
    notificacion.style.bottom = '20px';
    notificacion.style.right = '20px';
    notificacion.style.backgroundColor = '#4a90e2';
    notificacion.style.color = 'white';
    notificacion.style.padding = '1rem 2rem';
    notificacion.style.borderRadius = '5px';
    notificacion.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    notificacion.style.animation = 'slideIn 0.3s ease-out';

    // Eliminar después de 3 segundos
    setTimeout(() => {
        notificacion.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            notificacion.remove();
        }, 300);
    }, 3000);
}

// Animaciones para las notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style); 