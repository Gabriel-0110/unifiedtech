import { Card } from '../../ui/Card'
import { Heading } from '../../ui/Heading'
import { Text } from '../../ui/Text'
import { Container } from '../../ui/Container'

export function TeamSection() {
  const teamMembers = [
    { name: 'Gabriel Rodriguez', role: 'Co-Founder & Lead Developer', bio: 'Full-stack developer with expertise in modern web technologies, cloud architecture, and AI integration.', skills: ['Next.js', 'React', 'Node.js', 'AWS', 'AI/ML'] },
    { name: 'Tech Partner', role: 'Co-Founder & Business Strategy', bio: 'Business strategist focused on digital transformation and helping companies leverage technology for growth.', skills: ['Business Strategy', 'Digital Transformation', 'Project Management', 'Client Relations'] },
  ] as const
  return (
    <section className='bg-white py-24 dark:bg-gray-950'>
      <Container>
        <div className='mb-16 text-center'>
          <Heading level={2} className='mb-6'>Meet Our Team</Heading>
          <Text variant='large' className='mx-auto max-w-3xl text-slate-600 dark:text-slate-300'>Our diverse team brings together expertise in technology, business, and design to deliver exceptional solutions.</Text>
        </div>
        <div className='mx-auto grid max-w-4xl gap-8 md:grid-cols-2'>
          {teamMembers.map((m) => (
            <Card key={m.name} className='p-8 text-center'>
              <div className='mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600'><span className='text-4xl font-bold text-white'>{m.name.split(' ').map((n)=> n[0]).join('')}</span></div>
              <Heading level={3} className='mb-2'>{m.name}</Heading>
              <Text className='mb-4 font-medium text-blue-600 dark:text-blue-400'>{m.role}</Text>
              <Text className='mb-6 leading-relaxed text-slate-600 dark:text-slate-300'>{m.bio}</Text>
              <div className='flex flex-wrap justify-center gap-2'>
                {m.skills.map((skill) => (<span key={skill} className='rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-500/20 dark:text-blue-200'>{skill}</span>))}
              </div>
            </Card>
          ))}
        </div>
        <div className='mt-16 text-center'>
          <Card className='mx-auto max-w-2xl bg-gradient-to-r from-blue-50 to-purple-50 p-8 dark:from-blue-900/10 dark:to-purple-900/10'>
            <Heading level={3} className='mb-4'>Join Our Growing Team</Heading>
            <Text className='mb-6 text-slate-600 dark:text-slate-300'>We're always looking for talented individuals who share our passion for technology and innovation.</Text>
            <a href='/contact' className='inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700'>Get In Touch</a>
          </Card>
        </div>
      </Container>
    </section>
  )
}
export default TeamSection
