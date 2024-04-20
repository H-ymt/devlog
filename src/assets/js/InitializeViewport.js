const debounce = (func, wait, immediate = false) => {
  let timeout
  return (...args) => {
    const context = this
    const later = () => {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

const initializeViewport = () => {
  const minWidth = 375
  const handleResize = function () {
    const value =
      window.outerWidth > minWidth
        ? 'width=device-width,initial-scale=1'
        : `width=${minWidth}`
    const viewport = document.querySelector('meta[name="viewport"]')
    if (viewport && viewport.getAttribute('content') !== value) {
      viewport.setAttribute('content', value)
    }
  }

  const debouncedResize = debounce(handleResize, 250, true)

  window.addEventListener('resize', debouncedResize)
  debouncedResize() // ページ読み込み時にも実行
}

export default initializeViewport
