import { siteCopy } from '../i18n/content'
import { useLocale } from '../i18n/LocaleContext'
import { Check } from './ui/Icons'
import { FadeUp } from './FadeUp'
import { SpotlightBorder } from './SpotlightBorder'

export function PricingSection() {
  const { locale } = useLocale()
  const copy = siteCopy[locale].pricing
  return (
    <section className="pricing-section" id="pricing" aria-labelledby="pricing-title">
      <div className="shell">
        <FadeUp className="pricing-section__intro"><p className="eyebrow eyebrow--light"><span />{copy.eyebrow}</p><h2 id="pricing-title">{copy.title}</h2><p>{copy.body}</p></FadeUp>
        <div className="pricing-grid">
          {copy.plans.map((plan, index) => (
            <FadeUp key={plan.name} delay={index * 120}>
              <SpotlightBorder featured={index === 1}>
                <article className="price-card">
                  {index === 1 && <span className="price-card__tag">{copy.popular}</span>}
                  <h3>{plan.name}</h3><p className="price-card__desc">{plan.description}</p>
                  <div className="price-card__price"><del>{plan.old}</del><strong>{plan.price}</strong><span>{copy.monthly}</span></div>
                  <a className={`button ${index === 1 ? 'button--solid-light' : 'button--outline-light'}`} href="https://g-chat.growthlabs.pt/register">{copy.cta}</a>
                  <ul>{plan.features.map((feature) => <li key={feature}><Check />{feature}</li>)}</ul>
                </article>
              </SpotlightBorder>
            </FadeUp>
          ))}
        </div>
        <p className="pricing-section__note">{copy.note}</p>
      </div>
    </section>
  )
}
