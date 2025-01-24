document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const closeModal = document.querySelector('.close-modal');
  const prevImageBtn = document.getElementById('prevImage');
  const nextImageBtn = document.getElementById('nextImage');

  const images = Array.from(document.querySelectorAll('.article-img-box img')); // Convierte NodeList a array
  let currentIndex = 0; // Índice de la imagen actual

  // Abrir modal y mostrar la imagen seleccionada
  images.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentIndex = index; // Guarda el índice de la imagen actual
      modal.style.display = 'flex';
      modalImg.src = img.src; // Muestra la imagen seleccionada
    });
  });

  // Función para actualizar la imagen en el modal
  const updateImage = (index) => {
    currentIndex = (index + images.length) % images.length; // Manejo circular del índice
    modalImg.src = images[currentIndex].src;
  };

  // Evento para ir a la imagen anterior
  prevImageBtn.addEventListener('click', () => {
    updateImage(currentIndex - 1);
  });

  // Evento para ir a la siguiente imagen
  nextImageBtn.addEventListener('click', () => {
    updateImage(currentIndex + 1);
  });

  // Cerrar el modal al hacer clic en el botón de cerrar
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Cerrar el modal al hacer clic fuera de la imagen
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});
