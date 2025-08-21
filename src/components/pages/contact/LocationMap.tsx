'use client'
import React from 'react'

const locations = [
  { name: 'Albany Office', address: 'Albany, NY', phone: '+18556403636', hours: 'Mon-Fri 9AM-6PM EST', isPrimary: true },
  { name: 'Remote Teams', address: 'Available worldwide', phone: 'Same contact number', hours: 'Flexible timezone coverage', isPrimary: false },
] as const

export function LocationMap() {
  return (
    <section className='py-16'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100'>Our Locations</h2>
          <p className='text-lg text-gray-600 dark:text-gray-300'>We're based in Albany, NY with remote teams worldwide</p>
        </div>
        <div className='grid grid-cols-1 items-start gap-12 lg:grid-cols-2'>
          <div>
            <div className='relative flex h-96 items-center justify-center overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800'>
              <div className='absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20' />
              <div className='relative z-10 text-center'>
                <span className='mb-4 block text-4xl'>📍</span>
                <h3 className='mb-2 text-xl font-bold text-gray-900 dark:text-gray-100'>Albany, NY</h3>
                <p className='text-gray-600 dark:text-gray-400'>Interactive map coming soon</p>
              </div>
            </div>
          </div>
          <div>
            <div className='space-y-6'>
              {locations.map(location => (
                <div key={location.name} className={`rounded-2xl border bg-white p-6 dark:bg-gray-900 dark:border-gray-700 ${location.isPrimary ? 'border-blue-200 dark:border-blue-900/40' : 'border-gray-200'}`}> 
                  <div className='flex items-start space-x-4'>
                    <div className={`flex-shrink-0 rounded-lg p-2 ${location.isPrimary ? 'bg-blue-100 dark:bg-blue-900/40' : 'bg-gray-100 dark:bg-gray-800'}`}>
                      <span>📍</span>
                    </div>
                    <div className='flex-1'>
                      <h3 className='mb-2 text-xl font-bold text-gray-900 dark:text-gray-100'>
                        {location.name}
                        {location.isPrimary && <span className='ml-2 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'>Primary</span>}
                      </h3>
                      <div className='space-y-2'>
                        <div className='flex items-center space-x-2'>
                          <span className='text-gray-500 dark:text-gray-400'>📍</span>
                          <span className='text-sm text-gray-600 dark:text-gray-400'>{location.address}</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <span className='text-gray-500 dark:text-gray-400'>🕒</span>
                          <span className='text-sm text-gray-600 dark:text-gray-400'>{location.hours}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default LocationMap
