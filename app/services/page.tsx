import type { Metadata } from 'next'
import React from 'react'
import { Heading } from '@/components/ui/Heading'
import { Text } from '@/components/ui/Text'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Our Services - Comprehensive Technology Solutions',
  description: "Explore UnifiedTech Solutions' comprehensive range of technology services including web development, cloud solutions, AI integration, and digital transformation consulting.",
  openGraph: {
    title: 'UnifiedTech Solutions Services - Comprehensive Technology Solutions',
    description: "Explore UnifiedTech Solutions' comprehensive range of technology services including web development, cloud solutions, AI integration, and digital transformation consulting.",
  },
}

const services = [
  { title: 'Web Development', description: 'Modern, responsive web applications built with the latest technologies and best practices.' },
  { title: 'Cloud Solutions', description: 'Scalable cloud infrastructure and migration services to modernize your technology stack.' },
  { title: 'AI Integration', description: 'Intelligent automation and AI-powered solutions to enhance your business processes.' },
]

export default function ServicesPage() {
  return (
    <main className='flex flex-col'>
      <section className='bg-gradient-to-br from-blue-600 to-purple-700 py-24 text-white'>
        <Container>
          <div className='text-center'>
            <Heading level={1} className='mb-6 text-4xl font-bold md:text-6xl text-white'>Our Services</Heading>
            <Text variant='large' className='mx-auto max-w-3xl text-blue-100'>Comprehensive technology solutions including web development, cloud solutions, AI integration, and digital transformation consulting.</Text>
          </div>
        </Container>
      </section>
      <section className='bg-white py-24 dark:bg-gray-950'>
        <Container>
          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {services.map(s => (
              <Card key={s.title} className='p-8'>
                <Heading level={3} className='mb-4 text-2xl'>{s.title}</Heading>
                <Text className='text-slate-600 dark:text-slate-300'>{s.description}</Text>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </main>
  )
}
