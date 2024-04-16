function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    const heading = entry.target
    const activeHeading = document.querySelector('.active')

    if (entry.isIntersecting) {
      // 交差したhタグにactiveクラスを付与
      heading.classList.add('active')

      // 直前のactiveクラスを持つhタグからactiveクラスを削除
      if (activeHeading && activeHeading !== heading) {
        activeHeading.classList.remove('active')
      }
    } else {
      // 交差していないhタグからactiveクラスを削除
      heading.classList.remove('active')
    }
  })
}

function initializeIntersectionObserver() {
  const options = {
    rootMargin: '0px',
    threshold: 0.5, // 50%以上交差した場合にコールバックが呼び出される
  }

  const headings = document.querySelectorAll('h2, h3, h4, h5, h6')
  const observer = new IntersectionObserver(handleIntersection, options)

  headings.forEach((heading) => {
    observer.observe(heading)
  })
}

// 目次の生成後にIntersection Observerを初期化
createTableOfContents()
initializeIntersectionObserver()
document.addEventListener('astro:after-swap', () => {
  createTableOfContents()
  initializeIntersectionObserver()
})
