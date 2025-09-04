import type { Metadata } from 'next'
import React from 'react'
import HeroContact from '@/components/pages/contact/HeroContact'
import ContactForm from '@/components/pages/contact/ContactForm'
import ContactInfo from '@/components/pages/contact/ContactInfo'
import LocationMap from '@/components/pages/contact/LocationMap'
import FAQSection from '@/components/pages/contact/FAQSection'

export const metadata: Metadata = {
  title: 'Contact Us - UnifiedTech Solutions by G&G',
  description: 'Ready to start your project? Contact UnifiedTech Solutions by G&G for a free consultation. A division of ALVES & ARAUJO TOURISM SERVICES, LLC.',
  openGraph: {
    title: 'Contact UnifiedTech Solutions - Get in Touch Today',
    description: 'Ready to start your project? Contact UnifiedTech Solutions by G&G for a free consultation. A division of ALVES & ARAUJO TOURISM SERVICES, LLC.',
  },
}

export default function ContactPage() {
  return (
    <main className='flex flex-col'>
      <HeroContact />
      <div className='grid gap-0 lg:grid-cols-2'>
        <ContactForm />
        <ContactInfo />
      </div>
      <LocationMap />
      <FAQSection />
    </main>
  )
}
