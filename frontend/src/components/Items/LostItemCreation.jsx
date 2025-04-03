import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card'
  import { Badge } from '@/components/ui/badge'
  import { Separator } from '@/components/ui/separator'
  
  export function LostItemDetails({ item }) {
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-2xl">{item.name}</CardTitle>
            <Badge variant={item.status === 'found' ? 'default' : 'destructive'}>
              {item.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Item Image */}
          <div className="rounded-lg overflow-hidden border">
            <img
              src={item.imageUrl || '/placeholder-item.jpg'}
              alt={item.name}
              className="w-full h-64 object-cover"
            />
          </div>
  
          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailItem label="Category" value={item.category} />
            <DetailItem label="Location" value={item.location} />
            <DetailItem label="Date Lost" value={new Date(item.date).toLocaleDateString()} />
            <DetailItem label="Reward" value={item.reward || 'None'} />
          </div>
  
          <Separator />
  
          {/* Description */}
          <div>
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
  
          {/* Additional Info */}
          {item.additionalInfo && (
            <>
              <Separator />
              <div>
                <h3 className="font-medium mb-2">Additional Information</h3>
                <p className="text-gray-600">{item.additionalInfo}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    )
  }
  
  function DetailItem({ label, value }) {
    return (
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    )
  }