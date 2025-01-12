document.addEventListener('DOMContentLoaded', () => {
  // Iterar sobre los carruseles disponibles
  console.log(carruseles);
  Object.keys(carruseles).forEach((id) => {
    const img = document.querySelector(`#carrusel${id.charAt(0).toUpperCase() + id.slice(1)}`); // Selecciona las imágenes
    const images = carruseles[id]; // Obtén las imágenes del carrusel
    // Generar un índice aleatorio dentro del rango de las imágenes disponibles
    let currentIndex = Math.floor(Math.random() * images.length);
    // Función para actualizar datos según la propiedad actual
    const actualizarDatosPropiedad = () => {
      const propiedadActual = images[currentIndex];
      img.src = propiedadActual.principalImage; // Actualizar la imagen
      if (id === "recomendado") {
        city.innerText = propiedadActual.city.toUpperCase();
        adress.innerText = propiedadActual.adress.toUpperCase();
        price.innerText = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0, // No mostrar decimales
          maximumFractionDigits: 0, // No mostrar decimales
        }).format(propiedadActual.price);
      } else {
        city2.innerText = propiedadActual.city.toUpperCase();
        adress2.innerText = propiedadActual.adress.toUpperCase();
        price2.innerText = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0, // No mostrar decimales
          maximumFractionDigits: 0, // No mostrar decimales
        }).format(propiedadActual.price);
      }
      // Asociar la URL del detalle de la propiedad al centro de la imagen
      img.dataset.url = `/articulo/${propiedadActual.id}`;
    };
    // Llamar a actualizar datos al cargar la página
    actualizarDatosPropiedad();
    // Evento de clic en la imagen
    img.addEventListener('click', (event) => {
      const imgWidth = img.clientWidth;
      const clickX = event.offsetX;
      const leftLimit = imgWidth * 0.2;
      const rightLimit = imgWidth * 0.8;
      if (clickX < leftLimit) {
        // Ir a la imagen anterior
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        actualizarDatosPropiedad(); // Actualizar datos después de cambiar de imagen
      } else if (clickX > rightLimit) {
        // Ir a la imagen siguiente
        currentIndex = (currentIndex + 1) % images.length;
        actualizarDatosPropiedad(); // Actualizar datos después de cambiar de imagen
      } else {
        // Redirigir al detalle de la propiedad actual
        window.location.href = img.dataset.url;
        return;
      }
    });
  });
});
