import { Container } from '../../ui/Container'
import { Heading } from '../../ui/Heading'
import { Text } from '../../ui/Text'

export function HeroCaseStudies() {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-purple-700 py-24 text-white">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <Heading level={1} className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Case Studies
          </Heading>
          <Text variant="large" className="mb-8 text-blue-100">
            Real success stories from our clients. See how we've helped businesses transform their operations through innovative technology solutions.
          </Text>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold">50+</div>
              <Text className="text-blue-200">Projects Completed</Text>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold">98%</div>
              <Text className="text-blue-200">Client Satisfaction</Text>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold">3x</div>
              <Text className="text-blue-200">Average ROI Increase</Text>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default HeroCaseStudies
