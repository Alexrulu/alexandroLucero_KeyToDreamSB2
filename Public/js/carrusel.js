window.onload = function () {
  const carruselRecomendado = document.getElementById('carruselRecomendado');
  const carruselEmprendimiento = document.getElementById('carruselEmprendimiento');
  const city = document.getElementById('city');
  const adress = document.getElementById('adress');
  const price = document.getElementById('price');
  const city2 = document.getElementById('city2');
  const adress2 = document.getElementById('adress2');
  const price2 = document.getElementById('price2');

  // Crear índices globales
  window.currentIndices = {
    recomendado: 0,
    emprendimiento: 0,
  };

  // Función para obtener un índice aleatorio
  function getRandomIndex(arrayLength) {
    return Math.floor(Math.random() * arrayLength);
  }

  // Cargar carrusel recomendado con una imagen aleatoria
  if (window.carruseles.recomendado && window.carruseles.recomendado.length > 0) {
    const randomIndexRecomendado = getRandomIndex(window.carruseles.recomendado.length);
    window.currentIndices.recomendado = randomIndexRecomendado;
    const propiedad = window.carruseles.recomendado[randomIndexRecomendado];
    carruselRecomendado.src = propiedad.principalImage;
    carruselRecomendado.dataset.url = `/articulo/${propiedad.id}`; // Asignar data-url
    city.innerText = propiedad.city.toUpperCase();
    adress.innerText = propiedad.adress.toUpperCase();
    price.innerText = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0, // No mostrar decimales
      maximumFractionDigits: 0,
    }).format(propiedad.price);
  }

  // Cargar carrusel emprendimiento con una imagen aleatoria
  if (window.carruseles.emprendimiento && window.carruseles.emprendimiento.length > 0) {
    const randomIndexEmprendimiento = getRandomIndex(window.carruseles.emprendimiento.length);
    window.currentIndices.emprendimiento = randomIndexEmprendimiento;
    const propiedad = window.carruseles.emprendimiento[randomIndexEmprendimiento];
    carruselEmprendimiento.src = propiedad.principalImage;
    carruselEmprendimiento.dataset.url = `/articulo/${propiedad.id}`;
    city2.innerText = propiedad.city.toUpperCase();
    adress2.innerText = propiedad.adress.toUpperCase();
    price2.innerText = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(propiedad.price);
  }
};
