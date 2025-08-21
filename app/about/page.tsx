import React from 'react'
import type { Metadata } from 'next'
import HeroAbout from '@/components/pages/about/HeroAbout'
import CompanyStory from '@/components/pages/about/CompanyStory'
import ValuesSection from '@/components/pages/about/ValuesSection'
import TeamSection from '@/components/pages/about/TeamSection'
import CultureSection from '@/components/pages/about/CultureSection'
import JoinTeamSection from '@/components/pages/about/JoinTeamSection'

export const metadata: Metadata = {
  title: 'About Us | UnifiedTech Solutions by G&G',
  description: 'Learn about UnifiedTech Solutions — our mission, vision, team, and the values that drive our work building modern digital solutions.',
}

export default function AboutPage() {
  return (
    <main className='flex flex-col'>
      <HeroAbout />
      <CompanyStory />
      <ValuesSection />
      <TeamSection />
      <CultureSection />
      <JoinTeamSection />
    </main>
  )
}
