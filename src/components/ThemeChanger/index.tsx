import { useEffect, useState } from 'react'
import styles from './index.module.scss'

type Theme = 'light' | 'dark'

export default function ThemeChanger() {
  const [theme, setTheme] = useState<Theme | undefined>(undefined)

  // localStorageにデータがあるときはそちらを適用
  const getCurrentTheme = (): Theme => {
    if (
      (typeof localStorage.getItem('theme') === 'string' &&
        localStorage.getItem('theme') === 'dark') ||
      (typeof window.localStorage.getItem('theme') !== 'string' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      return 'dark'
    } else {
      return 'light'
    }
  }

  // localStorageにデータがない時はmatchMediaで判定
  useEffect(() => {
    const currentTheme = getCurrentTheme()
    setTheme(currentTheme)
  }, [])

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
    if (theme === 'light') {
      setTheme('dark')
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
  }

  return (
    <button type="button" onClick={toggleTheme} className={`${styles.button}`}>
      <span className={styles.toggleSwichTrack}></span>
      <span className={styles.toggleSwichThumb}></span>
    </button>
  )
}
