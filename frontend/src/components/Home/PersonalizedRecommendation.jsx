import { ItemCard } from "@/components/Items/ItemCard";
import {Container} from "@/components";

export function PersonalizedRecommendations() {
  // In a real app, these would come from your data/API
  const recommendations = [
    {
      id: 1,
      title: "Black Leather Wallet",
      category: "Wallet",
      location: "Near Main Library",
      time: "2 hours ago",
      image: "/placeholder-wallet.jpg",
    },
    {
      id: 2,
      title: "AirPods Pro Case",
      category: "Electronics",
      location: "Cafeteria",
      time: "1 day ago",
      image: "/placeholder-airpods.jpg",
    },
  ];

return (
    <div>
        <Container>
            <h2 className="text-xl font-semibold mb-4">Recommended for you</h2>
            <div className="flex flex-wrap gap-4">
                {recommendations.map((item) => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
        </Container>
    </div>
);
}
