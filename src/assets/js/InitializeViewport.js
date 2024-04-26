// ビューポートのサイズを取得する
const viewportSize = () => {
  const vw = window.innerWidth * 0.01
  const vh = window.innerHeight * 0.01

  document.documentElement.style.setProperty('--vw', `${vw}px`)
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

// 375px以下のビューポートを固定
const viewportFix = () => {
  const viewport = document.querySelector('meta[name="viewport"]')
  if (!viewport) return

  const value =
    window.outerWidth > 375 ? 'width=device-width,initial-scale=1' : 'width=375'
  if (viewport.getAttribute('content') !== value)
    viewport.setAttribute('content', value)
}

// debounce関数
const debounce = (func, delay) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func.apply(null, args)
    }, delay)
  }
}

const handleResize = debounce(() => {
  viewportSize()
  viewportFix()
}, 250)

export default function initializeViewport() {
  window.addEventListener('resize', handleResize)
  handleResize() // 初期化時に実行
}
