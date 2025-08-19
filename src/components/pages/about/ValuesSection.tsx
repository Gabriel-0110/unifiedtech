import { Card } from '../../ui/Card'
import { Heading } from '../../ui/Heading'
import { Text } from '../../ui/Text'
import { Container } from '../../ui/Container'

export function ValuesSection() {
  const values = [
    { title: 'Innovation First', description: 'We embrace cutting-edge technologies and innovative approaches to solve complex business challenges.', icon: '🚀', color: 'blue' },
    { title: 'Client Success', description: "Your success is our success. We're committed to delivering solutions that drive real business value.", icon: '🎯', color: 'green' },
    { title: 'Quality Excellence', description: 'We maintain the highest standards in code quality, security, and performance in everything we build.', icon: '⭐', color: 'yellow' },
    { title: 'Transparency', description: 'Open communication and honest collaboration form the foundation of our client relationships.', icon: '🤝', color: 'purple' },
    { title: 'Continuous Learning', description: 'We stay ahead of technology trends to bring you the most effective and modern solutions.', icon: '📚', color: 'indigo' },
    { title: 'Agile Approach', description: 'We adapt quickly to changing requirements and deliver value through iterative development.', icon: '⚡', color: 'orange' },
  ] as const
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    purple: 'bg-purple-100 text-purple-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    orange: 'bg-orange-100 text-orange-600',
  }
  return (
    <section className='bg-slate-50 py-24 dark:bg-gray-950'>
      <Container>
        <div className='mb-16 text-center'>
          <Heading level={2} className='mb-6'>Our Core Values</Heading>
          <Text variant='large' className='mx-auto max-w-3xl text-slate-600 dark:text-slate-300'>These principles guide everything we do and shape how we work with our clients and each other.</Text>
        </div>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {values.map((value) => (
            <Card key={value.title} className='h-full p-6'>
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${colorClasses[value.color]}`}><span className='text-2xl'>{value.icon}</span></div>
              <Heading level={3} className='mb-3'>{value.title}</Heading>
              <Text className='leading-relaxed text-slate-600 dark:text-slate-300'>{value.description}</Text>
            </Card>
          ))}
        </div>
        <div className='mt-16 text-center'>
          <Card className='mx-auto max-w-3xl bg-white p-8 dark:bg-gray-900'>
            <Heading level={3} className='mb-4'>Living Our Values</Heading>
            <Text className='leading-relaxed text-slate-600 dark:text-slate-300'>These aren't just words on a page – they're the principles that drive our daily work. Every project we take on, every client relationship we build, and every solution we create is guided by these core values.</Text>
          </Card>
        </div>
      </Container>
    </section>
  )
}
export default ValuesSection
