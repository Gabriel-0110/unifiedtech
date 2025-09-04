'use client'
import React, { useState } from 'react'
import Link from 'next/link'

interface NewsletterFormState {
  email: string
  smsOptIn: boolean
}

export function NewsletterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<null | { type: 'success' | 'error'; message: string }>(null)
  const [formData, setFormData] = useState<NewsletterFormState>({
    email: '',
    smsOptIn: false,
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('Subscription failed')
      setStatus({ type: 'success', message: 'Successfully subscribed!' })
      setFormData({ email: '', smsOptIn: false })
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || 'Something went wrong' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='max-w-2xl'>
      <h3 className='mb-2 text-xl font-semibold text-white'>Stay Updated</h3>
      <p className='mb-6 text-gray-300'>Get the latest insights on technology trends, best practices, and industry news delivered to your inbox.</p>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='flex flex-col gap-4 sm:flex-row'>
          <input 
            type='email' 
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter your email' 
            required
            className='flex-1 rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500' 
          />
          <button 
            type='submit'
            disabled={isSubmitting}
            className='rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 disabled:opacity-50'
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
        <div className='rounded-lg border border-gray-600 bg-gray-700 p-3'>
          <div className='flex items-start space-x-3'>
            <input
              type='checkbox'
              id='newsletter-sms-opt-in'
              name='smsOptIn'
              checked={formData.smsOptIn}
              onChange={handleChange}
              className='mt-0.5 h-4 w-4 rounded border-gray-500 text-blue-600 focus:ring-2 focus:ring-blue-500 bg-gray-600'
            />
            <div className='flex-1'>
              <label htmlFor='newsletter-sms-opt-in' className='text-sm font-medium text-gray-300'>
                Also send me SMS text notifications
              </label>
              <p className='mt-1 text-xs text-gray-400'>
                By checking this box, you consent to receive SMS messages from ALVES & ARAUJO TOURISM SERVICES, LLC (DBA UnifiedTech Solutions by G&G) including service updates and occasional promotional messages. Message frequency: up to 10 messages per month. Message and data rates may apply. You can opt-out anytime by replying STOP. For help, reply HELP or contact us at info@ggunifiedtech.com. Consent is not required to subscribe to our newsletter.
              </p>
              <p className='mt-2 text-xs text-blue-400'>
                <Link href='/privacy' className='underline hover:no-underline'>SMS Privacy Policy</Link> and{' '}
                <Link href='/terms' className='underline hover:no-underline'>SMS Terms of Service</Link>
              </p>
            </div>
          </div>
        </div>
        {status && (
          <p className={`text-sm ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
            {status.message}
          </p>
        )}
      </form>
    </div>
  )
}

export default NewsletterForm
