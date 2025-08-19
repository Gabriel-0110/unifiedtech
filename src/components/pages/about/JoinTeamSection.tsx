import { Card } from '../../ui/Card'
import { Heading } from '../../ui/Heading'
import { Text } from '../../ui/Text'
import { Container } from '../../ui/Container'
import Link from 'next/link'

export function JoinTeamSection() {
  const perks = [
    { title: 'Flexible Schedule', description: 'Work when you are most productive with a results-oriented approach.' },
    { title: 'Remote Friendly', description: 'Collaborate from anywhere. We provide the tools and support to stay connected.' },
    { title: 'Growth Budget', description: 'Annual allowance for courses, conferences, and certifications.' },
    { title: 'Modern Stack', description: 'Work with cutting-edge technologies across web, cloud, and data.' },
    { title: 'Meaningful Work', description: 'Solve real business problems that create measurable impact.' },
    { title: 'Inclusive Culture', description: 'We value diversity of thought, background, and experience.' },
  ] as const
  return (
    <section className='bg-slate-50 py-24 dark:bg-gray-900'>
      <Container>
        <div className='mx-auto mb-16 max-w-3xl text-center'>
          <Heading level={2} className='mb-6'>Join Our Team</Heading>
          <Text variant='large' className='text-slate-600 dark:text-slate-300'>We're always looking for talented engineers, designers, and strategists passionate about building exceptional digital products.</Text>
        </div>
        <div className='mb-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {perks.map((perk) => (
            <Card key={perk.title} className='p-6'>
              <Heading level={3} className='mb-2 text-lg'>{perk.title}</Heading>
              <Text className='text-slate-600 dark:text-slate-300'>{perk.description}</Text>
            </Card>
          ))}
        </div>
        <div className='text-center'>
          <Card className='mx-auto max-w-4xl p-10'>
            <Heading level={3} className='mb-4'>We'd love to hear from you</Heading>
            <Text className='mx-auto mb-8 max-w-2xl text-slate-600 dark:text-slate-300'>Even if you don't see an open role that matches your exact profile, feel free to reach out. We regularly create positions for exceptional people who bring unique value.</Text>
            <div className='flex flex-wrap justify-center gap-4'>
              <Link href='/contact' className='rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>Open Roles</Link>
              <a href='mailto:careers@unifiedtech.example' className='rounded-lg border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'>Email Careers</a>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  )
}
export default JoinTeamSection
