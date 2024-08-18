const drawerHandler = () => {
  let isOpen = false
  const button = document.querySelector('[data-js="drawerToggle"]')
  const drawer = document.querySelector('[data-js="drawer"]')
  let focusableElements = [],
    firstFocusableElement,
    lastFocusableElement

  if (drawer) {
    focusableElements = Array.from(
      drawer.querySelectorAll(
        'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
      ),
    )
    firstFocusableElement = focusableElements[0]
    lastFocusableElement = focusableElements[focusableElements.length - 1]
  }

  function toggleOverflow(shouldHide) {
    document.body.style.overflow = shouldHide ? 'hidden' : 'auto'
  }

  function toggleDrawer() {
    isOpen = !isOpen

    if (isOpen) {
      // button.classList.add('open')
      button.setAttribute('data-state', 'open')
      button.setAttribute('aria-label', 'メニューを閉じる')
      // drawer.classList.add('open')
      drawer.setAttribute('data-state', 'open')
      button.setAttribute('aria-expanded', 'true')
      toggleOverflow(true)
      firstFocusableElement?.focus()
    } else {
      // button.classList.remove('open')
      button.removeAttribute('data-state')
      // drawer.classList.remove('open')
      drawer.removeAttribute('data-state')
      button.setAttribute('aria-label', 'メニューを開く')
      button.setAttribute('aria-expanded', 'false')
      toggleOverflow(false)
    }
  }

  button?.addEventListener('click', toggleDrawer)

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) {
      toggleDrawer()
    } else if (isOpen) {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            e.preventDefault()
            lastFocusableElement?.focus()
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            e.preventDefault()
            firstFocusableElement?.focus()
          }
        }
      }
    }
  })
}

drawerHandler()
document.addEventListener('astro:after-swap', drawerHandler)
