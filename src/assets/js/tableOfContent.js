function createTableOfContents() {
  // 全てのhタグを取得
  const headings = document.querySelectorAll('h2, h3, h4, h5, h6')

  // 目次を格納する要素
  const tableOfContents = document.createElement('div')
  tableOfContents.id = 'table-of-contents'

  // 各hタグについて処理
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

    // 階層に応じてネストさせる
    const headingLevel = parseInt(heading.tagName.charAt(1), 10)
    let parent = tableOfContents
    for (let i = 1; i < headingLevel; i++) {
      const parentList = parent.lastElementChild
      if (parentList && parentList.tagName === 'UL') {
        parent = parentList
      } else {
        const newList = document.createElement('ul')
        parent.appendChild(newList)
        parent = newList
      }
    }

    // 新しいulを作成し、クラスを付与
    const newList = document.createElement('ul')
    if (heading.tagName === 'H2') {
      newList.classList.add('h2')
    } else if (heading.tagName === 'H3') {
      newList.classList.add('h3')
    }
    newList.appendChild(listItem)
    parent.appendChild(newList)
  })

  // 目次を挿入する場所
  const insertionPoint = document.querySelector('.table')

  // 目次を挿入
  insertionPoint.appendChild(tableOfContents)
}

createTableOfContents()
document.addEventListener('astro:after-swap', createTableOfContents)
