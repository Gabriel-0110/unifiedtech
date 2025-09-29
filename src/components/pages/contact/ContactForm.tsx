'use client'
import React, { useState } from 'react'
import Link from 'next/link'

interface FormState {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  projectType: string
  message: string
  smsServiceOptIn: boolean
  smsPromotionalOptIn: boolean
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<null | { type: 'success' | 'error'; message: string }>(null)
  const [formData, setFormData] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    message: '',
    smsServiceOptIn: false,
    smsPromotionalOptIn: false,
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, budget: null, newsletter: false }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setStatus({ type: 'success', message: 'Message sent successfully!' })
      setFormData({ firstName: '', lastName: '', email: '', phone: '', company: '', projectType: '', message: '', smsServiceOptIn: false, smsPromotionalOptIn: false })
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || 'Something went wrong' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='bg-white p-8 dark:bg-gray-900 lg:p-12'>
      <div className='mb-8'>
        <h2 className='mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100'>Let's Start Your Project</h2>
        <p className='text-lg text-gray-600 dark:text-gray-300'>Fill out the form below and we'll get back to you within 24 hours.</p>
      </div>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>First Name *</label>
            <input required name='firstName' value={formData.firstName} onChange={handleChange} placeholder='John' className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100' />
          </div>
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>Last Name *</label>
            <input required name='lastName' value={formData.lastName} onChange={handleChange} placeholder='Doe' className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100' />
          </div>
        </div>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>Email Address *</label>
            <input type='email' required name='email' value={formData.email} onChange={handleChange} placeholder='john@company.com' className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100' />
          </div>
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>Phone Number</label>
            <input name='phone' value={formData.phone} onChange={handleChange} placeholder='+18556403636' className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100' />
          </div>
        </div>
        <div>
          <label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>Company</label>
          <input name='company' value={formData.company} onChange={handleChange} placeholder='Your Company Name' className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100' />
        </div>
        <div>
          <label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>Project Type *</label>
          <select required name='projectType' value={formData.projectType} onChange={handleChange} className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100'>
            <option value=''>Select a project type</option>
            <option value='Web Development'>Web Development</option>
            <option value='Mobile App Development'>Mobile App Development</option>
            <option value='Cloud Solutions'>Cloud Solutions</option>
            <option value='AI Integration'>AI Integration</option>
            <option value='Digital Transformation'>Digital Transformation</option>
            <option value='Other'>Other</option>
          </select>
        </div>
        <div>
          <label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>Project Details *</label>
            <textarea required name='message' value={formData.message} onChange={handleChange} rows={5} placeholder='Tell us about your project, goals, timeline, and any specific requirements...' className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100' />
        </div>
        <div className='space-y-4'>
          {/* Service Messages Opt-in */}
          <div className='rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800'>
            <div className='flex items-start space-x-3'>
              <input
                type='checkbox'
                id='smsServiceOptIn'
                name='smsServiceOptIn'
                checked={formData.smsServiceOptIn}
                onChange={handleChange}
                className='mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700'
              />
              <div className='flex-1'>
                <label htmlFor='smsServiceOptIn' className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                  ☐ Yes, I would like to receive SMS text messages related to service reminders, appointment updates, and account notifications from UnifiedTech Solutions.
                </label>
                <p className='mt-1 text-xs text-gray-600 dark:text-gray-400'>
                  (Up to 6 msgs/month. Msg & data rates may apply. Reply STOP to unsubscribe or HELP for help. Consent is not required to purchase.)
                </p>
              </div>
            </div>
          </div>
          
          {/* Promotional Messages Opt-in */}
          <div className='rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800'>
            <div className='flex items-start space-x-3'>
              <input
                type='checkbox'
                id='smsPromotionalOptIn'
                name='smsPromotionalOptIn'
                checked={formData.smsPromotionalOptIn}
                onChange={handleChange}
                className='mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700'
              />
              <div className='flex-1'>
                <label htmlFor='smsPromotionalOptIn' className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                  ☐ Yes, I would like to receive promotional SMS messages about special offers, product updates, and marketing from UnifiedTech Solutions.
                </label>
                <p className='mt-1 text-xs text-gray-600 dark:text-gray-400'>
                  (Up to 4 msgs/month. Msg & data rates may apply. Reply STOP to unsubscribe or HELP for help. Consent is not required to purchase.)
                </p>
              </div>
            </div>
          </div>
          
          {/* SMS Policy Links */}
          <div className='text-center'>
            <p className='text-xs text-blue-600 dark:text-blue-400'>
              <Link href='/privacy' className='underline hover:no-underline'>View our SMS Privacy Policy</Link> and{' '}
              <Link href='/terms' className='underline hover:no-underline'>SMS Terms of Service</Link>
            </p>
          </div>
        </div>
        <button type='submit' disabled={isSubmitting} className='w-full rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 disabled:opacity-50'>
          {isSubmitting ? 'Sending Message...' : 'Send Message'}
        </button>
        {status && (
          <p className={`text-sm ${status.type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{status.message}</p>
        )}
      </form>
    </div>
  )
}
export default ContactForm
