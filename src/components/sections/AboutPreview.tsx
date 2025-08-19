"use client";
const highlights = [
  { title: 'Expert Team', description: '25+ skilled professionals with diverse expertise in cutting-edge technologies.' },
  { title: 'Proven Track Record', description: '500+ successful projects delivered across various industries worldwide.' },
  { title: 'Global Reach', description: 'Serving clients from startups to Fortune 500 companies across 20+ countries.' },
  { title: 'Results-Driven', description: 'Focused on measurable outcomes and long-term business success.' },
]
const values = [
  'Innovation-First Approach',
  'Quality & Excellence',
  'Client Partnership',
  'Continuous Learning',
  'Sustainable Solutions',
  'Transparent Communication',
]
export const AboutPreview = () => (
  <section className='bg-gray-50 py-16 dark:bg-gray-900'>
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
        <div>
          <h2 className='mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100'>About UnifiedTech Solutions</h2>
          <p className='mb-6 text-xl text-gray-700 dark:text-gray-300'>We're a forward-thinking technology company dedicated to helping businesses thrive in the digital age. With over a decade of experience, we've mastered the art of transforming complex challenges into elegant solutions.</p>
          <div className='mb-6'>
            <h3 className='mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100'>Our Mission</h3>
            <p className='mb-6 text-gray-600 dark:text-gray-300'>To empower businesses with innovative technology solutions that drive growth, efficiency, and competitive advantage in an ever-evolving digital landscape.</p>
          </div>
          <div className='mb-6'>
            <h3 className='mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100'>Our Values</h3>
            <div className='mb-6 grid grid-cols-2 gap-2'>
              {values.map((value) => (
                <div key={value} className='flex items-center space-x-2'>
                  <div className='h-2 w-2 rounded-full bg-blue-500' />
                  <span className='text-sm text-gray-600 dark:text-gray-300'>{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-4 sm:flex-row'>
            <a href='/about' className='rounded-lg bg-blue-600 px-6 py-3 text-center text-white transition-colors hover:bg-blue-700'>Learn More About Us</a>
            <a href='/case-studies' className='rounded-lg border border-gray-300 px-6 py-3 text-center text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800'>See Our Work</a>
          </div>
        </div>
        <div>
          <div className='rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-800'>
            <h3 className='mb-6 text-center text-2xl font-bold text-gray-900 dark:text-gray-100'>Why Choose Us</h3>
            <div className='space-y-6'>
              {highlights.map((h) => (
                <div key={h.title} className='flex items-start space-x-4'>
                  <div className='rounded-lg bg-blue-100 p-2 dark:bg-blue-900/40'>
                    <span className='h-5 w-5 text-blue-600 dark:text-blue-400'>✓</span>
                  </div>
                  <div className='flex-1'>
                    <h4 className='mb-1 font-semibold text-gray-900 dark:text-gray-100'>{h.title}</h4>
                    <p className='text-sm text-gray-600 dark:text-gray-300'>{h.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='mt-8 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 p-8 text-white'>
            <div className='text-center'>
              <h3 className='mb-2 text-xl font-bold text-white'>Meet Our Team</h3>
              <p className='mb-6 text-blue-100'>Passionate professionals driving innovation every day</p>
              <div className='mb-6 flex justify-center space-x-2'>
                {[1,2,3,4,5].map(i => (
                  <div key={i} className='flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/20 font-semibold text-white'>
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
                <div className='flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 text-sm text-white'>+20</div>
              </div>
              <a href='/about#team' className='rounded-lg border border-white px-4 py-2 text-white transition-colors hover:bg-white hover:text-blue-600'>Meet the Team</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)
export default AboutPreview
