//-----------------------------(publicar- ventana emergente)
const postingButton = document.getElementById('postingButton');
const postingPopup = document.getElementById('postingPopup');
const postingProgressBar = postingPopup.querySelector('.posting-progress');

// Agregar evento de click
postingButton.addEventListener('click', () => {
  // Mostrar la ventana emergente
  postingPopup.classList.remove('ventana-posting');

  // Animar la barra de progreso
  let progress = 0;
  const interval = setInterval(() => {
    progress += 100;
    postingProgressBar.style.width = `${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
      // Guardar el estado en localStorage
      localStorage.setItem('published', 'true');

      // Redirigir a index.html
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000); // Esperar un poco para redirigir
    }
  },);
});
