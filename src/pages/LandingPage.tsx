import { useEffect } from 'react'
import { HeroSection } from '../components/HeroSection'
import { ModelsSection } from '../components/ModelsSection'
import { PlatformSection } from '../components/PlatformSection'
import { PricingSection } from '../components/PricingSection'
import { SiteFooter } from '../components/SiteFooter'
import { VideoStory } from '../components/VideoStory'

export default function LandingPage() {
  useEffect(() => { document.title = 'Growth AI — Intelligence that works with you' }, [])
  return <main><HeroSection /><VideoStory /><PlatformSection /><ModelsSection /><PricingSection /><SiteFooter /></main>
}
