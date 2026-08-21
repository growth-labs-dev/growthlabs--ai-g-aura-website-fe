import { Link } from 'react-router-dom'
import { siteCopy } from '../i18n/content'
import { useLocale } from '../i18n/LocaleContext'
import { localisedPath } from '../i18n/links'
import { ArrowUpRight } from './ui/Icons'
import { FadeUp } from './FadeUp'

const VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4'

export function PlatformSection() {
  const { locale } = useLocale()
  const copy = siteCopy[locale].platform
  return (
    <section className="platform-section" aria-labelledby="platform-title">
      <div className="platform-section__grid shell">
        <FadeUp className="platform-section__copy"><p className="eyebrow"><span />{copy.eyebrow}</p><h2 id="platform-title">{copy.title}</h2><p>{copy.body}</p><Link className="inline-link" to={localisedPath('/docs/memory', locale)}>{copy.link}<ArrowUpRight /></Link></FadeUp>
        <FadeUp delay={100} className="platform-section__media"><video autoPlay muted loop playsInline preload="metadata" aria-label="Growth AI system in motion"><source src={VIDEO} type="video/mp4" /></video></FadeUp>
      </div>
      <div className="capability-rail shell">
        {copy.items.map(([title, text], index) => <FadeUp key={title} delay={index * 80}><article><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article></FadeUp>)}
      </div>
    </section>
  )
}
