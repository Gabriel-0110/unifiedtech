import Link from 'next/link'

const footerSections: Record<string, { title: string; links: { name: string; href: string }[] }> = {
  services: {
    title: 'Services',
    links: [
      { name: 'Web Development', href: '/services' },
      { name: 'Cloud Solutions', href: '/services' },
      { name: 'AI Integration', href: '/services' },
      { name: 'Digital Transformation', href: '/services' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'Resources', href: '/resources' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  legal: {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
  },
}

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className='bg-gray-900 text-white'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='py-16'>
          <div className='mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5'>
            <div className='lg:col-span-2'>
              <Link href='/' className='flex items-center space-x-3 text-2xl font-bold text-white'>
                <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600'>
                  <span className='text-xl font-bold text-white'>U</span>
                </div>
                <span>UnifiedTech</span>
              </Link>
              <p className='mt-4 max-w-md text-lg text-gray-300'>
                Transform your business with cutting-edge technology solutions. We deliver innovative web development, cloud services, AI integration, and digital transformation consulting.
              </p>
              <div className='mt-6 space-y-3'>
                <div className='flex items-center space-x-3 text-gray-300'>
                  <span>📧</span>
                  <span className='text-sm'>info@ggunifiedtech.com</span>
                </div>
                <div className='flex items-center space-x-3 text-gray-300'>
                  <span>📞</span>
                  <span className='text-sm'>+1 (929) 715-3656</span>
                </div>
                <div className='flex items-center space-x-3 text-gray-300'>
                  <span>📍</span>
                  <span className='text-sm'>Albany, NY</span>
                </div>
              </div>
            </div>
            {Object.entries(footerSections).map(([key, section]) => (
              <div key={key}>
                <h3 className='mb-4 font-semibold text-white'>{section.title}</h3>
                <ul className='space-y-2'>
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className='text-sm text-gray-400 transition-colors hover:text-white'>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className='mb-12 rounded-2xl bg-gray-800 p-8'>
            <div className='max-w-2xl'>
              <h3 className='mb-2 text-xl font-semibold text-white'>Stay Updated</h3>
              <p className='mb-6 text-gray-300'>Get the latest insights on technology trends, best practices, and industry news delivered to your inbox.</p>
              <div className='flex flex-col gap-4 sm:flex-row'>
                <input type='email' placeholder='Enter your email' className='flex-1 rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500' />
                <button className='rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700'>Subscribe</button>
              </div>
            </div>
          </div>
        </div>
        <div className='border-t border-gray-800 py-8'>
          <div className='flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0'>
            <div className='text-center md:text-left'>
              <p className='text-sm text-gray-400'>© {currentYear} UnifiedTech Solutions by G&G. All rights reserved.</p>
              <p className='text-xs text-gray-500'>A DBA of ALVES & ARAUJO TOURISM SERVICES, LLC</p>
            </div>
            <div className='flex items-center space-x-6'>
              <Link href='/privacy' className='text-sm text-gray-400 transition-colors hover:text-white'>Privacy</Link>
              <Link href='/terms' className='text-sm text-gray-400 transition-colors hover:text-white'>Terms</Link>
              <Link href='/cookies' className='text-sm text-gray-400 transition-colors hover:text-white'>Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
