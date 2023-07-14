import React, { createContext, useState, useContext } from 'react'
import { setThemeOnScroll } from '../utils'

interface ThemeContextType {
  theme: string
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const themeDefaultValue = localStorage.getItem('theme') || 'dark'

setThemeOnScroll(themeDefaultValue)

export const ThemeProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [theme, setTheme] = useState<string>(themeDefaultValue)

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)

    setThemeOnScroll(newTheme)
  }

  const themeContextValue: ThemeContextType = {
    theme,
    toggleTheme,
  }

  return <ThemeContext.Provider value={themeContextValue}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
