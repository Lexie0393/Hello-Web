document.addEventListener("DOMContentLoaded", function(){
    const listaProductosDiv = document.getElementById("lista-productos");

    // Detectar atributos del body
    const categoriaActual = document.body.getAttribute("data-categoria");
    const animalActual = document.body.getAttribute("data-animal");
    const mostrarNovedades = document.body.getAttribute("data-novedad") === "true";

    let productosFiltrados = productos;
    
    // Filtrar según si es página de novedades o no
    if (mostrarNovedades) {
        productosFiltrados = productos.filter(producto =>
            producto.novedad === true &&
            (producto.animal === animalActual || producto.animal === "ambos")
        );
    } else {
        productosFiltrados = productos.filter(producto =>
            producto.categoria === categoriaActual &&
            (producto.animal === animalActual || producto.animal === "ambos")
        );
    }

    //Mostrar productos en el div#lista-productos
    if (productosFiltrados.length === 0) {
        listaProductosDiv.textContent = "No hay productos para mostrar.";
    } else {
        productosFiltrados.forEach(producto => {
            const productoElem = document.createElement("div");
            productoElem.classList.add("producto");

            // Añadir clase 'destacado' si es novedad
            if (producto.novedad) {
                productoElem.classList.add("destacado");
            }

            productoElem.innerHTML = `
                <h3>
                    <a href="producto.html?id=${producto.id}">${producto.nombre}</a>
                    ${producto.novedad ? '<span class="etiqueta-novedad">🆕</span>' : ''}
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
