import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components';

export function StatsSection() {
  const stats = [
    { title: 'Items Reunited', value: '1,240+', description: 'With their owners' },
    { title: 'Active Users', value: '5,600+', description: 'In our community' },
    { title: 'Success Rate', value: '92%', description: 'Of verified claims' },
  ]

  return (
    <section className="w-full py-12 bg-secondary/10">
      <Container>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{stat.title}</p>
              <p className="text-sm text-gray-500">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      </Container>
    </section>
  )
}