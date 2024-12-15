// js creado para que el z-index modificado se mantenga en la animación
const images = document.querySelectorAll(".index-main img");

images.forEach((img) => {
  img.addEventListener("mouseover", () => {
    img.style.zIndex = "10"; // Elevar z-index al hacer hover
  });

  img.addEventListener("mouseout", () => {
    img.addEventListener("transitionend", () => {
      img.style.zIndex = "1"; // Restaurar z-index al terminar la transición
    }, { once: true }); // Ejecuta este evento una sola vez
  });
}); 
