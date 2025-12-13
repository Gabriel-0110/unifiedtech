'use client'
import React from 'react'

const benefits = [
  { title: 'Quick Response', description: 'We respond to all inquiries within 2 business hours' },
  { title: 'Expert Team', description: 'Work directly with senior developers and consultants' },
  { title: 'Confidentiality', description: 'Your project details are protected by strict NDAs' },
  { title: 'Proven Results', description: '500+ successful projects delivered on time' },
] as const

const processSteps = [
  { number: '01', title: 'Initial Consultation', description: 'Free 30-minute discovery call to understand your needs' },
  { number: '02', title: 'Proposal & Planning', description: 'Detailed project proposal with timeline and pricing' },
  { number: '03', title: 'Development', description: 'Agile development with regular updates and demos' },
  { number: '04', title: 'Launch & Support', description: 'Seamless launch with ongoing maintenance and support' },
] as const

export function ContactInfo() {
  return (
    <div className='bg-gray-50 p-8 dark:bg-gray-950 lg:p-12'>
      <div className='space-y-12'>
        <div>
          <h2 className='mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100'>Why Choose UnifiedTech?</h2>
          <div className='mb-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20'>
            <p className='text-sm font-medium text-blue-700 dark:text-blue-300'>Legal Business Entity:</p>
            <p className='text-sm text-blue-600 dark:text-blue-400 font-mono'>ALVES & ARAUJO TOURISM SERVICES, LLC</p>
            <p className='text-xs text-blue-500 dark:text-blue-500 mt-1'>DBA: UnifiedTech Solutions by G&G</p>
          </div>
          <div className='space-y-6'>
            {benefits.map(b => (
              <div key={b.title} className='flex items-start space-x-4'>
                <div className='flex-shrink-0 rounded-lg bg-blue-100 p-2 dark:bg-blue-900/40'>
                  <span className='text-blue-600 dark:text-blue-300'>✓</span>
                </div>
                <div>
                  <h4 className='mb-1 font-semibold text-gray-900 dark:text-gray-100'>{b.title}</h4>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>{b.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className='mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100'>Our Process</h2>
          <div className='space-y-6'>
            {processSteps.map(step => (
              <div key={step.number} className='flex items-start space-x-4'>
                <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white'>{step.number}</div>
                <div>
                  <h4 className='mb-1 font-semibold text-gray-900 dark:text-gray-100'>{step.title}</h4>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className='rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900'>
            <h3 className='mb-4 text-center text-xl font-bold text-gray-900 dark:text-gray-100'>Trusted by Industry Leaders</h3>
            <div className='grid grid-cols-2 gap-4 text-center'>
              {[
                { label: 'Happy Clients', value: '100+' },
                { label: 'Client Rating', value: '4.9/5' },
                { label: 'Projects', value: '500+' },
                { label: 'Support', value: '24/7' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>{stat.value}</div>
                  <div className='text-sm text-gray-500 dark:text-gray-400'>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <h3 className='mb-4 text-xl font-bold text-gray-900 dark:text-gray-100'>Certifications & Partnerships</h3>
          <div className='grid grid-cols-2 gap-4'>
            {['AWS Certified','Google Cloud Partner','ISO 27001 Compliant','GDPR Compliant'].map(cert => (
              <div key={cert} className='flex items-center space-x-2 rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900'>
                <span className='text-green-600 dark:text-green-400'>✓</span>
                <span className='text-sm font-medium text-gray-900 dark:text-gray-100'>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default ContactInfo
