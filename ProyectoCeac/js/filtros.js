document.addEventListener('DOMContentLoaded', function() {
    const filtrosBtns = document.querySelectorAll('.filtro-btn');
    const productos = document.querySelectorAll('.producto-card');

    // Añadir clase activa al botón "Todos" por defecto
    document.querySelector('[data-categoria="todos"]').classList.add('activo');

    filtrosBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover clase activa de todos los botones
            filtrosBtns.forEach(b => b.classList.remove('activo'));
            // Añadir clase activa al botón clickeado
            btn.classList.add('activo');

            const categoria = btn.dataset.categoria;

            productos.forEach(producto => {
                if (categoria === 'todos') {
                    producto.style.display = 'block';
                } else {
                    if (producto.dataset.categoria === categoria) {
                        producto.style.display = 'block';
                    } else {
                        producto.style.display = 'none';
                    }
                }
            });
        });
    });
}); 