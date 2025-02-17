document.addEventListener("DOMContentLoaded", () => {
  const searchIcon = document.querySelector(".fa-magnifying-glass, .lupa-tactil-inCategory");
  const cityInput = document.querySelector(".header-buscar, .header-buscar-alquilarComprar");
  const alquilarLink = document.querySelector(".alquilar-h3 a");
  const comprarLink = document.querySelector(".comprar-h3 a");
  const activeClass = "active-category";
  const isTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  let inputVisible = false;
  const isAlquilarPage = window.location.pathname === '/alquilar';
  const isComprarPage = window.location.pathname === '/comprar';

  function showErrorPopup(message) {
    const popup = document.getElementById("error-popupSearch");
    const messageElement = document.getElementById("error-messageSearch");
    messageElement.textContent = message;
    popup.style.display = "block";
  }

  document.getElementById("close-popupSearch").addEventListener("click", () => {
    document.getElementById("error-popupSearch").style.display = "none";
  });

  function performSearch() {
    const city = cityInput.value.trim();
    if (!city) {
      if (!isTouchScreen) showErrorPopup("Por favor, ingresa el nombre de una ciudad.");
      return;
    }

    if (isAlquilarPage || isComprarPage) {
      const basePath = isAlquilarPage ? "/alquilar" : "/comprar";
      window.location.href = `${basePath}?city=${encodeURIComponent(city)}`;
    } else {
      const isAlquilarSelected = alquilarLink?.parentElement.classList.contains(activeClass);
      const isComprarSelected = comprarLink?.parentElement.classList.contains(activeClass);
      if (!isAlquilarSelected && !isComprarSelected) {
        if (!isTouchScreen) showErrorPopup("Por favor, selecciona ALQUILAR o COMPRAR.");
        return;
      }
      const basePath = isAlquilarSelected ? "/alquilar" : "/comprar";
      window.location.href = `${basePath}?city=${encodeURIComponent(city)}`;
    }
  }

  if (searchIcon && cityInput) {
    searchIcon.addEventListener("click", (event) => {
      const isSmallScreen = window.innerWidth < 931;
      if (isTouchScreen || isSmallScreen) {
        if (!inputVisible) {
          cityInput.style.display = "block";
          cityInput.focus();
          inputVisible = true;
          event.stopPropagation();
          return;
        }
      }
      performSearch();
    });

    cityInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault(); // Evitar el comportamiento predeterminado
        performSearch();
      }
    });

    if (isTouchScreen) {
      document.addEventListener("click", (event) => {
        if (!cityInput.contains(event.target) && event.target !== searchIcon) {
          cityInput.style.display = "none";
          inputVisible = false;
        }
      });
      cityInput.addEventListener("click", (event) => {
        event.stopPropagation();
      });
    }

    if (!isTouchScreen && window.innerWidth < 931) {
      document.addEventListener("click", (event) => {
        if (!cityInput.contains(event.target) && event.target !== searchIcon) {
          cityInput.style.display = "none";
          inputVisible = false;
        }
      });
    }
  }
});
