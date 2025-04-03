import { ItemCard } from '@/components/Items/ItemCard';
import { Container } from '@/components';

export function TrendingItems() {
  const trendingItems = [
    {
      id: 1,
      title: "University ID Card",
      category: "ID",
      location: "Student Center",
      time: "Today",
      image: "/placeholder-id.jpg",
      matches: 12
    },
    {
      id: 2,
      title: "Silver Keychain",
      category: "Keys",
      location: "Parking Lot B",
      time: "Yesterday",
      image: "/placeholder-keys.jpg",
      matches: 8
    },
    {
      id: 3,
      title: "Wireless Headphones",
      category: "Electronics",
      location: "Gym",
      time: "2 days ago",
      image: "/placeholder-headphones.jpg",
      matches: 5
    }
  ];

  return (
    <div>
     <Container>
     <h2 className="text-xl font-semibold mb-4">Trending in your area</h2>
      <div className="flex flex-row gap-4">
        {trendingItems.map(item => (
          <ItemCard key={item.id} item={item} showMatches />
        ))}
      </div>
     </Container>
    </div>
  );
}