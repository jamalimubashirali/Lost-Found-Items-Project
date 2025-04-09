import { Badge } from '@/components/ui/badge';

export function ProfileItemCard({ item }) {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-square bg-gray-100 relative">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <Badge 
          variant={item.itemType === 'lost' ? 'destructive' : 
                  item.itemType === 'found' ? 'success' : 'default'}
          className="absolute top-2 left-2"
        >
          {item.itemType === 'lost' ? 'Lost' : 
           item.itemType === 'found' ? 'Found' : 'Reunited'}
        </Badge>
      </div>
      <div className="p-4">
        <h3 className="font-medium">{item.itemName}</h3>
        <p className="text-sm text-muted-foreground">
          {new Date(item.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}