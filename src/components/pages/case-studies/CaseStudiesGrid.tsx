import { Card } from '../../ui/Card'
import { Container } from '../../ui/Container'
import { Heading } from '../../ui/Heading'
import { Text } from '../../ui/Text'

export function CaseStudiesGrid() {
  const caseStudies = [
    {
      id: 1,
      title: 'E-commerce Platform Transformation',
      client: 'RetailCorp',
      industry: 'E-commerce',
      challenge: 'Legacy system causing slow performance and poor user experience',
      solution: 'Modern React/Next.js platform with optimized performance',
      results: ['300% faster load times', '45% increase in conversions', '60% reduction in bounce rate'],
      technologies: ['Next.js', 'React', 'Node.js', 'AWS'],
    },
    {
      id: 2,
      title: 'Healthcare Management System',
      client: 'MedTech Solutions',
      industry: 'Healthcare',
      challenge: 'Inefficient patient data management and scheduling',
      solution: 'Comprehensive healthcare management platform with real-time capabilities',
      results: ['50% reduction in admin time', '95% appointment accuracy', '40% improved patient satisfaction'],
      technologies: ['React', 'Python', 'PostgreSQL', 'Docker'],
    },
    {
      id: 3,
      title: 'Financial Analytics Dashboard',
      client: 'FinanceFirst',
      industry: 'Finance',
      challenge: 'Manual reporting processes taking weeks to complete',
      solution: 'Automated analytics dashboard with real-time data visualization',
      results: ['90% faster reporting', '$2M cost savings', 'Real-time insights'],
      technologies: ['Vue.js', 'Python', 'MongoDB', 'D3.js'],
    },
  ] as const

  return (
    <section className="bg-white py-24 dark:bg-gray-950">
      <Container>
        <div className="grid gap-12">
          {caseStudies.map((study, index) => (
            <Card key={study.id} className="overflow-hidden">
              <div className={`grid gap-0 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={`flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-12 dark:from-gray-800 dark:to-gray-700 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-lg bg-blue-600">
                      <span className="text-4xl text-white">📊</span>
                    </div>
                    <Text className="text-gray-600 dark:text-gray-300">{study.client}</Text>
                  </div>
                </div>
                <div className="p-8 lg:p-12">
                  <div className="mb-4">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-500/20 dark:text-blue-300">{study.industry}</span>
                  </div>
                  <Heading level={3} className="mb-4 text-xl">
                    {study.title}
                  </Heading>
                  <div className="mb-6 space-y-6">
                    <div>
                      <Heading level={4} className="mb-2 text-gray-900 dark:text-gray-100">
                        Challenge
                      </Heading>
                      <Text className="mb-4">{study.challenge}</Text>
                    </div>
                    <div>
                      <Heading level={4} className="mb-2 text-gray-900 dark:text-gray-100">
                        Solution
                      </Heading>
                      <Text className="mb-4">{study.solution}</Text>
                    </div>
                  </div>
                  <div className="mb-6">
                    <Heading level={4} className="mb-3 text-gray-900 dark:text-gray-100">
                      Results
                    </Heading>
                    <ul className="space-y-2">
                      {study.results.map((result, i) => (
                        <li key={i} className="flex items-center">
                          <span className="mr-3 h-2 w-2 rounded-full bg-green-500"></span>
                          <Text>{result}</Text>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <Heading level={4} className="mb-3 text-gray-900 dark:text-gray-100">
                      Technologies Used
                    </Heading>
                    <div className="flex flex-wrap gap-2">
                      {study.technologies.map((tech, i) => (
                        <span key={i} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default CaseStudiesGrid
