"use client";

type TechCategory = { category: string; description: string; technologies: { name: string; logo: string }[] };
const techCategories: TechCategory[] = [
  { category: "Frontend", description: "Modern web interfaces that users love", technologies: [ { name: "React", logo: "⚛️" }, { name: "Next.js", logo: "▲" }, { name: "TypeScript", logo: "TS" }, { name: "Tailwind CSS", logo: "🎨" }, { name: "Vue.js", logo: "V" }, { name: "Angular", logo: "A" } ] },
  { category: "Backend", description: "Robust server-side solutions", technologies: [ { name: "Node.js", logo: "🟢" }, { name: "Python", logo: "🐍" }, { name: "Java", logo: "☕" }, { name: "Go", logo: "🐹" }, { name: ".NET", logo: ".NET" }, { name: "PHP", logo: "🐘" } ] },
  { category: "Cloud & DevOps", description: "Scalable infrastructure and deployment", technologies: [ { name: "AWS", logo: "☁️" }, { name: "Google Cloud", logo: "🌤️" }, { name: "Azure", logo: "🔷" }, { name: "Docker", logo: "🐳" }, { name: "Kubernetes", logo: "⚙️" }, { name: "Terraform", logo: "🏗️" } ] },
  { category: "Database", description: "Data storage and management solutions", technologies: [ { name: "PostgreSQL", logo: "🐘" }, { name: "MongoDB", logo: "🍃" }, { name: "Redis", logo: "📦" }, { name: "MySQL", logo: "🗄️" }, { name: "Elasticsearch", logo: "🔍" }, { name: "DynamoDB", logo: "⚡" } ] },
  { category: "AI & ML", description: "Intelligent solutions and automation", technologies: [ { name: "TensorFlow", logo: "🧠" }, { name: "PyTorch", logo: "🔥" }, { name: "OpenAI", logo: "🤖" }, { name: "Hugging Face", logo: "🤗" }, { name: "scikit-learn", logo: "📊" }, { name: "LangChain", logo: "🔗" } ] },
  { category: "Mobile", description: "Cross-platform mobile applications", technologies: [ { name: "React Native", logo: "📱" }, { name: "Flutter", logo: "🦋" }, { name: "Swift", logo: "🍎" }, { name: "Kotlin", logo: "🤖" }, { name: "Expo", logo: "🚀" }, { name: "Ionic", logo: "⚡" } ] },
];

export const TechStackSection = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Technology Stack</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">We leverage the latest technologies and frameworks to build scalable, maintainable, and high-performance solutions.</p>
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="text-center"><p className="text-2xl font-bold text-blue-600">50+</p><p className="text-sm text-gray-600 dark:text-gray-400">Technologies</p></div>
            <div className="text-center"><p className="text-2xl font-bold text-blue-600">10+</p><p className="text-sm text-gray-600 dark:text-gray-400">Years Experience</p></div>
            <div className="text-center"><p className="text-2xl font-bold text-blue-600">100%</p><p className="text-sm text-gray-600 dark:text-gray-400">Up-to-date</p></div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techCategories.map((category) => (
            <div key={category.category} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-4"><span className="text-2xl font-bold text-white">⚡</span></div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{category.category}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {category.technologies.map((tech) => (
                  <div key={tech.name} className="flex items-center space-x-2 p-3 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"><span className="text-xl">{tech.logo}</span><span className="text-sm font-medium text-gray-900 dark:text-white">{tech.name}</span></div>
                ))}
              </div>
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2"><span className="text-sm text-gray-600 dark:text-gray-400">Expertise Level</span><span className="text-sm font-medium text-gray-900 dark:text-white">Expert</span></div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-4/5" /></div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Don't See Your Technology?</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">We're always expanding our toolkit. If you have specific technology requirements, we're happy to adapt and learn new stacks for your project.</p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">{["Blockchain", "IoT", "AR/VR", "Microservices", "GraphQL", "Serverless", "Progressive Web Apps"].map((tech) => (<span key={tech} className="px-4 py-2 bg-white dark:bg-gray-700 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-400 transition-colors">{tech}</span>))}</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Ready to discuss your project? Let's talk about the best technology stack for your specific needs.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
