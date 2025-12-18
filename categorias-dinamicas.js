document.addEventListener("DOMContentLoaded", () => {
  const menuContainer = document.querySelector(".menu"); // Asegúrate de que exista
  const mapaElements = document.querySelectorAll(".map");
  const categoriasUnicas = new Set();

  // 1. Extraer todas las categorías de todos los mapas
  mapaElements.forEach(mapa => {
    const categorias = mapa.dataset.categorias?.split(" ") || [];
    categorias.forEach(cat => categoriasUnicas.add(cat));
  });

  // 2. Limpiar el menú anterior (opcional)
  menuContainer.innerHTML = "";

  // 3. Añadir botón "Todos"
  const liTodos = document.createElement("li");
  liTodos.dataset.filtro = "todos";
  liTodos.innerHTML = '<a href="#">Todos</a>';
  menuContainer.appendChild(liTodos);

  // 4. Añadir una entrada para cada categoría
  [...categoriasUnicas].sort().forEach(categoria => {
    const li = document.createElement("li");
    li.dataset.filtro = categoria;
    li.innerHTML = `<a href="#">${categoria.toUpperCase()}</a>`;
    menuContainer.appendChild(li);
  });

  menuContainer.querySelectorAll("li").forEach(item => {
    item.addEventListener("click", () => {
      const filtro = item.dataset.filtro;
  
      mapaElements.forEach(mapa => {
        const categorias = mapa.dataset.categorias?.split(" ") || [];
        mapa.style.display =
          filtro === "todos" || categorias.includes(filtro)
            ? "block"
            : "none";
      });
  
      // 🟠 Actualiza el <h2> con la categoría activa
      const categoriaActiva = document.getElementById("categoriaActiva");
      if (categoriaActiva) {
        categoriaActiva.textContent = filtro === "todos"
          ? ""
          : ` ${filtro.toUpperCase()}`;
      }
  
      // 🔁 Refrescar la paginación al aplicar el filtro
      if (typeof window.actualizarItemsPaginacion === "function") {
        window.actualizarItemsPaginacion();
      }
  
      // 🔒 Cierra el menú hamburguesa si está activo
      const toggle = document.getElementById("menuToggle");
      if (toggle) toggle.checked = false;
    });
  });
});