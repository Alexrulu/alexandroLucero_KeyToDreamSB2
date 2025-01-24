document.addEventListener('DOMContentLoaded', () => {
  console.log(carruseles);
  
  Object.keys(carruseles).forEach((id) => {
    const img = document.querySelector(`#carrusel${id.charAt(0).toUpperCase() + id.slice(1)}`); // Seleccionar la imagen
    const images = carruseles[id]; // Obtener las imágenes del carrusel
    const totalImages = images.length;

    // Generar un array aleatorio con índices únicos
    const randomIndices = Array.from({ length: totalImages }, (_, i) => i).sort(() => Math.random() - 0.5);
    console.log("Viaje generado:", randomIndices);

    // Variables para manejar el índice actual y la posición en el "viaje"
    let currentPosition = 0; // Posición dentro del array de índices aleatorios

    // Función para actualizar la propiedad según el índice actual
    const actualizarDatosPropiedad = () => {
      const currentIndex = randomIndices[currentPosition];
      const propiedadActual = images[currentIndex];
      
      img.src = propiedadActual.principalImage; // Actualizar la imagen

      if (id === "recomendado") {
        city.innerText = propiedadActual.city.toUpperCase();
        adress.innerText = propiedadActual.adress.toUpperCase();
        price.innerText = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(propiedadActual.price);
      } else {
        city2.innerText = propiedadActual.city.toUpperCase();
        adress2.innerText = propiedadActual.adress.toUpperCase();
        price2.innerText = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
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
        // Retroceder al índice anterior
        currentPosition = (currentPosition - 1 + totalImages) % totalImages;
        actualizarDatosPropiedad();
      } else if (clickX > rightLimit) {
        // Avanzar al siguiente índice
        currentPosition = (currentPosition + 1) % totalImages;
        actualizarDatosPropiedad();
      } else {
        // Redirigir al detalle de la propiedad actual
        window.location.href = img.dataset.url;
      }
    });
  });
});
