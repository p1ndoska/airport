import { useEffect, useState } from 'react'
import { AccessibilityContext } from './useAccessibility.js'

const SETTINGS_KEY = 'accessibility-settings'
const MODE_KEY = 'accessibility-mode'

const defaultSettings = {
  fontSize: 1.0,
  lineHeight: 1.5,
  letterSpacing: 0,
  fontFamily: 'default', // 'default' | 'arial'
  contrast: 'normal', // 'normal' | 'high'
  colorScheme: 'normal', // 'normal' | 'dark' | 'inverted'
  grayscale: false,
  hideImages: false,
  reduceMotion: false,
  showFocus: true,
}

function saveSettings(settings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
  } catch {
    /* ignore */
  }
}

export function AccessibilityProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY)
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings
    } catch {
      return defaultSettings
    }
  })

  const [isAccessibilityMode, setIsAccessibilityMode] = useState(
    () => localStorage.getItem(MODE_KEY) === 'true',
  )

  const updateSettings = (newSettings) => {
    const updated = { ...settings, ...newSettings }
    setSettings(updated)
    saveSettings(updated)
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
    saveSettings(defaultSettings)
  }

  const toggleAccessibilityMode = () => {
    const newMode = !isAccessibilityMode
    setIsAccessibilityMode(newMode)
    if (newMode && settings.fontSize === 1) {
      const preset = { ...settings, fontSize: 1.25 }
      setSettings(preset)
      saveSettings(preset)
    }
    try {
      localStorage.setItem(MODE_KEY, newMode.toString())
    } catch {
      /* ignore */
    }
  }

  useEffect(() => {
    const root = document.documentElement
    const body = document.body

    body.classList.remove(
      'accessibility-mode',
      'high-contrast',
      'reduce-motion',
      'show-focus',
      'a11y-grayscale',
      'a11y-hide-images',
      'color-scheme-normal',
      'color-scheme-dark',
      'color-scheme-inverted',
    )

    if (isAccessibilityMode) {
      root.classList.add('accessibility-mode')
      root.style.setProperty('--accessibility-font-size', settings.fontSize.toString())
      root.style.setProperty('--accessibility-line-height', settings.lineHeight.toString())
      root.style.setProperty('--accessibility-letter-spacing', `${settings.letterSpacing}px`)
      root.style.setProperty(
        '--accessibility-font-family',
        settings.fontFamily === 'arial' ? 'Arial, sans-serif' : 'inherit',
      )

      body.classList.add('accessibility-mode', `color-scheme-${settings.colorScheme}`)
      body.classList.toggle('high-contrast', settings.contrast === 'high')
      body.classList.toggle('reduce-motion', settings.reduceMotion)
      body.classList.toggle('show-focus', settings.showFocus)
      body.classList.toggle('a11y-grayscale', settings.grayscale)
      body.classList.toggle('a11y-hide-images', settings.hideImages)
    } else {
      root.classList.remove('accessibility-mode')
      root.style.removeProperty('--accessibility-font-size')
      root.style.removeProperty('--accessibility-line-height')
      root.style.removeProperty('--accessibility-letter-spacing')
      root.style.removeProperty('--accessibility-font-family')
    }
  }, [isAccessibilityMode, settings])

  const value = {
    settings,
    updateSettings,
    resetSettings,
    isAccessibilityMode,
    toggleAccessibilityMode,
  }

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>
}
