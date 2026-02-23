import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext(null)
const STORAGE_KEY = 'portfolio-theme'

function getSystemTheme() {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('system')
  const [resolvedTheme, setResolvedTheme] = useState('light')

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    const initialTheme = stored || 'system'
    setTheme(initialTheme)
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const updateTheme = () => {
      const nextResolved = theme === 'system' ? getSystemTheme() : theme
      setResolvedTheme(nextResolved)

      const root = document.documentElement
      root.classList.toggle('dark', nextResolved === 'dark')
      root.style.colorScheme = nextResolved
    }

    updateTheme()
    media.addEventListener('change', updateTheme)

    return () => {
      media.removeEventListener('change', updateTheme)
    }
  }, [theme])

  const setUserTheme = useCallback((nextTheme) => {
    setTheme(nextTheme)
    window.localStorage.setItem(STORAGE_KEY, nextTheme)
  }, [])

  const toggleTheme = useCallback(() => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark'
    setUserTheme(next)
  }, [resolvedTheme, setUserTheme])

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme: setUserTheme, toggleTheme }),
    [theme, resolvedTheme, setUserTheme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
