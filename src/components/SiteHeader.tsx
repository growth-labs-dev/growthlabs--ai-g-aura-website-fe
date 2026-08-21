import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { siteCopy } from '../i18n/content'
import { useLocale } from '../i18n/LocaleContext'
import { localisedPath } from '../i18n/links'
import { CloseIcon, MenuIcon } from './ui/Icons'
import { LocaleSwitch } from './LocaleSwitch'
import { Logo } from './Logo'

export function SiteHeader({ dark = false }: { dark?: boolean }) {
  const { locale } = useLocale()
  const copy = siteCopy[locale].nav
  const [open, setOpen] = useState(false)
  useEffect(() => setOpen(false), [locale])

  return (
    <header className={`site-header ${dark ? 'site-header--dark' : ''}`}>
      <div className="site-header__inner">
        <Link className="site-header__brand" to="/" aria-label="Growth AI home"><Logo dark={dark} /><span>Growth AI</span></Link>
        <nav className={`site-nav ${open ? 'is-open' : ''}`} aria-label="Primary navigation">
          <a href={localisedPath('/#product', locale)}>{copy.product}</a><a href={localisedPath('/#models', locale)}>{copy.models}</a><a href={localisedPath('/#pricing', locale)}>{copy.pricing}</a><Link to={localisedPath('/docs', locale)}>{copy.docs}</Link><Link to={localisedPath('/status', locale)}>Status</Link>
          <div className="site-nav__mobile-actions"><LocaleSwitch dark={dark} /><a href="https://g-chat.growthlabs.pt/">{copy.signin}</a><a className="button button--small button--ink" href="https://g-chat.growthlabs.pt/register">{copy.start}</a></div>
        </nav>
        <div className="site-header__actions"><LocaleSwitch dark={dark} /><a className="text-link" href="https://g-chat.growthlabs.pt/">{copy.signin}</a><a className={`button button--small ${dark ? 'button--light' : 'button--ink'}`} href="https://g-chat.growthlabs.pt/register">{copy.start}</a></div>
        <button className="menu-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={copy.menu}>{open ? <CloseIcon /> : <MenuIcon />}</button>
      </div>
    </header>
  )
}
