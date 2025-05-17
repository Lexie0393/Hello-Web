document.addEventListener("DOMContentLoaded", function(){
    const listaProductosDiv = document.getElementById("lista-productos");

    //array productos
    const productos = [
        {
            id: 1,
            nombre: "Pack Degustación Nutricione Barf",
            precio: 59.45,
            imagen: "img/Pack degustación menú barf.jpeg",
            descripcion: "",
            categoria: "alimentacion",
            animal: "ambos"
        },
        {
            id: 2,
            nombre: "Pollo Menú Barf Nutricione",
            precio: 2.95,
            imagen: "img/Pollo Menu Barf Perro.jpeg",
            descripcion: "",
            categoria: "alimentacion",
            animal: "perro"
        },
        {
            id: 3,
            nombre: "Ternera Menú Barf Nutricione",
            precio: 4.95,
            imagen: "",
            descripcion: "",
            categoria: "alimentacion",
            animal: "perro"
        },
        {
            id: 4,
            nombre: "Boquerón y pavo Me",
            precio: 4.45,
            imagen: "img/Boqueron y pavo Menu Barf Perro.jpeg",
            descripcion: "",
            categoria: "alimentacion",
            animal: "perro"
        },
    ];

    // Detectar categoría y animal
    const categoriaActual = document.body.getAttribute("data-categoria");
    const animalActual = document.body.getAttribute("data-animal");
    
    // Filtrar productos según categoría y animal
    const productosFiltrados = productos.filter(producto => producto.categoria === categoriaActual && (producto.animal === animalActual || producto.animal == "ambos")
    );
    
    //Mostrar productos en el div#lista-productos
    if (productosFiltrados.length === 0) {
        listaProductosDiv.textContent = "No hay productos para mostrar.";
    } else {
        productosFiltrados.forEach(producto => {
            const productoElem = document.createElement("div");
            productoElem.classList.add("producto");

            productoElem.innerHTML = `
                <h3>${producto.nombre}</h3>
                ${producto.imagen ? `<img src="${producto.imagen}" alt="${producto.nombre}" width="150">` : ""}
                <p>Precio: €${producto.precio.toFixed(2)}</p>
                <p>${producto.descripcion}</p>
            `;

            listaProductosDiv.appendChild(productoElem);
        });
    }


});

