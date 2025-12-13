import { Container } from '../../ui/Container'
import { Heading } from '../../ui/Heading'
import { Text } from '../../ui/Text'

export function FilterSection() {
  const industries = ['All', 'E-commerce', 'Healthcare', 'Finance', 'Technology', 'Manufacturing']
  const technologies = ['All', 'React', 'Next.js', 'Node.js', 'Python', 'AWS', 'Docker']

  return (
    <section className="border-b bg-gray-50 py-12 dark:bg-gray-900/40">
      <Container>
        <div className="mb-8 text-center">
          <Heading level={2} className="mb-4">
            Filter Case Studies
          </Heading>
          <Text className="text-gray-600 dark:text-gray-400">
            Find case studies relevant to your industry or technology stack
          </Text>
        </div>
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          <div>
            <Heading level={3} className="mb-4 text-lg">
              By Industry
            </Heading>
            <div className="flex flex-wrap gap-2">
              {industries.map((industry) => (
                <button
                  key={industry}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition-colors hover:border-blue-300 hover:bg-blue-50 dark:border-gray-600 dark:hover:border-blue-400 dark:hover:bg-blue-500/10"
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Heading level={3} className="mb-4 text-lg">
              By Technology
            </Heading>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <button
                  key={tech}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition-colors hover:border-blue-300 hover:bg-blue-50 dark:border-gray-600 dark:hover:border-blue-400 dark:hover:bg-blue-500/10"
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default FilterSection
