'use client'
import React, { useState } from 'react'

const faqs = [
  { category: 'General', questions: [
    { question: 'How long does a typical project take?', answer: 'Project timelines vary based on complexity and scope. Simple websites typically take 4-6 weeks, while complex applications can take 3-6 months.' },
    { question: 'What is your pricing structure?', answer: 'Our pricing is project-based and depends on scope, complexity, and timeline. We offer transparent pricing with no hidden fees.' },
    { question: 'Do you work with startups or only established companies?', answer: 'We work with businesses of all sizes, from early-stage startups to Fortune 500 companies.' },
  ] }
] as const

interface FAQItemProps { question: string; answer: string; isOpen: boolean; onToggle: () => void }
function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className='rounded-lg border border-gray-200 dark:border-gray-700'>
      <button onClick={onToggle} className='flex w-full items-center justify-between rounded-lg px-6 py-4 text-left transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-gray-800'>
        <span className='pr-4 font-medium text-gray-900 dark:text-gray-100'>{question}</span>
        <span className={`text-gray-500 transition-transform dark:text-gray-400 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {isOpen && (<div className='px-6 pb-4'><p className='text-gray-600 dark:text-gray-400'>{answer}</p></div>)}
    </div>
  )
}

export function FAQSection() {
  const [activeCategory] = useState('General')
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})
  const toggleItem = (index: number) => setOpenItems(prev => ({ ...prev, [`${activeCategory}-${index}`]: !prev[`${activeCategory}-${index}`] }))
  const activeCategoryData = faqs.find(cat => cat.category === activeCategory)
  return (
    <section className='bg-gray-50 py-16 dark:bg-gray-900'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100'>Frequently Asked Questions</h2>
          <p className='mb-8 text-lg text-gray-600 dark:text-gray-300'>Find answers to common questions about our services and process</p>
        </div>
        <div className='grid grid-cols-1 items-start gap-12 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <div className='space-y-4'>
              {activeCategoryData?.questions.map((faq, index) => (
                <FAQItem key={`${activeCategory}-${index}`} question={faq.question} answer={faq.answer} isOpen={!!openItems[`${activeCategory}-${index}`]} onToggle={() => toggleItem(index)} />
              ))}
            </div>
          </div>
          <div>
            <div className='rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900'>
              <div className='mb-6 text-center'>
                <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40'>
                  <span className='text-3xl'>❓</span>
                </div>
                <h3 className='mb-2 text-xl font-bold text-gray-900 dark:text-gray-100'>Still Have Questions?</h3>
                <p className='mb-6 text-gray-600 dark:text-gray-400'>Can't find the answer you're looking for? Our team is here to help.</p>
              </div>
              <div className='space-y-4'>
                <a href='/contact' className='block w-full rounded-lg bg-blue-600 px-4 py-2 text-center text-white transition-colors hover:bg-blue-700'>Contact Our Team</a>
                <a href='mailto:info@ggunifiedtech.com' className='block w-full rounded-lg border border-gray-300 px-4 py-2 text-center text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800'>Send Email</a>
              </div>
              <div className='mt-6 border-t border-gray-200 pt-6 dark:border-gray-700'>
                <div className='text-center'>
                  <p className='mb-2 text-sm font-medium text-gray-900 dark:text-gray-100'>Average Response Time</p>
                  <div className='flex items-center justify-center space-x-2'>
                    <div className='h-2 w-2 rounded-full bg-green-500' />
                    <span className='text-sm text-gray-500 dark:text-gray-400'>Under 2 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default FAQSection
