import { useState } from 'react';
import { TrendingItems } from '@/components/Home/TrendingItems';
import { RecentActivity } from '@/components/Home/RecentActivity';
import { QuickActions } from '@/components/Home/QuickActions';
import { CommunitySpotlight } from '@/components/Home/CommunitySpotlight';
import { Container, PersonalizedRecommendations } from '@/components';
import { useSelector } from 'react-redux';

function Homepage() {
  const [activeTab, setActiveTab] = useState('forYou'); // 'forYou', 'trending', 'recent'
  const userData = useSelector((state) => state.user.userData) || 'User';
  console.log(userData);

  return (
    <div className="homepage-container min-h-screen">
      {/* Hero Welcome Section */}
      <section className="welcome-banner bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-xl mb-8">
        <Container>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {`Welcome back, ${userData?.name}!`}
            </h1>
            <p className="text-muted-foreground xs:text-center sm:text-center">What would you like to do today?</p>
          </div>
          <QuickActions />
        </div>
        </Container>
      </section>

      {/* Content Tabs */}
      <div className="flex border-b mb-6">
       <Container>
       <button
          className={`py-2 px-4 font-medium ${activeTab === 'forYou' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('forYou')}
        >
          For You
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'trending' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('trending')}
        >
          Trending
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'recent' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('recent')}
        >
          Recent
        </button>
       </Container>
      </div>

      {/* Dynamic Content Area */}
      <div className="flex flex-row justify-between">
        {/* Main Content Column */}
        <Container>
        <div className="space-y-8">
          {activeTab === 'forYou' && <PersonalizedRecommendations />}
          {activeTab === 'trending' && <TrendingItems />}
          {activeTab === 'recent' && <RecentActivity />}
        </div>

        {/* Sidebar Column */}
        <div className="mt-10 flex flex-row justify-between">
          <CommunitySpotlight />
          <div className="bg-secondary/10 rounded-xl">
            <h3 className="font-semibold text-lg mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Items reunited this week</p>
                <p className="text-2xl font-bold">42</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active community members</p>
                <p className="text-2xl font-bold">1,287</p>
              </div>
            </div>
          </div>
        </div>
        </Container>
      </div>
    </div>
  );
}

export default Homepage;