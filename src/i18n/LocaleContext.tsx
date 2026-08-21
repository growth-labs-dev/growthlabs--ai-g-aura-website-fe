import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Locale = 'en' | 'pt'

type LocaleState = {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleState | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const readLocale = (): Locale => new URLSearchParams(window.location.search).get('lang') === 'pt' ? 'pt' : 'en'
  const [locale, setLocaleState] = useState<Locale>(readLocale)

  const setLocale = (next: Locale) => {
    setLocaleState(next)
    const url = new URL(window.location.href)
    if (next === 'pt') url.searchParams.set('lang', 'pt')
    else url.searchParams.delete('lang')
    window.history.replaceState(window.history.state, '', url)
  }

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  useEffect(() => {
    const onHistory = () => setLocaleState(readLocale())
    window.addEventListener('popstate', onHistory)
    return () => window.removeEventListener('popstate', onHistory)
  }, [])

  const value = useMemo(() => ({ locale, setLocale }), [locale])
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

// Locale state and hook intentionally share a small module.
// eslint-disable-next-line react-refresh/only-export-components
export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) throw new Error('useLocale must be used inside LocaleProvider')
  return context
}
