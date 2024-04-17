function createTableOfContents() {
  // 全てのhタグを取得
  const headings = document.querySelectorAll('h2, h3, h4, h5, h6')

  // 目次を格納する要素
  const tableOfContents = document.createElement('div')
  tableOfContents.id = 'table-of-contents'

  // 各hタグについて処理
  let currentLevel = 0
  let currentList = null
  headings.forEach((heading, index) => {
    // hタグのidがない場合は自動生成
    if (!heading.id) {
      heading.id = `heading-${index}`
    }

    // リンクを作成
    const link = document.createElement('a')
    link.href = `#${heading.id}`
    link.textContent = heading.textContent

    // リストアイテムを作成
    const listItem = document.createElement('li')
    listItem.appendChild(link)

    // h2、h3のクラスを付与
    if (heading.tagName === 'H2') {
      listItem.classList.add('h2')
    } else if (heading.tagName === 'H3') {
      listItem.classList.add('h3')
    }

    // 階層に応じてネストさせる
    const headingLevel = parseInt(heading.tagName.charAt(1), 10)
    if (headingLevel > currentLevel) {
      // 新しいリストを作成
      const newList = document.createElement('ul')
      if (currentList) {
        currentList.lastElementChild.appendChild(newList)
      } else {
        tableOfContents.appendChild(newList)
      }
      currentList = newList
      currentLevel = headingLevel
    } else if (headingLevel < currentLevel) {
      // 親リストに戻る
      while (currentLevel > headingLevel) {
        currentList = currentList.parentElement.parentElement
        currentLevel--
      }
    }
    currentList.appendChild(listItem)
  })

  // 目次を挿入する場所
  const insertionPoint = document.querySelector('.table')

  // 目次を挿入
  insertionPoint.appendChild(tableOfContents)

  // Intersection Observerを初期化
  initializeIntersectionObserver()
}

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    const heading = entry.target
    const link = document.querySelector(`a[href="#${heading.id}"]`)

    if (entry.isIntersecting) {
      // 交差したhタグのリンクにactiveクラスを付与
      link.classList.add('active')

      // 直前のactiveクラスを持つリンクからactiveクラスを削除
      const activeLink = document.querySelector(
        'a.active:not([href="#${heading.id}"])',
      )
      if (activeLink) {
        activeLink.classList.remove('active')
      }
    } else {
      // 交差していないhタグのリンクからactiveクラスを削除
      link.classList.remove('active')
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

createTableOfContents()
document.addEventListener('astro:after-swap', createTableOfContents)
