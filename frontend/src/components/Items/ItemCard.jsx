import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function ItemCard({ item }) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <Badge variant="secondary">{item.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{item.description}</p>
        <div className="mt-4 flex items-center space-x-2">
          <span className="text-xs text-gray-500">
            Lost on: {item.date}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">View Details</Button>
        <Button>Claim</Button>
      </CardFooter>
    </Card>
  )
}