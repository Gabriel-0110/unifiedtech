import type { Metadata } from 'next'
import React from 'react'
import HeroContact from '@/components/pages/contact/HeroContact'
import ContactForm from '@/components/pages/contact/ContactForm'
import ContactInfo from '@/components/pages/contact/ContactInfo'
import LocationMap from '@/components/pages/contact/LocationMap'
import FAQSection from '@/components/pages/contact/FAQSection'

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch Today',
  description: 'Ready to start your project? Contact UnifiedTech Solutions for a free consultation. Multiple ways to reach us including phone, email, and live chat support.',
  openGraph: {
    title: 'Contact UnifiedTech Solutions - Get in Touch Today',
    description: 'Ready to start your project? Contact UnifiedTech Solutions for a free consultation. Multiple ways to reach us including phone, email, and live chat support.',
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
