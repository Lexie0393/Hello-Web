document.addEventListener("DOMContentLoaded", function() {
    const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

    dropdownToggles.forEach(function (toggle) {
        toggle.addEventListener("click", function (e) {
            e.preventDefault(); //Evita que el enlace navegue
            const dropdown = this.parentElement;
            const content = dropdown.querySelector(".dropdown-content");

            //Cierra todos los demás dropdowns
            document.querySelectorAll(".dropdown-content").forEach(function (el) {
                if (el !== content) {
                    el.computedStyleMap.display = "none";
                }
            });

            //Alternar visibilidad del actual
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    });

    // Cierra el menú si haces clic fuera
    document.addEventListener("click", function (e) {
        if (!e.target.closest(".dropdown")) {
            document.querySelectorAll(".dropdown-content").forEach(function (el) {
                el.style.display = "none";
            });
        }
    });
});