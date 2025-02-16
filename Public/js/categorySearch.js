document.addEventListener("DOMContentLoaded", () => {
  const searchIcon = document.querySelector(".fa-magnifying-glass");
  const cityInput = document.querySelector(".header-buscar");
  const alquilarLink = document.querySelector(".alquilar-h3 a");
  const comprarLink = document.querySelector(".comprar-h3 a");
  const activeClass = "active-category";
  alquilarLink.addEventListener("click", (event) => {
    if (cityInput.value.trim()) {
      event.preventDefault();
      alquilarLink.parentElement.classList.add(activeClass);
      comprarLink.parentElement.classList.remove(activeClass);
    }
  });
  comprarLink.addEventListener("click", (event) => {
    if (cityInput.value.trim()) {
      event.preventDefault();
      comprarLink.parentElement.classList.add(activeClass);
      alquilarLink.parentElement.classList.remove(activeClass);
    }
  });
  searchIcon.addEventListener("click", () => {
    const city = cityInput.value.trim();
    const isAlquilarSelected = alquilarLink.parentElement.classList.contains(activeClass);
    const isComprarSelected = comprarLink.parentElement.classList.contains(activeClass);
    if (!city) {
      alert("Por favor, ingresa el nombre de una ciudad.");
      return;
    }
    if (!isAlquilarSelected && !isComprarSelected) {
      alert("Por favor, selecciona ALQUILAR o COMPRAR.");
      return;
    }
    // Redirige a la URL correspondiente con el nombre de la ciudad
    const basePath = isAlquilarSelected ? "/alquilar" : "/comprar";
    window.location.href = `${basePath}?city=${encodeURIComponent(city)}`;
  });
});
//click category
document.querySelectorAll('.left-header > h3').forEach(category => {
  category.addEventListener('click', (event) => {
    // Remover la clase 'active-category' de todas las categorías
    document.querySelectorAll('.left-header > h3.active-category').forEach(active => {
      active.classList.remove('active-category');
    });
    // Agregar la clase 'active-category' a la categoría seleccionada
    event.currentTarget.classList.add('active-category');
  });
});


