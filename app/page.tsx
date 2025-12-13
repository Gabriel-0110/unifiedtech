import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesOverview } from '@/components/sections/ServicesOverview'
import { AboutPreview } from '@/components/sections/AboutPreview'
import { StatsSection } from '@/components/sections/StatsSection'
import { TechStackSection } from '@/components/sections/TechStackSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CTASection } from '@/components/sections/CTASection'

export default function Home() {
  return (
    <main>
  <HeroSection />
  <ServicesOverview />
  <AboutPreview />
  <StatsSection />
  <TechStackSection />
  <TestimonialsSection />
  <CTASection />
    </main>
  )
}
