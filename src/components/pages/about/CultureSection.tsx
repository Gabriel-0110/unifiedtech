import { Card } from '../../ui/Card'
import { Heading } from '../../ui/Heading'
import { Text } from '../../ui/Text'
import { Container } from '../../ui/Container'

export function CultureSection() {
  const culturePoints = [
    { title: 'Collaborative Environment', description: 'We believe great solutions come from great teamwork. Our culture promotes open communication, knowledge sharing, and collective problem-solving.', icon: '🤝' },
    { title: 'Work-Life Balance', description: "We understand that our best work comes when we're energized and motivated. We promote flexibility and respect for personal time.", icon: '⚖️' },
    { title: 'Continuous Growth', description: 'Learning never stops in tech. We encourage experimentation, provide learning opportunities, and celebrate both successes and lessons learned.', icon: '🌱' },
    { title: 'Client-Centric Focus', description: "Every decision we make considers the impact on our clients. We're not just building software; we're building relationships and trust.", icon: '💡' },
  ] as const
  return (
    <section className='bg-white py-24 dark:bg-gray-950'>
      <Container>
        <div className='mb-16 text-center'>
          <Heading level={2} className='mb-6'>Our Culture</Heading>
          <Text variant='large' className='mx-auto max-w-3xl text-slate-600 dark:text-slate-300'>We've built a culture that attracts top talent and fosters innovation, creativity, and excellence.</Text>
        </div>
        <div className='mb-16 grid gap-8 md:grid-cols-2'>
          {culturePoints.map((p) => (
            <Card key={p.title} className='p-8'>
              <div className='flex items-start gap-4'>
                <div className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100'><span className='text-2xl'>{p.icon}</span></div>
                <div>
                  <Heading level={3} className='mb-3'>{p.title}</Heading>
                  <Text className='leading-relaxed text-slate-600 dark:text-slate-300'>{p.description}</Text>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className='rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center text-white md:p-12'>
          <Heading level={3} className='mb-4 text-white'>Remote-First, Global Impact</Heading>
          <Text className='mx-auto mb-6 max-w-2xl text-lg text-blue-100'>Our distributed team model allows us to work with the best talent regardless of location, while maintaining close collaboration.</Text>
          <div className='mt-8 grid gap-6 md:grid-cols-3'>
            <div className='text-center'><div className='mb-2 text-3xl font-bold'>24/7</div><Text className='text-blue-200'>Global Support</Text></div>
            <div className='text-center'><div className='mb-2 text-3xl font-bold'>100%</div><Text className='text-blue-200'>Remote Capable</Text></div>
            <div className='text-center'><div className='mb-2 text-3xl font-bold'>∞</div><Text className='text-blue-200'>Learning Mindset</Text></div>
          </div>
        </div>
      </Container>
    </section>
  )
}
export default CultureSection
