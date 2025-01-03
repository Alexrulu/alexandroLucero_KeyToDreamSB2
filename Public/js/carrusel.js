
window.onload = function() {
  const carruselRecomendado = document.getElementById('carruselRecomendado');
  const carruselEmprendimiento = document.getElementById('carruselEmprendimiento');
  const city = document.getElementById('city')
  const adress = document.getElementById('adress')
  const price = document.getElementById('price')
  const city2 = document.getElementById('city2')
  const adress2 = document.getElementById('adress2')
  const price2 = document.getElementById('price2')
  
  // Asegurarnos de que las imágenes están vacías inicialmente
  carruselRecomendado.src = '';  // Limpiamos la imagen de carruselRecomendado
  carruselEmprendimiento.src = '';  // Limpiamos la imagen de carruselEmprendimiento
  city.innerText = ''
  adress.innerText = ''
  price.innerText = ''
  
  // Asegurarnos de que la primera imagen de cada array se cargue por defecto
  if (window.carruseles.recomendado && window.carruseles.recomendado.length > 0) {
    carruselRecomendado.src = window.carruseles.recomendado[0].principalImage;
    console.log(window.carruseles.recomendado);
    city.innerText = window.carruseles.recomendado[0].city
    adress.innerText = window.carruseles.recomendado[0].adress
    price.innerText = window.carruseles.recomendado[0].price

    
  }

  if (window.carruseles.emprendimiento && window.carruseles.emprendimiento.length > 1) {
    carruselEmprendimiento.src = window.carruseles.emprendimiento[1].principalImage; // Asignamos la primera imagen del array
    city2.innerText = window.carruseles.emprendimiento[1].city
    adress2.innerText = window.carruseles.emprendimiento[1].adress
    price2.innerText = window.carruseles.emprendimiento[1].price
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
