import { Badge } from '@/components/ui/badge';

export function GalleryCard({ item, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="group rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow text-left"
    >
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
        <Badge 
          variant={item.status === 'lost' ? 'destructive' : 'success'}
          className="absolute top-2 left-2"
        >
          {item.status === 'lost' ? 'Lost' : 'Found'}
        </Badge>
      </div>
      <div className="p-4">
        <h3 className="font-medium line-clamp-1">{item.title}</h3>
        <p className="text-sm text-muted-foreground">
          {new Date(item.date).toLocaleDateString()}
        </p>
      </div>
    </button>
  );
}