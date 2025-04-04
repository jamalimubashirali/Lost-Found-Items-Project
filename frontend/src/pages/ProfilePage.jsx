import { useState } from 'react';
import { ProfileHeader } from '@/components/Profile/ProfileHeader';
import { ProfileStats } from '@/components/Profile/ProfileStats';
import { ProfileItems } from '@/components/Profile/ProfileItems';
import { ProfileTabs } from '@/components/Profile/ProfileTabs';
import { Container } from '@/components';

function ProfilePage() {
  const [activeTab, setActiveTab] = useState('lost'); // 'lost', 'found', 'reunited'

  // In a real app, this would come from an API
  const user = {
    name: "Alex Johnson",
    avatar: "/profile-avatar.jpg",
    joinDate: "2022-10-15",
    bio: "I'm passionate about helping reunite lost items with their owners. Contact me if you found something!",
    stats: {
      itemsReported: 12,
      itemsFound: 8,
      itemsReunited: 5
    },
    items: {
      lost: [
        {
          id: 1,
          title: "Black Leather Wallet",
          image: "/wallet.jpg",
          date: "2023-05-15",
          status: "lost"
        },
        // ... more lost items
      ],
      found: [
        {
          id: 2,
          title: "AirPods Pro",
          image: "/airpods.jpg",
          date: "2023-05-10",
          status: "found"
        },
        // ... more found items
      ],
      reunited: [
        {
          id: 3,
          title: "Student ID Card",
          image: "/id-card.jpg",
          date: "2023-04-22",
          status: "reunited"
        },
        // ... more reunited items
      ]
    }
  };

  return (
    <Container className="py-8">
      <div className="space-y-8">
        <ProfileHeader 
          user={user}
        />
        
        <ProfileStats 
          stats={user.stats}
        />
        
        <div className="space-y-6">
          <ProfileTabs 
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          
          <ProfileItems 
            items={user.items[activeTab]}
            emptyMessage={`No ${activeTab} items yet`}
          />
        </div>
      </div>
    </Container>
  );
}

export default ProfilePage;