import { Card } from '../../ui/Card'
import { Container } from '../../ui/Container'
import { Heading } from '../../ui/Heading'
import { Text } from '../../ui/Text'

export function ResultsSection() {
  const metrics = [
    { value: '300%', label: 'Average Performance Improvement', description: 'Our solutions typically improve system performance by 3x or more' },
    { value: '45%', label: 'Average ROI Increase', description: 'Clients see significant return on investment within the first year' },
    { value: '90%', label: 'Client Retention Rate', description: 'Long-term partnerships built on trust and proven results' },
    { value: '2 weeks', label: 'Average Project Start Time', description: 'We get your project up and running quickly with our proven process' },
  ] as const

  return (
    <section className="bg-blue-50 py-24 dark:bg-blue-900/20">
      <Container>
        <div className="mb-16 text-center">
          <Heading level={2} className="mb-6">
            Measurable Results
          </Heading>
          <Text variant="large" className="mx-auto max-w-3xl">
            Our case studies demonstrate consistent, measurable outcomes across different industries and project types.
          </Text>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <Card key={i} className="p-8 text-center">
              <div className="mb-3 text-5xl font-bold text-blue-600 dark:text-blue-400">{metric.value}</div>
              <Heading level={3} className="mb-3 text-lg">
                {metric.label}
              </Heading>
              <Text className="text-sm">{metric.description}</Text>
            </Card>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Card className="mx-auto max-w-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
            <Heading level={3} className="mb-4 text-white">
              Ready to See Similar Results?
            </Heading>
            <Text className="mb-6 text-blue-100">
              Every successful project starts with understanding your unique challenges. Let's discuss how we can help you achieve your technology goals.
            </Text>
            <a href="/contact" className="inline-flex items-center rounded-lg bg-white px-8 py-3 font-medium text-blue-600 transition-colors hover:bg-blue-50">
              Start Your Project
            </a>
          </Card>
        </div>
      </Container>
    </section>
  )
}

export default ResultsSection
