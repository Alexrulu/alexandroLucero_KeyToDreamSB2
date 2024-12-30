//------------
document.addEventListener('DOMContentLoaded', () => {
  const successPopup = document.getElementById('successPopup');
  const closePopupButton = document.getElementById('closePopup');

  // Verificar si se publicó correctamente
  if (localStorage.getItem('published') === 'true') {
    // Mostrar la ventana emergente
    successPopup.classList.remove('hidden');

    // Limpiar el estado en localStorage
    localStorage.removeItem('published');
  }

  // Cerrar la ventana emergente al hacer clic en el botón
  closePopupButton.addEventListener('click', () => {
    successPopup.classList.add('hidden');
  });
});
