import { Metadata } from 'next'
import { Header } from '../../src/components/layout/Header'
import { Footer } from '../../src/components/layout/Footer'
import { HeroCaseStudies } from '../../src/components/pages/case-studies/HeroCaseStudies'
import { FilterSection } from '../../src/components/pages/case-studies/FilterSection'
import { CaseStudiesGrid } from '../../src/components/pages/case-studies/CaseStudiesGrid'
import { ResultsSection } from '../../src/components/pages/case-studies/ResultsSection'
import { CTASection } from '../../src/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'Case Studies - Real Success Stories',
  description:
    'Explore real-world examples of how UnifiedTech Solutions has helped businesses transform through technology. See detailed case studies with measurable results.',
  openGraph: {
    title: 'UnifiedTech Solutions Case Studies - Real Success Stories',
    description:
      'Explore real-world examples of how UnifiedTech Solutions has helped businesses transform through technology. See detailed case studies with measurable results.',
  },
}

export default function CaseStudiesPage() {
  return (
    <>
      <Header />
      <main className="pt-20 lg:pt-24">
        <HeroCaseStudies />
        <FilterSection />
        <CaseStudiesGrid />
        <ResultsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
