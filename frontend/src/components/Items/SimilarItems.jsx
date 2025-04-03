import { ItemCard } from '@/components/Items/ItemCard';

export function SimilarItems({ category, currentItemId }) {
  // In a real app, this would come from an API call
  const similarItems = [
    {
      id: "2",
      title: "Brown Leather Wallet",
      category: "Wallet",
      location: "Student Center",
      time: "2 days ago",
      image: "/wallet-2.jpg",
      status: "found"
    },
    {
      id: "3",
      title: "Black Card Holder",
      category: "Wallet",
      location: "Library",
      time: "1 week ago",
      image: "/cardholder.jpg",
      status: "lost"
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Similar Items</h2>
      <div className="grid grid-cols-1 gap-4">
        {similarItems
          .filter(item => item.id !== currentItemId)
          .slice(0, 3)
          .map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
}