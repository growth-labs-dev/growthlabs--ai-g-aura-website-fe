import type { Locale } from './LocaleContext'

export function localisedPath(path: string, locale: Locale) {
  if (locale === 'en') return path
  const [base, hash] = path.split('#')
  return `${base}${base.includes('?') ? '&' : '?'}lang=pt${hash ? `#${hash}` : ''}`
}
