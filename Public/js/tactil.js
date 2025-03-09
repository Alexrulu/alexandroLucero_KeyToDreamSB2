document.addEventListener('DOMContentLoaded', () => {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.body.classList.add('touch-screen');
  }
});
// detecta si el usuario utiliza un dispositivo con pantalla táctil, y si es así, agrega la clase 'touch-screen' al body
