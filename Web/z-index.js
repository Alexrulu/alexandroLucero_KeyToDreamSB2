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
const zIndex10click = document.querySelectorAll(".index-main img:nth-child(3)");

zIndex10click.forEach((img) => {
  img.addEventListener("click", () => {
    img.style.zIndex = "10"; // Elevar z-index al hacer click
    // Agregar un listener para restaurar el z-index después de la transición
    img.addEventListener("transitionend", () => {
      img.style.zIndex = "1"; // Restaurar z-index al terminar la transición
    }, { once: true }); // Ejecutar este evento una sola vez
  });
});



// para que al hacer click en los bordes de las imagenes estas cambien (Recomendado box)
const imgR = document.getElementById('carruselRecomendado');

const imagesRecomendado = [
  '../Public/recomendado.png',
  '../Public/emprendimiento.png',
  '../Public/usaelmapa.jpg'
];
let currentIndexRecomendado = 0;

// Detectar clic en áreas específicas
imgR.addEventListener('click', (event) => {
  const imgWidth = imgR.clientWidth; // Ancho de la imagen
  const clickX = event.offsetX; // Posición del clic dentro de la imagen

  const leftLimit = imgWidth * 0.2; // 20% del lado izquierdo
  const rightLimit = imgWidth * 0.8; // 20% del lado derecho

  if (clickX < leftLimit) {
    // Clic en el 20% izquierdo
    currentIndexRecomendado = (currentIndexRecomendado - 1 + imagesRecomendado.length) % imagesRecomendado.length;
    imgR.src = imagesRecomendado[currentIndexRecomendado];
  } else if (clickX > rightLimit) {
    // Clic en el 20% derecho
    currentIndexRecomendado = (currentIndexRecomendado + 1) % imagesRecomendado.length;
    imgR.src = imagesRecomendado[currentIndexRecomendado];
  } else {
    //al hacer click en el centro de la imagen
    window.location.href = 'articulo.html'
  }
});

//----------------------------------- (Emprendimiento box)

const imgE = document.getElementById('carruselEmprendimiento');

const imagesEmprendimiento = [
  '../Public/emprendimiento.png',
  '../Public/recomendado.png',
  '../Public/usaelmapa.jpg'
];
let currentIndexEmprendimiento = 0;

// Detectar clic en áreas específicas
imgE.addEventListener('click', (event) => {
  const imgWidth = imgE.clientWidth; // Ancho de la imagen
  const clickX = event.offsetX; // Posición del clic dentro de la imagen

  const leftLimit = imgWidth * 0.2; // 20% del lado izquierdo
  const rightLimit = imgWidth * 0.8; // 20% del lado derecho

  if (clickX < leftLimit) {
    // Clic en el 20% izquierdo
    currentIndexEmprendimiento = (currentIndexEmprendimiento - 1 + imagesEmprendimiento.length) % imagesEmprendimiento.length;
    imgE.src = imagesEmprendimiento[currentIndexEmprendimiento];
  } else if (clickX > rightLimit) {
    // Clic en el 20% derecho
    currentIndexEmprendimiento = (currentIndexEmprendimiento + 1) % imagesEmprendimiento.length;
    imgE.src = imagesEmprendimiento[currentIndexEmprendimiento];
  }
});

//---------------- (Mapa box, para que se extienda al clickear)

const mapaExtend = document.querySelector('.index-main>img:nth-child(3)');
mapaExtend.addEventListener('click', () => {
  mapaExtend.classList.toggle('expandida'); // al hacer click grega o quita la clase 'expandida' simulando un :hover
})

