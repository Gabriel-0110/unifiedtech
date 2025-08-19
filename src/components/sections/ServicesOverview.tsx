"use client";
const services = [
  { title: 'Web Development', description: 'Custom web applications built with modern technologies.', features: ['React & Next.js', 'Responsive design', 'Performance optimization'] },
  { title: 'Cloud Solutions', description: 'Scalable cloud infrastructure and migration services.', features: ['AWS & Azure', 'Serverless architecture', 'DevOps & CI/CD'] },
  { title: 'AI Integration', description: 'Intelligent solutions that enhance your business processes.', features: ['Machine learning', 'Natural language processing', 'Computer vision'] },
  { title: 'Digital Transformation', description: 'Complete digital transformation strategies to modernize your business.', features: ['Process automation', 'Legacy system migration', 'Data analytics'] },
]
export const ServicesOverview = () => (
  <section className='bg-gray-50 py-16 dark:bg-gray-900'>
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className='mb-16 text-center'>
        <h2 className='mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100'>Our Core Services</h2>
        <p className='mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300'>We provide comprehensive technology solutions that drive innovation, efficiency, and growth for businesses of all sizes.</p>
      </div>
      <div className='grid gap-8 md:grid-cols-2'>
        {services.map((service) => (
          <div key={service.title} className='rounded-xl bg-white p-8 shadow-sm transition-shadow hover:shadow-lg dark:bg-gray-800'>
            <h3 className='mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100'>{service.title}</h3>
            <p className='mb-6 text-gray-600 dark:text-gray-300'>{service.description}</p>
            <ul className='space-y-2'>
              {service.features.map((feature) => (
                <li key={feature} className='flex items-center text-gray-600 dark:text-gray-300'>
                  <span className='mr-3 h-2 w-2 rounded-full bg-blue-500'></span>{feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className='mt-16 text-center'>
        <div className='rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 p-8 dark:from-gray-800 dark:to-gray-700'>
          <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100'>Ready to Transform Your Business?</h3>
          <p className='mb-6 text-lg text-gray-700 dark:text-gray-300'>Let's discuss how our services can help you achieve your goals.</p>
          <div className='flex flex-col justify-center gap-4 sm:flex-row'>
            <a href='/contact' className='rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700'>Get Started</a>
            <a href='/services' className='rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800'>View All Services</a>
          </div>
        </div>
      </div>
    </div>
  </section>
)
export default ServicesOverview
