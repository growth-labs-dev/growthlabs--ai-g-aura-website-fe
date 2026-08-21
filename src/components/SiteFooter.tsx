import { Link } from 'react-router-dom'
import { siteCopy } from '../i18n/content'
import { useLocale } from '../i18n/LocaleContext'
import { localisedPath } from '../i18n/links'
import { LocaleSwitch } from './LocaleSwitch'
import { Logo } from './Logo'

export function SiteFooter() {
  const { locale } = useLocale()
  const copy = siteCopy[locale]
  return (
    <footer className="site-footer">
      <div className="site-footer__top shell"><div><Logo dark /><p>{copy.footer.strap}</p></div><div className="site-footer__links"><a href={localisedPath('/#product', locale)}>{copy.nav.product}</a><a href={localisedPath('/#pricing', locale)}>{copy.nav.pricing}</a><Link to={localisedPath('/docs', locale)}>{copy.nav.docs}</Link><Link to={localisedPath('/status', locale)}>Status</Link><Link to={localisedPath('/docs/security', locale)}>{copy.footer.security}</Link><Link to={localisedPath('/legal/terms', locale)}>{copy.footer.terms}</Link><Link to={localisedPath('/legal/privacy', locale)}>{copy.footer.privacy}</Link><Link to={localisedPath('/legal/cookies', locale)}>{copy.footer.cookies}</Link></div></div>
      <div className="site-footer__bottom shell"><span>{copy.footer.rights}</span><LocaleSwitch dark /></div>
    </footer>
  )
}
