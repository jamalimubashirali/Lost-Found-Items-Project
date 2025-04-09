import { ItemCard } from '@/components/Items/ItemCard';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import itemsService from '@/services/items.services';

export function SimilarItems({ category, currentItemId }) {
  const [similarItems, setSimilarItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);

  // Fetch similar items based on the category and current item ID
  useEffect(() => {
    const fetchSimilarItems = async () => {
      setIsLoading(true);
      setError(null);
      setIsEmpty(false);
      
      try {
        const response = await itemsService.searchItems({
          category
        });

        const similarItems = response.items.filter(item => item._id !== currentItemId);

        if (similarItems.length === 0) {
          setIsEmpty(true);
        } else {
          setSimilarItems(response.items);
        }
      } catch (error) {
        console.error('Error fetching similar items:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (category) { 
      fetchSimilarItems();
    } else {
      setIsLoading(false);
      setIsEmpty(true);
    }
  }, [category, currentItemId]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Similar Items</h2>
        <div className="grid grid-cols-1 gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Similar Items</h2>
        <p className="text-red-500">Error loading similar items: {error}</p>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Similar Items</h2>
        <p className="text-gray-500">No similar items found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Similar Items</h2>
      <div className="grid grid-cols-1 gap-4">
        {similarItems.map(item => (
          <ItemCard key={item.id} item={item} compact />
        ))}
      </div>
    </div>
  );
}