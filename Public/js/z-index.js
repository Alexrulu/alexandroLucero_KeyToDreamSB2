// función para que el z-index se respete durante la transición de un contenedor
function aplicarEventos() {
  const zIndex10 = document.querySelectorAll(".index-main img:first-child, .index-main img:nth-child(2)");

  if (window.innerWidth <= 720) { // para pantallas pequeñas (<= 720px)
    zIndex10.forEach((img) => {
      img.style.zIndex = "1"; // asegurar que el z-index sea 1 desde el inicio
      img.onmouseover = () => (img.style.zIndex = "1"); // hover no cambia z-index
      img.onmouseout = () => (img.style.zIndex = "1"); // restaurar a 1
    });
  } else { // para pantallas grandes (> 720px)
    zIndex10.forEach((img) => {
      img.onmouseover = () => (img.style.zIndex = "10"); // hover eleva z-index
      img.onmouseout = () => (img.style.zIndex = "1"); // restaurar a 1
    });
  }
}
// llamar la función al cargar la página
aplicarEventos();
// actualizar eventos dinámicamente al redimensionar la ventana
window.addEventListener("resize", aplicarEventos);

// para que el z-index se mantenga en 10 en la animacion al hacer click(mapa box)
const zIndex10click = document.querySelectorAll(".index-main div:nth-child(3)");

zIndex10click.forEach((img) => {
  img.addEventListener("click", () => {
    img.style.zIndex = "10"; // elevar z-index al hacer click
    // agregar un listener para restaurar el z-index después de la transición
    img.addEventListener("transitionend", () => {
      img.style.zIndex = "1"; // restaurar z-index al terminar la transición
    }, { once: true }); // ejecutar este evento una sola vez
  });
});

//---------------- (mapa box, para que se extienda al clickear)
const mapaExtend = document.querySelector('.index-main>div:nth-child(3)');

// evento para extender el mapa
mapaExtend.addEventListener('click', (event) => {
  event.stopPropagation(); // evitar que el evento se propague al documento
  mapaExtend.classList.add('expandida'); // agregar la clase para extender el mapa

  // esperar a que la transición termine antes de redibujar el mapa
  setTimeout(() => {
    map.invalidateSize(); // redibujar el mapa para adaptarse al nuevo tamaño
  }, 300);
});

// evento global para cerrar el mapa
document.addEventListener('click', (event) => {
  if (!mapaExtend.contains(event.target)) {
    mapaExtend.classList.remove('expandida'); // Remover la clase para contraer el mapa
  }
});




