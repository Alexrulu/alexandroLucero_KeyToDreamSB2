document.addEventListener('DOMContentLoaded', () => {
  // Obtener todos los iconos de favorito (fa-heart)
  document.querySelectorAll('.fa-heart').forEach(icon => {
    icon.addEventListener('click', async (event) => {
      // Verifica si el usuario está logueado
      if (!isUserLoggedIn) {
        window.location.href = '/login';
        return; // Detiene la ejecución si no está logueado
      }

      const propiedadId = icon.dataset.id; // Obtener el ID de la propiedad desde el 'data-id'
      console.log(`Propiedad ID: ${propiedadId} - Click detectado`);

      // Detecta si el icono es favorito actual (fa-solid) o no (fa-regular)
      const esFavorito = icon.classList.contains('fa-solid');
      const metodo = esFavorito ? 'DELETE' : 'POST';

      try {
        // Realiza la petición para agregar o quitar de favoritos
        const response = await fetch(`/favoritos/${propiedadId}`, { method: metodo });
        const data = await response.json();
        console.log('Respuesta del servidor:', data);

        if (data.success) {
          // Cambia el estado del icono según si es favorito o no
          icon.classList.toggle('fa-solid', !esFavorito);
          icon.classList.toggle('fa-regular', esFavorito);
        } else {
          console.error('Error al actualizar favoritos:', data.message || 'Sin mensaje.');
        }
      } catch (error) {
        console.error('Error al marcar como favorito:', error);
      }
    });
  });
});
