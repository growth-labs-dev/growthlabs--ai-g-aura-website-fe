import { siteCopy } from '../i18n/content'
import { useLocale } from '../i18n/LocaleContext'
import { FadeUp } from './FadeUp'

const VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4'

export function VideoStory() {
  const { locale } = useLocale()
  const copy = siteCopy[locale].videoOne
  return (
    <section className="video-story" id="product" aria-labelledby="video-story-title">
      <video className="video-story__media" autoPlay muted loop playsInline preload="metadata" aria-hidden="true"><source src={VIDEO} type="video/mp4" /></video>
      <div className="video-story__veil" />
      <div className="video-story__content shell">
        <FadeUp><p className="eyebrow eyebrow--light"><span />{copy.eyebrow}</p><h2 id="video-story-title">{copy.title}</h2><p>{copy.body}</p></FadeUp>
        <div className="video-story__rail">
          {copy.items.map(([title, text], index) => <FadeUp key={title} delay={index * 90}><article><b>0{index + 1}</b><h3>{title}</h3><p>{text}</p></article></FadeUp>)}
        </div>
      </div>
    </section>
  )
}
