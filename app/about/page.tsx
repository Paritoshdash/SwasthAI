export default function AboutPage() {
  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold text-balance">About HealthEase Companion</h1>
      <p className="text-muted-foreground mt-3 max-w-3xl text-pretty leading-relaxed">
        Our mission is to make healthcare guidance more accessible for every family with a focus on maternal and child
        wellness. We combine trusted medical references with modern AI to provide instant, easy-to-understand guidance.
        We prioritize data privacy and never share your information without consent.
      </p>
      <div className="mt-6">
        <h2 className="text-xl font-medium">How our AI works</h2>
        <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mt-2">
          <li>Generates evidence-informed advice and reminders</li>
          <li>Always includes a safety disclaimer</li>
          <li>Encourages professional consultation when needed</li>
        </ul>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-medium">Sources</h2>
        <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mt-2">
          <li>WHO recommendations on maternal and child health</li>
          <li>Indian government health scheme portals and advisories</li>
          <li>Reviewed by certified clinicians periodically</li>
        </ul>
      </div>
    </section>
  )
}
