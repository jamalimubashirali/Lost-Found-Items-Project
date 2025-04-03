import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Container } from '@/components'

const steps = [
  {
    title: 'Report',
    description: 'Submit details about your lost item or found property',
    icon: '📝',
  },
  {
    title: 'Match',
    description: 'Our system automatically finds potential matches',
    icon: '🔍',
  },
  {
    title: 'Connect',
    description: 'Securely communicate with the finder/owner',
    icon: '💬',
  },
  {
    title: 'Reunite',
    description: 'Verify and return the item to its owner',
    icon: '🎉',
  },
]

export function HowItWorks() {
  return (
    <section className="py-12">
      <Container>
      <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      </Container>
    </section>
  )
}