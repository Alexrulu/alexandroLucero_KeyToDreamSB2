document.querySelectorAll('.post-1-second input[type="radio"], .post-1-third input[type="radio"]').forEach((input) => {
  input.addEventListener('change', function () {
    // Encontrar el contenedor del input actual
    const container = this.closest('.post-1-second, .post-1-third');

    // Quitar la clase `.clickp` de todos los labels dentro de ese contenedor
    container.querySelectorAll('label').forEach((label) => {
      label.classList.remove('clickp');
    });

    // Agregar la clase `.clickp` al label del radio seleccionado
    if (this.checked) {
      this.parentElement.classList.add('clickp');
    }
  });
});


document.querySelectorAll('input[type="file"]').forEach((input) => {
  input.addEventListener('change', function () {
    const label = document.querySelector(`label[for="${this.id}"]`);

    // Si se seleccionó un archivo
    if (this.files && this.files.length > 0) {
      label.classList.add('uploaded');
    } else {
      label.classList.remove('uploaded'); // Opcional: Quitar si no se selecciona archivo
    }
  });
});