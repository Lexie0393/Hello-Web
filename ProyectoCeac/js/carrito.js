// Elementos del DOM
const cartBtn = document.getElementById('cartBtn');
const miniCart = document.getElementById('miniCart');
const closeCart = document.getElementById('closeCart');
const cartCount = document.querySelector('.cart-count');
const cartTotal = document.getElementById('cartTotal');
const cartItems = document.querySelector('.mini-cart-items');

// Estado del carrito
let cart = [];

// Cargar carrito desde localStorage
function loadCart() {
    try {
        const savedCart = JSON.parse(localStorage.getItem('carrito')) || [];
        // Filtrar elementos inválidos
        cart = savedCart.filter(item => 
            item && 
            item.id && 
            item.nombre && 
            typeof item.precio === 'number' && 
            typeof item.cantidad === 'number' &&
            item.cantidad > 0
        );
        updateCartUI();
    } catch (e) {
        console.error('Error loading cart:', e);
        cart = [];
        updateCartUI();
    }
}

// Guardar carrito en localStorage
function saveCart() {
    localStorage.setItem('carrito', JSON.stringify(cart));
}

// Actualizar contador del carrito
function updateCartCount() {
    if (cartCount) {
        const count = cart.reduce((sum, item) => sum + item.cantidad, 0);
        cartCount.textContent = count;
    }
}

// Actualizar total del carrito
function updateCartTotal() {
    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        cartTotal.textContent = `${total.toFixed(2)}€`;
    }
}

// Renderizar items del mini carrito
function renderMiniCart() {
    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <p>Tu carrito está vacío</p>
                <a href="index.html" class="btn-primary">Ir a comprar</a>
            </div>`;
        return;
    }

    cartItems.innerHTML = '';
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'mini-cart-item';
        const subtotal = item.precio * item.cantidad;
        
        itemElement.innerHTML = `
            <div class="mini-cart-item-content">
                <div class="mini-cart-item-details">
                    <h4 class="mini-cart-item-name">${item.nombre}</h4>
                    <div class="mini-cart-item-price">${item.precio.toFixed(2)}€</div>
                    <div class="mini-cart-item-quantity">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span>${item.cantidad}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="mini-cart-item-remove" data-id="${item.id}">×</button>
            </div>
            <div class="mini-cart-item-subtotal">
                Subtotal: ${subtotal.toFixed(2)}€
            </div>`;
        
        cartItems.appendChild(itemElement);
    });

    // Event listeners para los botones de cantidad
    cartItems.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            if (e.target.classList.contains('plus')) {
                updateQuantity(id, 1);
            } else if (e.target.classList.contains('minus')) {
                updateQuantity(id, -1);
            }
        });
    });

    // Event listeners para los botones de eliminar
    cartItems.querySelectorAll('.mini-cart-item-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            removeFromCart(id);
        });
    });
}

// Actualizar cantidad de un producto
function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        const newQuantity = item.cantidad + change;
        if (newQuantity > 0) {
            item.cantidad = newQuantity;
            saveCart();
            updateCartUI();
        } else if (newQuantity <= 0) {
            removeFromCart(id);
        }
    }
}

// Actualizar toda la UI del carrito
function updateCartUI() {
    updateCartCount();
    updateCartTotal();
    renderMiniCart();
}

// Remover item del carrito
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartUI();
}

// Agregar item al carrito
function addToCart(product) {
    if (!product || !product.id || !product.nombre || typeof product.precio !== 'number') {
        console.error('Producto inválido:', product);
        return;
    }

    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.cantidad++;
    } else {
        cart.push({
            id: product.id,
            nombre: product.nombre,
            precio: product.precio,
            cantidad: 1
        });
    }
    
    saveCart();
    updateCartUI();
    
    if (miniCart) {
        miniCart.classList.add('active');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Cargar carrito inicial
    loadCart();

    // Modal de login
    const userBtn = document.getElementById('userBtn');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementById('closeModal');

    if (userBtn && loginModal && closeModal) {
        userBtn.addEventListener('click', () => {
            loginModal.classList.add('active');
        });

        closeModal.addEventListener('click', () => {
            loginModal.classList.remove('active');
        });

        // Cerrar modal al hacer clic fuera
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.classList.remove('active');
            }
        });

        // Cerrar modal con la tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && loginModal.classList.contains('active')) {
                loginModal.classList.remove('active');
            }
        });
    }

    // Prevenir envío del formulario de login
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Funcionalidad de login pendiente de implementar');
        });
    }

    // Funcionalidad del carrito
    if (cartBtn && miniCart && closeCart) {
        cartBtn.addEventListener('click', () => {
            miniCart.classList.toggle('active');
        });

        closeCart.addEventListener('click', () => {
            miniCart.classList.remove('active');
        });

        // Cerrar carrito al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!miniCart.contains(e.target) && !cartBtn.contains(e.target)) {
                miniCart.classList.remove('active');
            }
        });
    }

    // Botones de añadir al carrito
    const addToCartButtons = document.querySelectorAll('.btn-comprar');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = {
                id: button.dataset.id,
                nombre: button.dataset.nombre,
                precio: parseFloat(button.dataset.precio)
            };
            
            if (product.id && product.nombre && !isNaN(product.precio)) {
                addToCart(product);
            } else {
                console.error('Datos del producto inválidos:', button.dataset);
            }
        });
    });
}); 