import { siteCopy } from '../i18n/content'
import { useLocale } from '../i18n/LocaleContext'
import { FadeUp } from './FadeUp'

export function ModelsSection() {
  const { locale } = useLocale()
  const copy = siteCopy[locale].models
  return (
    <section className="models-section" id="models" aria-labelledby="models-title">
      <div className="shell">
        <FadeUp className="models-section__intro"><p className="eyebrow eyebrow--light"><span />{copy.eyebrow}</p><h2 id="models-title">{copy.title}</h2><p>{copy.body}</p></FadeUp>
        <div className="models-list">
          {copy.cards.map(([title, text], index) => <FadeUp key={title} delay={index * 80}><article><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div><i aria-hidden="true" /></article></FadeUp>)}
        </div>
      </div>
    </section>
  )
}
