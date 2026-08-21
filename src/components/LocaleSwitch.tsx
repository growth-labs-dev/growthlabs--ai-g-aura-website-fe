import { useLocale, type Locale } from '../i18n/LocaleContext'

export function LocaleSwitch({ dark = false }: { dark?: boolean }) {
  const { locale, setLocale } = useLocale()
  return (
    <div className={`locale-switch ${dark ? 'locale-switch--dark' : ''}`} aria-label="Language">
      {(['en', 'pt'] as Locale[]).map((item) => (
        <button key={item} type="button" className={locale === item ? 'is-active' : ''} onClick={() => setLocale(item)} aria-pressed={locale === item}>
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
