import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

export function GalleryCard({ item, onClick }) {
  return (
    <Link 
      className="group rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow text-left"
      to={`/items/${item._id}`}
    >
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        <img
          src={item.images[0]}
          alt={item.itemName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
        <Badge 
          variant={item.itemType === 'lost' ? 'destructive' : 'success'}
          className={`absolute top-2 left-2 ${item.itemType === 'found' ? 'bg-green-100 text-green-800' : ''}`}
        >
          {item.itemType === 'lost' ? 'Lost' : 'Found'}
        </Badge>
      </div>
      <div className="p-4">
        <h3 className="font-medium line-clamp-1">{item.itemName}</h3>
        <p className="text-sm text-muted-foreground">
          {new Date(item.createdAt).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}