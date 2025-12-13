"use client";

const heroFeatures: string[] = [
  'Enterprise-grade solutions',
  '24/7 support & maintenance',
  'Scalable cloud infrastructure',
]

const stats: { label: string; value: string }[] = [
  { label: 'Projects Delivered', value: '500+' },
  { label: 'Happy Clients', value: '100+' },
  { label: 'Years Experience', value: '10+' },
  { label: 'Team Members', value: '25+' },
]

export const HeroSection = () => {
  return (
    <section className='relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900'>
      <div className='absolute inset-0 opacity-5 [background:radial-gradient(circle_at_1px_1px,#000_1px,transparent_0)] [background-size:40px_40px]' />
      <div className='relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='pb-16 pt-24 text-center lg:pt-32'>
          <div>
            <div className='mb-6 inline-flex items-center rounded-full border border-blue-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm dark:border-blue-900 dark:bg-gray-900/70'>
              <span className='mr-2 h-2 w-2 animate-pulse rounded-full bg-blue-500' />
              <span className='text-sm font-medium text-blue-700 dark:text-blue-300'>Transforming businesses with technology</span>
            </div>
            <h1 className='mx-auto mb-6 max-w-4xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl lg:text-6xl'>
              Cutting-Edge Technology Solutions for Modern Businesses
            </h1>
            <div className='mb-4 flex justify-center'>
              <span className='text-sm font-medium text-gray-600 dark:text-gray-400 tracking-wider'>
                A division of ALVES & ARAUJO TOURISM SERVICES, LLC
              </span>
            </div>
            <p className='mx-auto mb-8 max-w-3xl text-xl text-gray-700 dark:text-gray-300'>
              We deliver innovative web development, cloud services, AI integration, and digital transformation consulting that drives real results for your business.
            </p>
            <div className='mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row'>
              <a href='/contact' className='rounded-lg bg-blue-600 px-8 py-4 text-white transition-colors hover:bg-blue-700'>Get Started Today</a>
              <a href='/case-studies' className='rounded-lg border border-gray-300 px-8 py-4 text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800'>View Our Work</a>
            </div>
            <div className='mb-12 flex flex-wrap items-center justify-center gap-6'>
              {heroFeatures.map((feature) => (
                <div key={feature} className='flex items-center space-x-2'>
                  <span className='h-5 w-5 text-blue-500'>✓</span>
                  <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className='relative mx-auto mb-16 max-w-5xl'>
            <div className='relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900'>
              <div className='border-b border-gray-200 bg-gray-100 p-4 dark:border-gray-800 dark:bg-gray-800'>
                <div className='flex items-center space-x-2'>
                  <div className='h-3 w-3 rounded-full bg-red-500' />
                  <div className='h-3 w-3 rounded-full bg-yellow-500' />
                  <div className='h-3 w-3 rounded-full bg-green-500' />
                </div>
              </div>
              <div className='aspect-video flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-700'>
                <div className='text-center'>
                  <div className='mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-blue-500'>
                    <span className='text-2xl font-bold text-white'>U</span>
                  </div>
                  <p className='text-lg font-semibold text-gray-600 dark:text-gray-200'>Your Technology Vision</p>
                  <p className='text-gray-500 dark:text-gray-400'>Brought to Life</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className='mx-auto grid max-w-3xl grid-cols-2 gap-8 lg:grid-cols-4'>
              {stats.map((stat) => (
                <div key={stat.label} className='text-center'>
                  <div className='mb-1 text-2xl font-bold text-blue-600 dark:text-blue-400'>{stat.value}</div>
                  <div className='text-sm text-gray-500 dark:text-gray-400'>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default HeroSection
