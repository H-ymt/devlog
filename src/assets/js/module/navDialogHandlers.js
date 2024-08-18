function navDialogHandlers() {
  const dialogOverlay = document.querySelector('[data-js="dialogOverlay"]')
  const dialogToggle = document.querySelector('[data-js="dialogToggle"]')
  const dialog = document.querySelector('[data-js="dialog"]')

  dialogOverlay?.addEventListener('click', toggleDialog)
  dialogToggle?.addEventListener('click', toggleDialog)

  let isOpen = false

  function toggleDialog() {
    isOpen = !isOpen
    const method = isOpen ? 'show' : 'close'
    dialog[method]()
    dialogOverlay?.classList.toggle('open', isOpen)
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) {
      toggleDialog()
    }
  })
}

navDialogHandlers()
document.addEventListener('astro:after-swap', navDialogHandlers)
