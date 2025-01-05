document.addEventListener('DOMContentLoaded', () => {
  // Iterar sobre los carruseles disponibles
  console.log(carruseles);

  Object.keys(carruseles).forEach((id) => {
    const img = document.querySelector(`#carrusel${id.charAt(0).toUpperCase() + id.slice(1)}`); // Selecciona las imágenes
    const images = carruseles[id]; // Obtén las imágenes del carrusel

    // Generar un índice aleatorio dentro del rango de las imágenes disponibles
    let currentIndex = Math.floor(Math.random() * images.length);

    img.addEventListener('click', (event) => {
      const imgWidth = img.clientWidth;
      const clickX = event.offsetX;

      const leftLimit = imgWidth * 0.2;
      const rightLimit = imgWidth * 0.8;

      if (clickX < leftLimit) {
        // Ir a la imagen anterior
        currentIndex = (currentIndex - 1 + images.length) % images.length;
      } else if (clickX > rightLimit) {
        // Ir a la imagen siguiente
        currentIndex = (currentIndex + 1) % images.length;
      } else {
        // Redirigir al artículo
        window.location.href = '/articulo';
        return;
      }

      if (id == "recomendado") {
        city.innerText = window.carruseles.recomendado[currentIndex].city.toUpperCase();
        adress.innerText = window.carruseles.recomendado[currentIndex].adress.toUpperCase();
        price.innerText = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(window.carruseles.recomendado[currentIndex].price);
      } else {
        city2.innerText = window.carruseles.emprendimiento[currentIndex].city.toUpperCase();
        adress2.innerText = window.carruseles.emprendimiento[currentIndex].adress.toUpperCase();
        price2.innerText = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(window.carruseles.emprendimiento[currentIndex].price);
      }

      // Actualizar el `src` de la imagen
      img.src = images[currentIndex].principalImage;
    });

    // Cargar la imagen aleatoria al cargar la página
    img.src = images[currentIndex].principalImage;
  });
});
