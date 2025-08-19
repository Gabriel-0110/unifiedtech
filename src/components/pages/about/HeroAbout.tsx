'use client'
import { Heading } from '../../ui/Heading'
import { Text } from '../../ui/Text'

const quickStats = [
  { label: 'Founded', value: '2014' },
  { label: 'Team Size', value: '25+' },
  { label: 'Countries', value: '20+' },
  { label: 'Industries', value: '15+' },
]

export const HeroAbout = () => {
  return (
    <section className='pb-16 pt-24 lg:pt-32'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
          <div>
            <div className='mb-6 inline-flex items-center rounded-full bg-blue-100 px-4 py-2'>
              <span className='mr-2 h-2 w-2 rounded-full bg-blue-500' />
              <span className='text-sm font-medium text-blue-700'>About UnifiedTech Solutions</span>
            </div>
            <Heading level={1} className='mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent lg:text-5xl'>
              Pioneering the Future of Technology
            </Heading>
            <Text variant='large' className='mb-8 text-gray-700 dark:text-gray-300'>
              We're not just another tech company. We're innovators, problem-solvers, and partners in your digital transformation journey.
            </Text>
            <div className='space-y-6'>
              <div>
                <Heading level={3} className='mb-2 text-lg font-semibold'>Our Mission</Heading>
                <Text className='text-gray-600 dark:text-gray-300'>To empower businesses with innovative technology solutions.</Text>
              </div>
              <div>
                <Heading level={3} className='mb-2 text-lg font-semibold'>Our Vision</Heading>
                <Text className='text-gray-600 dark:text-gray-300'>To be the world's most trusted technology partner.</Text>
              </div>
            </div>
          </div>
          <div className='relative'>
            <div className='rounded-3xl bg-gradient-to-br from-blue-100 to-purple-100 p-12 text-center dark:from-blue-900/20 dark:to-purple-900/20'>
              <div className='mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500'>
                <span className='text-4xl font-bold text-white'>U</span>
              </div>
              <Heading level={3} className='mb-4 text-2xl font-bold'>Building Tomorrow's Solutions Today</Heading>
              <Text className='mb-8 text-gray-600 dark:text-gray-300'>Every line of code, every solution, every partnership is crafted with precision.</Text>
              <div className='mx-auto grid max-w-md grid-cols-2 gap-4'>
                {quickStats.map((stat) => (
                  <div key={stat.label} className='rounded-xl bg-white p-4 text-center shadow-sm dark:bg-gray-800'>
                    <div className='text-2xl font-bold text-blue-600'>{stat.value}</div>
                    <div className='text-sm text-gray-500 dark:text-gray-400'>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default HeroAbout
