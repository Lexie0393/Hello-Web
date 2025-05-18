document.addEventListener("DOMContentLoaded", function(){
    const listaProductosDiv = document.getElementById("lista-productos");

    // Detectar categoría y animal
    const categoriaActual = document.body.getAttribute("data-categoria");
    const animalActual = document.body.getAttribute("data-animal");
    
    // Filtrar productos según categoría y animal
    const productosFiltrados = productos.filter(producto => 
        producto.categoria === categoriaActual && 
        (producto.animal === animalActual || producto.animal === "ambos")
    );

    //Mostrar productos en el div#lista-productos
    if (productosFiltrados.length === 0) {
        listaProductosDiv.textContent = "No hay productos para mostrar.";
    } else {
        productosFiltrados.forEach(producto => {
            const productoElem = document.createElement("div");
            productoElem.classList.add("producto");

            productoElem.innerHTML = `
                <h3>
                    <a href="producto.html?id=${producto.id}">${producto.nombre}</a>
                </h3>
                ${producto.imagen ? `<a href="producto.html?id=${producto.id}">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
                </a>` : ""}
                <p class="producto-precio">€${producto.precio.toFixed(2)}</p>
            `;

            listaProductosDiv.appendChild(productoElem);
        });
    }
});
