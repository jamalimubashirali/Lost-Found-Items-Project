import { useEffect, useState } from 'react';
import { ProfileHeader } from '@/components/Profile/ProfileHeader';
import { ProfileStats } from '@/components/Profile/ProfileStats';
import { ProfileItems } from '@/components/Profile/ProfileItems';
import { ProfileTabs } from '@/components/Profile/ProfileTabs';
import { Container } from '@/components';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import userServices from '@/services/user.services';
import itemsService from '@/services/items.services';

function ProfilePage() {
  const [activeTab, setActiveTab] = useState('lost'); // 'lost', 'found', 'reunited'
  const [user, setUser] = useState({});
  const [userItems, setUserItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector((state) => state.user.userData);
  const userRelatedItems = useSelector((state) => state.user.userRelatedItems);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // If viewing own profile, use Redux data
        if (userData?._id === id) {
          setUser(userData);
          setUserItems(userRelatedItems || []);
        } 
        // If viewing another user's profile, fetch data
        else {
          const response = await userServices.getUserById(id);
          if (response) {
            setUser(response.user);
            const itemsResponse = await itemsService.getUserItems(id);
            setUserItems(itemsResponse?.items || []);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, userData, userRelatedItems]);

  if (isLoading) {
    return (
      <Container className="py-8 min-h-screen">
        <div className="space-y-8">
          <h1 className="text-3xl font-bold">Loading...</h1>
        </div>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="py-8 min-h-screen">
        <div className="space-y-8">
          <h1 className="text-3xl font-bold">User not found</h1>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8 min-h-screen">
      <div className="space-y-8">
        <ProfileHeader user={user} />
        <ProfileStats stats={user.stats} />
        
        <div className="space-y-6">
          <ProfileTabs 
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          
          <ProfileItems 
            items={userItems.filter(item => item.itemType === activeTab)}
            emptyMessage={`No ${activeTab} items yet`}
          />
        </div>
      </div>
    </Container>
  );
}

export default ProfilePage;