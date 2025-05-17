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
    document.addEventListener("click", function(e){
        if (window.innerWidth < 768 && !e.target.closet(".dropdown")) {
            document.querySelectorAll(".dropdown-content").forEach(function(el) {
                el.classList.remove("show");
            });
        }
    });
});