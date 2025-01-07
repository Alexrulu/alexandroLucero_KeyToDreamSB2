//----------(click unico - MENU BURGER (bars))
const barsButton = document.querySelector('.left-header>.fa-bars');
let isOpenBars = false;
barsButton.addEventListener('click', () => {
  if (isOpenBars) {
    barsButton.classList.remove('openBars');
  } else {
    barsButton.classList.add('openBars');
  }
  isOpenBars = !isOpenBars;
});