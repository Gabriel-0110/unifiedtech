import type { Metadata } from 'next'
import React from 'react'
import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Heading'
import { Text } from '@/components/ui/Text'
import { Card } from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Resources - Guides, Insights & Tools',
  description: 'Explore curated resources, guides, insights, and tools to help you build and scale modern digital products.',
}

const resources = [
  { title: 'Engineering Playbook', description: 'Our internal approach to building scalable, maintainable software.' },
  { title: 'Cloud Migration Checklist', description: 'Key steps and considerations for migrating legacy infrastructure to modern cloud platforms.' },
  { title: 'Design System Starter', description: 'Foundational principles and component guidelines for consistent UI.' },
  { title: 'Performance Optimization Guide', description: 'Techniques and tooling to diagnose and improve web performance.' },
]

export default function ResourcesPage() {
  return (
    <main className='flex flex-col'>
      <section className='bg-gradient-to-br from-blue-600 to-purple-700 py-24 text-white'>
        <Container>
          <div className='text-center'>
            <Heading level={1} className='mb-6 text-4xl font-bold md:text-6xl text-white'>Resources</Heading>
            <Text variant='large' className='mx-auto max-w-3xl text-blue-100'>Guides, insights, and tools to help you build and scale modern digital products.</Text>
          </div>
        </Container>
      </section>
      <section className='bg-white py-24 dark:bg-gray-950'>
        <Container>
          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {resources.map(r => (
              <Card key={r.title} className='p-8'>
                <Heading level={3} className='mb-3 text-xl'>{r.title}</Heading>
                <Text className='text-slate-600 dark:text-slate-300'>{r.description}</Text>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </main>
  )
}
