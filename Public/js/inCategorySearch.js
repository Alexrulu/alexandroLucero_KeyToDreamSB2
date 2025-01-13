document.addEventListener("DOMContentLoaded", () => {
  const searchIcon = document.querySelector(".fa-magnifying-glass, .lupa-tactil-inCategory");
  const cityInput = document.querySelector(".header-buscar, .header-buscar-alquilarComprar");
  const alquilarLink = document.querySelector(".alquilar-h3 a");
  const comprarLink = document.querySelector(".comprar-h3 a");
  const activeClass = "active-category";
  const isTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  let inputVisible = false; // Bandera para rastrear si el input está visible
  const isAlquilarPage = window.location.pathname === '/alquilar';
  const isComprarPage = window.location.pathname === '/comprar';

  if (searchIcon && cityInput) {
    searchIcon.addEventListener("click", (event) => {
      const isSmallScreen = window.innerWidth < 931;

      if (isTouchScreen) {
        // Modo táctil: Mostrar el input si está oculto
        if (!inputVisible) {
          cityInput.style.display = "block"; // Mostrar el input
          cityInput.focus();
          inputVisible = true;
          event.stopPropagation();
          return;
        }
      } else if (isSmallScreen) {
        // Modo no táctil en pantallas pequeñas
        if (!inputVisible) {
          cityInput.style.display = "block"; // Mostrar el input
          cityInput.focus();
          inputVisible = true;
          event.stopPropagation();
          return;
        }
      }

      // Obtener el valor de la ciudad
      const city = cityInput.value.trim();

      if (!city) {
        if (!isTouchScreen) alert("Por favor, ingresa el nombre de una ciudad.");
        return;
      }

      if (isAlquilarPage || isComprarPage) {
        const basePath = isAlquilarPage ? "/alquilar" : "/comprar";
        window.location.href = `${basePath}?city=${encodeURIComponent(city)}`;
      } else {
        const isAlquilarSelected = alquilarLink?.parentElement.classList.contains(activeClass);
        const isComprarSelected = comprarLink?.parentElement.classList.contains(activeClass);

        if (!isAlquilarSelected && !isComprarSelected) {
          if (!isTouchScreen) alert("Por favor, selecciona ALQUILAR o COMPRAR.");
          return;
        }

        const basePath = isAlquilarSelected ? "/alquilar" : "/comprar";
        window.location.href = `${basePath}?city=${encodeURIComponent(city)}`;
      }
    });

    // Ocultar el input al hacer clic fuera (solo en pantallas táctiles)
    if (isTouchScreen) {
      document.addEventListener("click", (event) => {
        if (!cityInput.contains(event.target) && event.target !== searchIcon) {
          cityInput.style.display = "none";
          inputVisible = false; // Restablecer la bandera
        }
      });

      cityInput.addEventListener("click", (event) => {
        event.stopPropagation();
      });
    }

    // Modo no táctil: Ocultar el input al hacer clic fuera en pantallas menores a 930px
    if (!isTouchScreen && window.innerWidth < 931) {
      document.addEventListener("click", (event) => {
        if (!cityInput.contains(event.target) && event.target !== searchIcon) {
          cityInput.style.display = "none";
          inputVisible = false; // Restablecer la bandera
        }
      });
    }

  }
});
