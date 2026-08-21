import { siteCopy } from '../i18n/content'
import { useLocale } from '../i18n/LocaleContext'
import { ArrowRight } from './ui/Icons'
import { DualImageReveal } from './DualImageReveal'
import { SiteHeader } from './SiteHeader'

export function HeroSection() {
  const { locale } = useLocale()
  const copy = siteCopy[locale].hero
  return (
    <section className="hero" aria-labelledby="hero-title">
      <SiteHeader />
      <div className="hero__inner shell">
        <div className="hero__copy">
          <p className="eyebrow"><span />{copy.eyebrow}</p>
          <h1 id="hero-title">{copy.title}</h1>
          <p className="lede">{copy.body}</p>
          <div className="hero__actions">
            <a className="button button--ink" href="https://g-chat.growthlabs.pt/register">{copy.primary}<ArrowRight /></a>
            <a className="button button--ghost" href="#product">{copy.secondary}</a>
          </div>
        </div>
        <div className="hero__visual"><DualImageReveal alt={copy.imageAlt} /></div>
      </div>
      <div className="hero__meta shell"><span>G-Brain memory</span><span>G-Cortex visualisation</span><span>Controlled connections</span></div>
    </section>
  )
}
