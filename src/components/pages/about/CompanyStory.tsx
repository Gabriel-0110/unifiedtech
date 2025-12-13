import { Card } from '../../ui/Card'
import { Heading } from '../../ui/Heading'
import { Text } from '../../ui/Text'
import { Container } from '../../ui/Container'

export function CompanyStory() {
  return (
    <section className='bg-slate-50 py-24 dark:bg-gray-950'>
      <Container>
        <div className='mx-auto max-w-4xl'>
          <div className='mb-16 text-center'>
            <Heading level={2} className='mb-6'>Our Story</Heading>
            <Text variant='large' className='text-slate-600 dark:text-slate-300'>
              Founded with a vision to bridge the gap between innovative technology and business success
            </Text>
          </div>
          <div className='grid gap-8 md:gap-12'>
            <Card className='p-8'>
              <div className='flex items-start gap-6'>
                <div className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100'>
                  <span className='text-2xl'>🚀</span>
                </div>
                <div>
                  <Heading level={3} className='mb-4'>Our Beginning</Heading>
                  <Text className='leading-relaxed text-slate-600 dark:text-slate-300'>
                    UnifiedTech Solutions was born from a simple belief: technology should empower businesses, not complicate them. Our founders combined their experience in software development, cloud architecture, and business consulting to create a company that understands both technology and business needs.
                  </Text>
                </div>
              </div>
            </Card>
            <Card className='p-8'>
              <div className='flex items-start gap-6'>
                <div className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-green-100'>
                  <span className='text-2xl'>🎯</span>
                </div>
                <div>
                  <Heading level={3} className='mb-4'>Our Mission</Heading>
                  <Text className='leading-relaxed text-slate-600 dark:text-slate-300'>
                    We're on a mission to democratize cutting-edge technology for businesses of all sizes. Whether you're a startup building your first application or an enterprise seeking digital transformation, we provide the expertise and solutions to help you succeed.
                  </Text>
                </div>
              </div>
            </Card>
            <Card className='p-8'>
              <div className='flex items-start gap-6'>
                <div className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-purple-100'>
                  <span className='text-2xl'>🌟</span>
                </div>
                <div>
                  <Heading level={3} className='mb-4'>Our Vision</Heading>
                  <Text className='leading-relaxed text-slate-600 dark:text-slate-300'>
                    We envision a future where every business, regardless of size or industry, has access to enterprise-grade technology solutions. Through innovation, collaboration, and commitment to excellence, we're building that future one client at a time.
                  </Text>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  )
}
export default CompanyStory
