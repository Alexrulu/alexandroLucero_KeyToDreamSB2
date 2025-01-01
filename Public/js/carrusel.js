
window.onload = function() {
  const carruselRecomendado = document.getElementById('carruselRecomendado');
  const carruselEmprendimiento = document.getElementById('carruselEmprendimiento');
  
  // Asegurarnos de que las imágenes están vacías inicialmente
  carruselRecomendado.src = '';  // Limpiamos la imagen de carruselRecomendado
  carruselEmprendimiento.src = '';  // Limpiamos la imagen de carruselEmprendimiento
  
  // Asegurarnos de que la primera imagen de cada array se cargue por defecto
  if (window.carruseles.recomendado && window.carruseles.recomendado.length > 0) {
    carruselRecomendado.src = window.carruseles.recomendado[0]; // Asignamos la primera imagen del array
  }

  if (window.carruseles.emprendimiento && window.carruseles.emprendimiento.length > 1) {
    carruselEmprendimiento.src = window.carruseles.emprendimiento[1]; // Asignamos la primera imagen del array
  }

  // Ahora, también agregamos las imágenes para el cambio
  window.carruseles.recomendado.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = image;
    imgElement.alt = 'Recomendado';
    carruselRecomendado.appendChild(imgElement);
  });

  window.carruseles.emprendimiento.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = image;
    imgElement.alt = 'Emprendimiento';
    carruselEmprendimiento.appendChild(imgElement);
  });
}
