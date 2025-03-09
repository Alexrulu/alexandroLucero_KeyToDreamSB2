document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fa-heart').forEach(icon => {
    icon.addEventListener('click', async (event) => {
      if (!isUserLoggedIn) {
        window.location.href = '/login';
        return;
      }
      const propiedadId = icon.dataset.id;
      console.log(`Propiedad ID: ${propiedadId} - Click detectado`);
      const esFavorito = icon.classList.contains('fa-solid');
      const metodo = esFavorito ? 'DELETE' : 'POST';
      try {
        const response = await fetch(`/favoritos/${propiedadId}`, { method: metodo });
        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        if (data.success) {
          // Agregar la clase de animación
          icon.classList.add('animating');
          // Esperar un poco para que la animación se note antes de cambiar el icono
          setTimeout(() => {
            icon.classList.toggle('fa-solid', !esFavorito);
            icon.classList.toggle('fa-regular', esFavorito);
            icon.classList.remove('animating'); // Quitar la clase de animación después
          }, 200);
        } else {
          console.error('Error al actualizar favoritos:', data.message || 'Sin mensaje.');
        }
      } catch (error) {
        console.error('Error al marcar como favorito:', error);
      }
    });
  });
});
