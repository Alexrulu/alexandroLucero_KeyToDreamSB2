//-------------------header right iconos, aparece al click
const clickHeader = document.querySelectorAll('.right-header>h3>i, .masfiltros-button');
clickHeader.forEach(clickHeader => {
  clickHeader.addEventListener('click', () => {
    clickHeader.classList.toggle('clickHeader');
  });
});

//----------(click unico - MENSAJES)
const mismensajesButton = document.querySelector('.mismensajes-button');
const mensajesClick = document.querySelector('.mismensajes-click');
const backMensajesButton = document.querySelector('.mismensajes-click > p');

let isOpen1 = false; // Para rastrear si .mismensajes-click está abierto

// Función para abrir/cerrar mismensajes-click
mismensajesButton.addEventListener('click', () => {
  if (isOpen1) {
    mensajesClick.classList.remove('open1'); // Quitar clase para cerrar
    mismensajesButton.classList.remove('clickHeaderAlternate');
  } else {
    mensajesClick.classList.add('open1'); // Añadir clase para abrir
    mismensajesButton.classList.add('clickHeaderAlternate');
  }
  isOpen1 = !isOpen1; // Alternar el estado
});

// Función para cerrar mismensajes-click al hacer clic en "ATRÁS"
backMensajesButton.addEventListener('click', () => {
  if (isOpen1) {
    mensajesClick.classList.remove('open1'); // Quitar clase para cerrar
    mismensajesButton.classList.remove('clickHeaderAlternate');
    isOpen1 = false;
  }
});

//-----------------------(click unico - MISPROPIEDADES)
document.addEventListener("DOMContentLoaded", () => {
  const mispropiedadesButton = document.querySelector('.mispropiedades-button');
  const mispropiedadesClick = document.querySelector('.mispropiedades-click');
  const backMispropiedadesButton = document.querySelector('.mispropiedades-click > p');
  const adminButton = document.getElementById("mispropiedades-admin-button"); // Botón del admin
  
  let isOpen2 = false; // Para rastrear si .mispropiedades-click está abierto

  // Evitar que el admin active el toggle de apertura
  if (adminButton) {
    adminButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Evita que active el evento de apertura
    });
    return; // Sale de la función para que el código siguiente no se ejecute para el admin
  }

  // Función para abrir/cerrar mispropiedadesClick (solo para usuarios normales)
  mispropiedadesButton.addEventListener('click', () => {
    if (isOpen2) {
      mispropiedadesClick.classList.remove('open2'); // Quitar clase para cerrar
      mispropiedadesButton.classList.remove('clickHeaderAlternate');
    } else {
      mispropiedadesClick.classList.add('open2'); // Añadir clase para abrir
      mispropiedadesButton.classList.add('clickHeaderAlternate');
    }
    isOpen2 = !isOpen2; // Alternar el estado
  });

  // Función para cerrar mispropiedadesClick al hacer clic en "ATRÁS"
  backMispropiedadesButton.addEventListener('click', () => {
    if (isOpen2) {
      mispropiedadesClick.classList.remove('open2'); // Quitar clase para cerrar
      mispropiedadesButton.classList.remove('clickHeaderAlternate');
      isOpen2 = false;
    }
  });
});


//-----------------------(click unico - HISTORIAL)
const historialButton = document.querySelector('.historial-button');
const historialClick = document.querySelector('.historial-click');
const backHistorialButton = document.querySelector('.historial-click > p');

let isOpen3 = false; // Para rastrear si .mismensajes-click está abierto

// Función para abrir/cerrar mismensajes-click
historialButton.addEventListener('click', () => {
  if (isOpen3) {
    historialClick.classList.remove('open3'); // Quitar clase para cerrar
    historialButton.classList.remove('clickHeaderAlternate');
  } else {
    historialClick.classList.add('open3'); // Añadir clase para abrir
    historialButton.classList.add('clickHeaderAlternate');
  }
  isOpen3 = !isOpen3; // Alternar el estado
});

// Función para cerrar mismensajes-click al hacer clic en "ATRÁS"
backHistorialButton.addEventListener('click', () => {
  if (isOpen3) {
    historialClick.classList.remove('open3'); // Quitar clase para cerrar
    historialButton.classList.remove('clickHeaderAlternate');
    isOpen3 = false;
  }
});

//-----------------(click unico - MICUENTA)
const micuentaButton = document.querySelector('.micuenta-button');
const micuentaClick = document.querySelector('.micuenta-click');
const backMicuentaButton = document.querySelector('.micuenta-click>p');

let isOpen4 = false; // Para rastrear si .mismensajes-click está abierto

// Función para abrir/cerrar mismensajes-click
micuentaButton.addEventListener('click', () => {
  if (isOpen4) {
    micuentaClick.classList.remove('open4'); // Quitar clase para cerrar
    micuentaButton.classList.remove('clickHeaderAlternate');
  } else {
    micuentaClick.classList.add('open4'); // Añadir clase para abrir
    micuentaButton.classList.add('clickHeaderAlternate');
  }
  isOpen4 = !isOpen4; // Alternar el estado
});

// Función para cerrar mismensajes-click al hacer clic en "ATRÁS"
backMicuentaButton.addEventListener('click', () => {
  if (isOpen4) {
    micuentaClick.classList.remove('open4'); // Quitar clase para cerrar
    micuentaButton.classList.remove('clickHeaderAlternate');
    isOpen4 = false;
  }
});

//-----------------(click unico - AYUDA)
const ayudaButton = document.querySelector('.ayuda-button');
const ayudaClick = document.querySelector('.ayuda-click');
const backAyudaButton = document.querySelector('.ayuda-click>p:first-child');

let isOpen5 = false; // Para rastrear si .mismensajes-click está abierto

// Función para abrir/cerrar mismensajes-click
ayudaButton.addEventListener('click', () => {
  if (isOpen5) {
    ayudaClick.classList.remove('open5'); // Quitar clase para cerrar
    ayudaButton.classList.remove('clickHeaderAlternate');
  } else {
    ayudaClick.classList.add('open5'); // Añadir clase para abrir
    ayudaButton.classList.add('clickHeaderAlternate');
  }
  isOpen5 = !isOpen5; // Alternar el estado
});

// Función para cerrar mismensajes-click al hacer clic en "ATRÁS"
backAyudaButton.addEventListener('click', () => {
  if (isOpen5) {
    ayudaClick.classList.remove('open5'); // Quitar clase para cerrar
    ayudaButton.classList.remove('clickHeaderAlternate');
    isOpen5 = false;
  }
});

//------------------(click unico - MÁS FILTROS)

const filtrosButton = document.querySelector('.masfiltros-button');
const filtrosClick = document.querySelector('.masfiltros-open');
const backFiltrosButton = document.querySelector('.ayuda-click>p:first-child');

let isOpen6 = false;

filtrosButton.addEventListener('click', () => {
  if (isOpen6) {
    filtrosClick.classList.remove('open6'); 
    filtrosButton.classList.remove('clickHeaderAlternate');
  } else {
    filtrosClick.classList.add('open6'); 
    filtrosButton.classList.add('clickHeaderAlternate');
  }
  isOpen6 = !isOpen6; 
});

backFiltrosButton.addEventListener('click', () => {
  if (isOpen6) {
    filtrosClick.classList.remove('open6'); // Quitar clase para cerrar
    filtrosButton.classList.remove('clickHeaderAlternate');
    isOpen6 = false;
  }
});



//-----------------------------(Cerrar sesión- ventana emergente)
const logoutButton = document.getElementById('logoutButton');
const logoutPopup = document.getElementById('logoutPopup');
const progressBar = logoutPopup.querySelector('.progress');

// Agregar evento de click
logoutButton.addEventListener('click', () => {
  // Mostrar la ventana emergente
  logoutPopup.classList.remove('ventana-logout');

  // Animar la barra de progreso
  let progress = 0;
  const interval = setInterval(() => {
    progress += 100;
    progressBar.style.width = `${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);

      // Esperar que la animación termine antes de redirigir y hacer logout
      setTimeout(() => {
        // Aquí hacemos la redirección a la ruta de logout
        window.location.href = '/logout'; 

        // Después de 1.5 segundos de la redirección, la página se recargará automáticamente
        setTimeout(() => {
          location.reload(); // Recargar la página después de logout
        }, 100); // Tiempo de espera pequeño para que la redirección ocurra antes de la recarga
      }, 1500); // Esperamos 1.5 segundos antes de redirigir al logout
    }
  }, 30); // Intervalo de animación
});


