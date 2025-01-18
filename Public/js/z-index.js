function aplicarEventos() {
  const zIndex10 = document.querySelectorAll(".index-main img:first-child, .index-main img:nth-child(2)");

  if (window.innerWidth <= 720) { // Para pantallas pequeñas (<= 720px)
    zIndex10.forEach((img) => {
      img.style.zIndex = "1"; // Asegurar que el z-index sea 1 desde el inicio
      img.onmouseover = () => (img.style.zIndex = "1"); // Hover no cambia z-index
      img.onmouseout = () => (img.style.zIndex = "1"); // Restaurar a 1
    });
  } else { // Para pantallas grandes (> 720px)
    zIndex10.forEach((img) => {
      img.onmouseover = () => (img.style.zIndex = "10"); // Hover eleva z-index
      img.onmouseout = () => (img.style.zIndex = "1"); // Restaurar a 1
    });
  }
}
// Llamar la función al cargar la página
aplicarEventos();
// Actualizar eventos dinámicamente al redimensionar la ventana
window.addEventListener("resize", aplicarEventos);

//para que el z-index se mantenga en 10 en la animacion al hacer click(mapa box)
const zIndex10click = document.querySelectorAll(".index-main div:nth-child(3)");

zIndex10click.forEach((img) => {
  img.addEventListener("click", () => {
    img.style.zIndex = "10"; // Elevar z-index al hacer click
    // Agregar un listener para restaurar el z-index después de la transición
    img.addEventListener("transitionend", () => {
      img.style.zIndex = "1"; // Restaurar z-index al terminar la transición
    }, { once: true }); // Ejecutar este evento una sola vez
  });
});

//---------------- (Mapa box, para que se extienda al clickear)

// Seleccionar el contenedor del mapa
const mapaExtend = document.querySelector('.index-main>div:nth-child(3)');

// Evento para extender el mapa
mapaExtend.addEventListener('click', (event) => {
  event.stopPropagation(); // Evitar que el evento se propague al documento
  mapaExtend.classList.add('expandida'); // Agregar la clase para extender el mapa

  // Esperar a que la transición termine antes de redibujar el mapa
  setTimeout(() => {
    map.invalidateSize(); // Redibujar el mapa para adaptarse al nuevo tamaño
  }, 300);
});

// Evento global para cerrar el mapa
document.addEventListener('click', (event) => {
  if (!mapaExtend.contains(event.target)) {
    mapaExtend.classList.remove('expandida'); // Remover la clase para contraer el mapa
  }
});




