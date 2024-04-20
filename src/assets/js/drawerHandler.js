const button = document.querySelector('.js-toggleDrawer')
const drawer = document.querySelector('.js-drawer')
let isOpen = false
let focusableElements, firstFocusableElement, lastFocusableElement

function setFocusableElements() {
  focusableElements = Array.from(
    drawer.querySelectorAll(
      'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
    ),
  )
  firstFocusableElement = focusableElements[0]
  lastFocusableElement = focusableElements[focusableElements.length - 1]
}

function drawerHandler() {
  isOpen = !isOpen

  if (isOpen) {
    button.classList.add('open', isOpen)
    button.setAttribute('aria-label', 'メニューを閉じる')
    drawer.classList.add('open', isOpen)
    button.setAttribute('aria-expanded', 'true')
    document.body.style.overflow = 'hidden'
    setFocusableElements()
    firstFocusableElement.focus()
  } else {
    button.classList.remove('open', isOpen)
    drawer.classList.remove('open', isOpen)
    button.setAttribute('aria-expanded', 'false')
    document.body.style.overflow = 'auto'
  }
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && isOpen) {
    drawerHandler()
  } else if (isOpen) {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          e.preventDefault()
          lastFocusableElement.focus()
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          e.preventDefault()
          firstFocusableElement.focus()
        }
      }
    }
  }
})

button.addEventListener('click', drawerHandler)

document.addEventListener('astro:after-swap', drawerHandler)