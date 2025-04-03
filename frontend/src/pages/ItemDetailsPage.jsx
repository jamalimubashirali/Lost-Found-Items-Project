import { useParams } from 'react-router-dom';
import { ItemHeader } from '@/components/Items/ItemHeader';
import { ItemGallery } from '@/components/Items/ItemGallery';
import { ItemDescription } from '@/components/Items/ItemDescription';
import { ItemContact } from '@/components/Items/ItemContact';
import { SimilarItems } from '@/components/Items/SimilarItems';
import { Container } from '@/components';

function ItemDetailsPage() {
  const { id } = useParams();

  // In a real app, this would come from an API call
  const item = {
    id: id,
    title: "Lost Black Leather Wallet",
    status: "lost", // or "found"
    category: "Wallet",
    date: "2023-05-15",
    time: "14:30",
    location: "Near Main Library, Building A",
    description: "Black leather wallet with silver trim. Contains my student ID, credit card, and about $50 in cash. The wallet has my initials 'J.S.' engraved on the inside.",
    images: [
      "/wallet-1.jpg",
      "/wallet-2.jpg"
    ],
    user: {
      name: "John Smith",
      avatar: "/user-avatar.jpg",
      joined: "2022-10-15",
      itemsReported: 3,
      itemsReunited: 2
    },
    features: [
      "Black leather",
      "Silver trim",
      "ID pocket",
      "3 card slots"
    ]
  };

  return (
    <Container className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <ItemHeader 
            title={item.title} 
            status={item.status} 
            date={item.date} 
            time={item.time} 
            location={item.location}
          />
          
          <ItemGallery images={item.images} />
          
          <ItemDescription 
            description={item.description}
            features={item.features}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <ItemContact 
            user={item.user}
            itemId={item.id}
          />
          
          <SimilarItems 
            category={item.category} 
            currentItemId={item.id}
          />
        </div>
      </div>
    </Container>
  );
}

export default ItemDetailsPage;