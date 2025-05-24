// Clase para manejar el carrito de compras
class Carrito {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('carrito')) || [];
        this.total = 0;
        this.init();
    }

    init() {
        this.actualizarCarritoUI();
        this.agregarEventListeners();
    }

    agregarEventListeners() {
        // Botones de cantidad
        document.querySelectorAll('.btn-cantidad').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const item = e.target.closest('.carrito-item');
                const id = item.dataset.id;
                if (e.target.textContent === '+') {
                    this.aumentarCantidad(id);
                } else {
                    this.disminuirCantidad(id);
                }
            });
        });

        // Botones de eliminar
        document.querySelectorAll('.btn-eliminar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const item = e.target.closest('.carrito-item');
                const id = item.dataset.id;
                this.eliminarItem(id);
            });
        });

        // Botón de checkout
        const btnCheckout = document.querySelector('.btn-checkout');
        if (btnCheckout) {
            btnCheckout.addEventListener('click', () => this.realizarPedido());
        }
    }

    actualizarCarritoUI() {
        const contenedor = document.querySelector('.carrito-productos');
        const resumenSubtotal = document.querySelector('.resumen-item span:last-child');
        const resumenTotal = document.querySelector('.resumen-total span:last-child');

        if (this.items.length === 0) {
            contenedor.innerHTML = `
                <div class="carrito-vacio">
                    <p>Tu carrito está vacío</p>
                    <a href="index.html" class="btn btn-primary">Ir a comprar</a>
                </div>
            `;
            resumenSubtotal.textContent = '0.00€';
            resumenTotal.textContent = '0.00€';
            return;
        }

        // Limpiar contenedor
        contenedor.innerHTML = '';

        // Calcular total
        this.total = 0;
        this.items.forEach(item => {
            this.total += item.precio * item.cantidad;
            contenedor.innerHTML += `
                <div class="carrito-item" data-id="${item.id}">
                    <img src="${item.imagen}" alt="${item.nombre}" class="carrito-item-imagen">
                    <div class="carrito-item-info">
                        <h3>${item.nombre}</h3>
                        <p class="carrito-item-precio">${item.precio.toFixed(2)}€</p>
                    </div>
                    <div class="carrito-item-cantidad">
                        <button class="btn-cantidad" aria-label="Reducir cantidad">-</button>
                        <input type="number" value="${item.cantidad}" min="1" aria-label="Cantidad" readonly>
                        <button class="btn-cantidad" aria-label="Aumentar cantidad">+</button>
                    </div>
                    <button class="btn-eliminar" aria-label="Eliminar producto">×</button>
                </div>
            `;
        });

        // Actualizar resumen
        resumenSubtotal.textContent = `${this.total.toFixed(2)}€`;
        resumenTotal.textContent = `${this.total.toFixed(2)}€`;

        // Volver a agregar event listeners
        this.agregarEventListeners();
    }

    aumentarCantidad(id) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.cantidad++;
            this.guardarCarrito();
            this.actualizarCarritoUI();
        }
    }

    disminuirCantidad(id) {
        const item = this.items.find(item => item.id === id);
        if (item && item.cantidad > 1) {
            item.cantidad--;
            this.guardarCarrito();
            this.actualizarCarritoUI();
        }
    }

    eliminarItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.guardarCarrito();
        this.actualizarCarritoUI();
    }

    guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(this.items));
    }

    realizarPedido() {
        if (this.items.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }

        // Aquí iría la lógica para procesar el pedido
        alert('¡Gracias por tu compra! Tu pedido está siendo procesado.');
        this.items = [];
        this.guardarCarrito();
        this.actualizarCarritoUI();
    }

    // Método para agregar items (usado desde otras páginas)
    static agregarItem(producto) {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const itemExistente = carrito.find(item => item.id === producto.id);

        if (itemExistente) {
            itemExistente.cantidad++;
        } else {
            carrito.push({...producto, cantidad: 1});
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert('Producto añadido al carrito');
    }
}

// Inicializar carrito cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new Carrito();
}); 