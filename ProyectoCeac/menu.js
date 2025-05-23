//Para añadir funcionalidad al menú desplegable (dropdown)
document.addEventListener("DOMContentLoaded", function() {
    const toggles = document.querySelectorAll(".dropdown-toggle");

    toggles.forEach(function(toggle){
        toggle.addEventListener("click", function(e){
            //solo funciona en móviles
            if (window.innerWidth < 768) {
                e.preventDefault();
                const content = this.nextElementSibling;
                content.classList.toggle("show");
            }
        });
    });

    // Cerrar al tocar fuera
    toggle.addEventListener("click", function(e){
    if (window.innerWidth < 768) {
        e.preventDefault();
        const content = this.nextElementSibling;
        content.classList.toggle("show");
        
        // Actualizar accesibilidad
        const expanded = this.getAttribute("aria-expanded") === "true";
        this.setAttribute("aria-expanded", !expanded);
    }
});
});