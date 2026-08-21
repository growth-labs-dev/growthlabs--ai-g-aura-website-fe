import { useState, type ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { docsByLocale } from '../content/docs'
import { useLocale } from '../i18n/LocaleContext'
import { localisedPath } from '../i18n/links'
import { LocaleSwitch } from './LocaleSwitch'
import { Logo } from './Logo'
import { MenuIcon, SearchIcon } from './ui/Icons'

export function DocsLayout({ children }: { children: ReactNode }) {
  const { locale } = useLocale()
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const docs = docsByLocale[locale]
  const filtered = docs.filter((doc) => `${doc.title} ${doc.description}`.toLowerCase().includes(search.toLowerCase()))
  const groups = Array.from(new Set(filtered.map((doc) => doc.group)))
  return (
    <div className="docs-shell">
      <header className="docs-header"><Link to={localisedPath('/', locale)} className="docs-brand"><Logo /><span>Growth AI</span><i>Docs</i></Link><div className="docs-header__actions"><Link to={localisedPath('/status', locale)}>Status</Link><LocaleSwitch /><a className="button button--small button--ink" href="https://g-chat.growthlabs.pt/register">{locale === 'en' ? 'Start building' : 'Começar'}</a><button type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle docs navigation"><MenuIcon /></button></div></header>
      <aside className={`docs-sidebar ${open ? 'is-open' : ''}`}>
        <label className="docs-search"><SearchIcon /><span className="sr-only">{locale === 'en' ? 'Search docs' : 'Pesquisar documentação'}</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={locale === 'en' ? 'Search documentation' : 'Pesquisar documentação'} /></label>
        <nav aria-label="Documentation">
          {groups.map((group) => <div key={group} className="docs-nav-group"><h2>{group}</h2>{filtered.filter((doc) => doc.group === group).map((doc) => <NavLink key={doc.slug} to={localisedPath(`/docs/${doc.slug}`, locale)} onClick={() => setOpen(false)}>{doc.title}</NavLink>)}</div>)}
          <div className="docs-nav-group"><h2>{locale === 'en' ? 'Service' : 'Serviço'}</h2><NavLink to={localisedPath('/status', locale)} onClick={() => setOpen(false)}>{locale === 'en' ? 'System status' : 'Estado do sistema'}</NavLink></div>
        </nav>
      </aside>
      {children}
    </div>
  )
}
