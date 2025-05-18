//muestra el detalle al completo de producto
document.addEventListener("DOMContentLoaded", function(){ 
    const params = new URLSearchParams(window.location.search);
    const productoId = parseInt(params.get("id"));
    const detalleProductoDiv = document.getElementById("detalle-producto");

    const producto = productos.find(p => p.id === productoId);

    if (!producto) {
        detalleProductoDiv.textContent = "Producto no encontrado.";
    } else {
        detalleProductoDiv.innerHTML = `
            <h1>${producto.nombre}</h1>
            ${producto.imagen ? `<img src="${producto.imagen}" alt="${producto.nombre}" width="300">` : ""}
            <p>Precio: €${producto.precio.toFixed(2)}</p>
            <p>${producto.descripcion}</p>
        `;
    }
});
