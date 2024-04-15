const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      timeout = null
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

const initializeViewport = () => {
  const handleResize = () => {
    const minWidth = 375
    const value =
      window.outerWidth > minWidth
        ? 'width=device-width,initial-scale=1'
        : `width=${minWidth}`
    const viewport = document.querySelector('meta[name="viewport"]')
    if (viewport && viewport.getAttribute('content') !== value) {
      viewport.setAttribute('content', value)
    }
  }

  const debouncedResize = debounce(handleResize, 250)

  window.addEventListener('resize', debouncedResize, false)
  handleResize()
}

export default initializeViewport
