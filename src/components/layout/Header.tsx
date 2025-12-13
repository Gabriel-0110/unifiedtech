"use client";
import Link from 'next/link'
import { useState } from 'react'

const navigationLinks: { name: string; href: string }[] = [
  { name: 'Services', href: '/services' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Resources', href: '/resources' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  return (
    <header className='fixed left-0 right-0 top-0 z-50 border-b border-gray-200/20 bg-white/95 shadow-sm backdrop-blur-md dark:bg-gray-900/90'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <nav className='flex h-16 items-center justify-between lg:h-20'>
          <Link href='/' className='flex items-center space-x-2 text-xl font-bold text-blue-600 lg:text-2xl'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 lg:h-10 lg:w-10'>
              <span className='text-lg font-bold text-white lg:text-xl'>U</span>
            </div>
            <span>UnifiedTech</span>
          </Link>
          <div className='hidden items-center space-x-8 lg:flex'>
            {navigationLinks.map((link) => (
              <Link key={link.name} href={link.href} className='rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-gray-800'>
                {link.name}
              </Link>
            ))}
          </div>
          <div className='flex items-center space-x-4'>
            <div className='hidden lg:block'>
              <Link href='/contact' className='rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700'>
                Get Started
              </Link>
            </div>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className='p-2 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white lg:hidden' aria-label='Toggle mobile menu'>
              {isMobileMenuOpen ? <span className='text-2xl'>&times;</span> : <span className='text-2xl'>☰</span>}
            </button>
          </div>
        </nav>
        {isMobileMenuOpen && (
          <div className='border-t border-gray-200 bg-white/95 backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/95 lg:hidden'>
            <div className='space-y-2 py-4'>
              {navigationLinks.map((link) => (
                <Link key={link.name} href={link.href} className='block rounded-md px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-gray-800' onClick={() => setIsMobileMenuOpen(false)}>
                  {link.name}
                </Link>
              ))}
              <div className='border-t border-gray-200 px-4 pt-4 dark:border-gray-700'>
                <Link href='/contact' className='block w-full rounded-lg bg-blue-600 px-4 py-2 text-center text-white transition-colors hover:bg-blue-700'>
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
export default Header
