import { QuickActions } from '@/components/Home/QuickActions';
import { useSelector } from 'react-redux';
import { Container } from '@/components';
import { ItemGrid } from '@/components/Home/ItemGrid';

function Homepage() {
  const userData = useSelector((state) => state.user.userData) || 'User';

  return (
    <div className="homepage-container min-h-screen">
      <section className="welcome-banner bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-xl mb-8">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {`Welcome back, ${userData?.name}!`}
              </h1>
              <p className="text-muted-foreground">
                What would you like to do today?
              </p>
            </div>
            <QuickActions />
          </div>
        </Container>
      </section>

      {/* Trending Items Section */}
      <Container className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Recently Reported Items</h2>
        <ItemGrid />
      </Container>
    </div>
  );
}

export default Homepage;