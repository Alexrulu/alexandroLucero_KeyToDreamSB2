    const form = document.getElementById('publishForm');
    const postingButton = document.getElementById('postingButton');
    const postingPopup = document.getElementById('postingPopup');
    const postingProgressBar = postingPopup.querySelector('.posting-progress');
    
    
    // Añadir un listener para el evento submit
    form.addEventListener('submit', async function(event) {

      if (!form.checkValidity()) {
        event.preventDefault();  // No enviará el formulario si no está completo
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
    
            // Redirigir a la página principal después de un retraso
            setTimeout(() => {
              window.location.href = '/';
            }, 2000); // Esperar 2 segundos para redirigir
          }
        }, 100); // Intervalo de 200ms para la animación de progreso

        
      }
    });