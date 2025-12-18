document.addEventListener("DOMContentLoaded", function () {
    const itemsPerPage = 3;
    let currentPage = 1;
    let currentItems = Array.from(document.querySelectorAll(".map"));
    
    const prevBtn = document.getElementById("prevPage");
    const nextBtn = document.getElementById("nextPage");
    const pageIndicator = document.getElementById("pageIndicator");

    function updatePagination() {
        const totalPages = Math.ceil(currentItems.length / itemsPerPage);

        currentItems.forEach((map, index) => {
            if (index >= (currentPage - 1) * itemsPerPage && index < currentPage * itemsPerPage) {
                map.style.display = "flex";
            } else {
                map.style.display = "none";
            }
        });

        pageIndicator.textContent = ` ${currentPage} / ${totalPages || 1}`;
        prevBtn.style.display = currentPage > 1 ? "inline-block" : "none";
        nextBtn.style.display = currentPage < totalPages ? "inline-block" : "none";
    }

    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    });

    nextBtn.addEventListener("click", () => {
        const totalPages = Math.ceil(currentItems.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            updatePagination();
        }
    });

    // 🔄 Esta función se puede llamar desde otros scripts
    window.actualizarItemsPaginacion = function () {
        currentItems = Array.from(document.querySelectorAll(".map"))
            .filter(map => map.style.display !== "none");
        currentPage = 1;
        updatePagination();
    };

    // Inicializar
    window.actualizarItemsPaginacion();
});

