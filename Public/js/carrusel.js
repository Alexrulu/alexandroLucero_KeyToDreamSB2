window.onload = function() {
  const carruselRecomendado = document.getElementById('carruselRecomendado');
  const carruselEmprendimiento = document.getElementById('carruselEmprendimiento');
  const city = document.getElementById('city');
  const adress = document.getElementById('adress');
  const price = document.getElementById('price');
  const city2 = document.getElementById('city2');
  const adress2 = document.getElementById('adress2');
  const price2 = document.getElementById('price2');

  // Asegurarnos de que las imágenes están vacías inicialmente
  carruselRecomendado.src = '';  // Limpiamos la imagen de carruselRecomendado
  carruselEmprendimiento.src = '';  // Limpiamos la imagen de carruselEmprendimiento
  city.innerText = '';
  adress.innerText = '';
  price.innerText = '';

  // Función para obtener un índice aleatorio
  function getRandomIndex(arrayLength) {
    return Math.floor(Math.random() * arrayLength);
  }

  // Cargar carrusel recomendado con una imagen aleatoria
  if (window.carruseles.recomendado && window.carruseles.recomendado.length > 0) {
    const randomIndexRecomendado = getRandomIndex(window.carruseles.recomendado.length);
    carruselRecomendado.src = window.carruseles.recomendado[randomIndexRecomendado].principalImage;
    city.innerText = window.carruseles.recomendado[randomIndexRecomendado].city.toUpperCase();
    adress.innerText = window.carruseles.recomendado[randomIndexRecomendado].adress.toUpperCase();
    price.innerText = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(window.carruseles.recomendado[randomIndexRecomendado].price);
  }

  // Cargar carrusel emprendimiento con una imagen aleatoria
  if (window.carruseles.emprendimiento && window.carruseles.emprendimiento.length > 0) {
    const randomIndexEmprendimiento = getRandomIndex(window.carruseles.emprendimiento.length);
    carruselEmprendimiento.src = window.carruseles.emprendimiento[randomIndexEmprendimiento].principalImage;
    city2.innerText = window.carruseles.emprendimiento[randomIndexEmprendimiento].city.toUpperCase();
    adress2.innerText = window.carruseles.emprendimiento[randomIndexEmprendimiento].adress.toUpperCase();
    price2.innerText = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(window.carruseles.emprendimiento[randomIndexEmprendimiento].price);
  }

  // Ahora, también agregamos las imágenes para el cambio
  window.carruseles.recomendado.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = image.principalImage;
    imgElement.alt = 'Recomendado';
    carruselRecomendado.appendChild(imgElement);
  });

  window.carruseles.emprendimiento.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = image.principalImage;
    imgElement.alt = 'Emprendimiento';
    carruselEmprendimiento.appendChild(imgElement);
  });
}
