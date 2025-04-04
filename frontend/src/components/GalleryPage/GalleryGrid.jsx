import { GalleryCard } from "./GalleryCard";

export function GalleryGrid({ items, onItemClick }) {
    if (items.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No items found matching your criteria</p>
        </div>
      );
    }
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(item => (
          <GalleryCard 
            key={item.id} 
            item={item} 
            onClick={() => onItemClick(item)}
          />
        ))}
      </div>
    );
  }