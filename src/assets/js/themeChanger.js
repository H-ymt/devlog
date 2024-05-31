function themeToggle() {
  const themeToggleButton = document.querySelector('.js-themeToggle')
  const htmlElement = document.documentElement

  // ローカルストレージからテーマを取得する
  const savedTheme = localStorage.getItem('theme') || 'light'

  // テーマを適用する
  if (savedTheme === 'dark') {
    htmlElement.classList.add('dark')
    themeToggleButton.classList.add('is-dark')
  } else {
    htmlElement.classList.remove('dark')
    themeToggleButton.classList.remove('is-dark')
  }

  // テーマトグルボタンのクリックイベントを処理する
  themeToggleButton.addEventListener('click', () => {
    const currentTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light'
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    const ariaChecked = newTheme === 'light' ? 'false' : 'true'

    // テーマを切り替える
    htmlElement.classList.toggle('dark')
    themeToggleButton.classList.toggle('is-dark')
    themeToggleButton.setAttribute('aria-checked', ariaChecked)

    // ローカルストレージにテーマを保存する
    localStorage.setItem('theme', newTheme)
  })
}

themeToggle()
document.addEventListener('astro:after-swap', themeToggle)
