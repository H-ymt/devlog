
function navDialogHandlers  ()  {
  
  const dialogOverlay = document.querySelector('.js-dialogOverlay');
  const dialogToggle = document.querySelector('.js-dialogToggle');
  const dialog = document.querySelector('.js-dialog');
  
  dialogOverlay.addEventListener('click', toggleDialog);
  dialogToggle.addEventListener('click', toggleDialog);
  
  let isOpen = false;
  
  function toggleDialog() {
    isOpen = !isOpen;
    const method = isOpen ? 'show' : 'close';
    dialog[method]();
    dialogOverlay.classList.toggle('open', isOpen);
  }
  
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isOpen) {
      toggleDialog();
    }
  })
  
}

navDialogHandlers();
document.addEventListener("astro:after-swap", navDialogHandlers)