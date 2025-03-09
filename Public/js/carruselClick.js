document.addEventListener('DOMContentLoaded', () => {
  Object.keys(carruseles).forEach((id) => {
    const img = document.querySelector(`#carrusel${id.charAt(0).toUpperCase() + id.slice(1)}`);
    const images = carruseles[id];
    const totalImages = images.length;
    // generar un array aleatorio con índices únicos
    const randomIndices = Array.from({ length: totalImages }, (_, i) => i).sort(() => Math.random() - 0.5);
    let currentPosition = 0; // forzar inicio en la posición correcta
    // función para actualizar la propiedad según el índice actual
    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAcAAAA="; 
    const actualizarDatosPropiedad = () => {
      const currentIndex = randomIndices[currentPosition]; // asegurar que sea el primer índice del viaje generado
      const propiedadActual = images[currentIndex];
      setTimeout(actualizarDatosPropiedad, 0);
      // forzar actualización de imagen
      img.src = propiedadActual.principalImage;
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
      img.dataset.url = `/articulo/${propiedadActual.id}`;
    };
    // asegurar que la primera imagen sea la correcta
    setTimeout(actualizarDatosPropiedad, 0);
    img.addEventListener('click', (event) => {
      const imgWidth = img.clientWidth;
      const clickX = event.offsetX;
      const leftLimit = imgWidth * 0.2;
      const rightLimit = imgWidth * 0.8;
      if (clickX < leftLimit) {
        currentPosition = (currentPosition - 1 + totalImages) % totalImages;
      } else if (clickX > rightLimit) {
        currentPosition = (currentPosition + 1) % totalImages;
      } else {
        window.location.href = img.dataset.url;
        return;
      }
      actualizarDatosPropiedad();
    });
  });
});
