const form = document.getElementById('publishForm');
const postingButton = document.getElementById('postingButton');
const postingPopup = document.getElementById('postingPopup');
const postingProgressBar = postingPopup.querySelector('.posting-progress');

// Añadir un listener para el evento submit
form.addEventListener('submit', async function (event) {
  event.preventDefault(); // Evitar el envío automático del formulario

  if (!form.checkValidity()) {
    alert('Por favor, completa todos los campos requeridos.');
  } else {
    // Mostrar la ventana emergente
    postingPopup.style.display = 'block';

    // Animar la barra de progreso
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10; // Aumentar el progreso en 10 cada intervalo
      postingProgressBar.style.width = `${progress}%`;

      if (progress >= 100) {
        clearInterval(interval);

        // Guardar el estado en localStorage
        localStorage.setItem('published', 'true');

        // Simular el envío del formulario después de la animación
        setTimeout(() => {
          form.submit(); // Enviar el formulario manualmente
        }, 2000); // Esperar un breve momento después de la animación
      }
    }, 100); // Intervalo de 100ms para la animación de progreso
  }
});
