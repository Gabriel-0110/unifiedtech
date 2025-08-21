'use client'
import React from 'react'

const contactMethods = [
  { title: 'Call Us', value: '+1 (929) 715-3656', description: 'Mon-Fri 9AM-6PM EST', href: 'tel:+19297153656', icon: '📞' },
  { title: 'Email Us', value: 'info@ggunifiedtech.com', description: 'We respond within 24 hours', href: 'mailto:info@ggunifiedtech.com', icon: '✉️' },
  { title: 'Visit Us', value: 'Albany, NY', description: 'By appointment only', href: null, icon: '📍' },
  { title: 'Business Hours', value: 'Mon-Fri 9AM-6PM', description: 'Eastern Standard Time', href: null, icon: '⏰' },
] as const

export function HeroContact() {
  return (
    <section className='bg-gradient-to-br from-blue-50 to-purple-50 pb-16 pt-24 dark:from-gray-900 dark:to-gray-800 lg:pt-32'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-16 text-center'>
          <div className='mb-6 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 dark:bg-blue-900/40'>
            <span className='mr-2 h-2 w-2 rounded-full bg-blue-500' />
            <span className='text-sm font-medium text-blue-700 dark:text-blue-300'>Get in Touch</span>
          </div>
          <h1 className='mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent lg:text-5xl'>Let's Start Your Project Today</h1>
          <p className='mx-auto mb-8 max-w-3xl text-xl text-gray-700 dark:text-gray-300'>Ready to transform your business with cutting-edge technology? We're here to help turn your vision into reality. Get in touch with our expert team for a free consultation.</p>
          <div className='mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {contactMethods.map(method => {
              const content = (
                <div key={method.title} className={`rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900 ${method.href ? 'cursor-pointer transition-shadow hover:shadow-md' : ''}`}>
                  <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/40'>
                    <span className='text-2xl'>{method.icon}</span>
                  </div>
                  <h3 className='mb-2 font-semibold text-gray-900 dark:text-gray-100'>{method.title}</h3>
                  <p className='mb-1 font-medium text-gray-800 dark:text-gray-200'>{method.value}</p>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>{method.description}</p>
                </div>
              )
              return method.href ? <a key={method.title} href={method.href}>{content}</a> : content
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
export default HeroContact
