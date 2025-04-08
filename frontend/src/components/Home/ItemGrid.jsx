import { ItemCard } from '../Items/ItemCard';
import { Skeleton } from '@/components/ui/skeleton';
import itemsService from '@/services/items.services';
import { useState, useEffect } from 'react';

export function ItemGrid() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
        (
          async () => {
            try {
              setIsLoading(true);
              const response = await itemsService.getAllItems();     
              // Sort by most recent first
              const sortedItems = response?.items.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
              );
              setItems(sortedItems.slice(0, 6)); // Show only 6 trending items
            } catch (err) {
              setError(err.message);
            } finally {
              setIsLoading(false);
            }
          }
        )();
  }, []);

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading trending items: {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[400px] w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No trending items found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <ItemCard key={item._id} item={item} />
      ))}
    </div>
  );
}