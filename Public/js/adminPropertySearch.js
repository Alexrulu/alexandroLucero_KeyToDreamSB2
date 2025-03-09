// transiciones al filtrar propiedades (Admin)
document.addEventListener("DOMContentLoaded", function () {
  const btnAlquileres = document.getElementById("filtrar-alquileres");
  const btnVentas = document.getElementById("filtrar-ventas");
  const btnMostrarTodo = document.getElementById("mostrar-todo");
  const todasPropiedades = document.querySelectorAll(".todas-propiedades");
  const alquilerPropiedades = document.querySelectorAll(".alquiler-propiedades");
  const ventaPropiedades = document.querySelectorAll(".venta-propiedades");
  function ocultarInstantaneamente(elementos) {
    elementos.forEach(el => {
        el.style.transition = "none";
        el.style.opacity = "0";
        el.style.pointerEvents = "none";
        el.style.position = "absolute";
      });
    }
  function mostrarConTransicion(elementos) {
    elementos.forEach(el => {
        el.style.transition = "opacity 0.5s ease";
        el.style.opacity = "1";
        el.style.pointerEvents = "all";
        el.style.position = "relative";
      });
    }
  function mostrar(tipo) {
    if (tipo === "todas") {
        ocultarInstantaneamente([...alquilerPropiedades, ...ventaPropiedades]);
        setTimeout(() => mostrarConTransicion(todasPropiedades), 50);
      } else if (tipo === "alquiler") {
        ocultarInstantaneamente([...todasPropiedades, ...ventaPropiedades]);
        setTimeout(() => mostrarConTransicion(alquilerPropiedades), 50);
      } else if (tipo === "venta") {
        ocultarInstantaneamente([...todasPropiedades, ...alquilerPropiedades]);
        setTimeout(() => mostrarConTransicion(ventaPropiedades), 50);
      }
    }
    // Al cargar la página, aseguramos que "mostrar todas" esté visible
    mostrar("todas");
    btnAlquileres.addEventListener("click", () => mostrar("alquiler"));
    btnVentas.addEventListener("click", () => mostrar("venta"));
    btnMostrarTodo.addEventListener("click", () => mostrar("todas"));
  });
// buscar propiedades por input
document.addEventListener("DOMContentLoaded", () => {
  const searchIcon = document.querySelector(".admin-lupa");
  const cityInput = document.querySelector(".admin-buscar");
  function buscarPropiedades() {
    const city = cityInput.value.trim().toLowerCase();
    const propiedades = document.querySelectorAll(".todas-propiedades, .alquiler-propiedades, .venta-propiedades");

    if (!city) {
      // Si el input está vacío, mostrar todas las propiedades
      propiedades.forEach((propiedad) => {
        propiedad.style.display = "block";
      });
      return;
    }
    // Filtrar propiedades por ciudad
    propiedades.forEach((propiedad) => {
      const ciudadPropiedad = propiedad.querySelector("p:nth-of-type(2)").textContent.trim().toLowerCase();
      if (ciudadPropiedad.includes(city)) {
        propiedad.style.display = "block";
      } else {
        propiedad.style.display = "none";
      }
    });
  }
  // Evento al hacer clic en la lupa
  searchIcon.addEventListener("click", buscarPropiedades);
  // Evento al presionar Enter en el input
  cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      buscarPropiedades();
    }
  });
});

