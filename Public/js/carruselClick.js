document.addEventListener('DOMContentLoaded', () => {
  // Iterar sobre los carruseles disponibles
  Object.keys(carruseles).forEach((id) => {
    const img = document.querySelector(`#carrusel${id.charAt(0).toUpperCase() + id.slice(1)}`); // Selecciona las imágenes
    const images = carruseles[id]; // Obtén las imágenes del carrusel
    let currentIndex = 0;

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

      // Actualizar el `src` de la imagen
      img.src = images[currentIndex];
    });
  });
});