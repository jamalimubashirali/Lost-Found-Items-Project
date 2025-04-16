import { HeroSection } from "@/components";
import { StatsSection } from "@/components";
import { HowItWorks } from "@/components";
import { Container } from "@/components";
import { useState } from "react";
function LandingPage() {
    const [activeTab, setActiveTab] = useState('lost')
    const [selectedCategory, setSelectedCategory] = useState('all')
  
    return (
      <div className="w-full overflow-x-hidden"> {/* Add overflow-x-hidden */}
        <main> {/* Constrain max width */}

        <HeroSection />
          <section className="container px-4 py-12"> {/* Ensure consistent padding */}
            {/* ... rest of your code ... */}
          </section>
          
          <StatsSection />
          <HowItWorks />
        </main>
      </div>
    )
  }

export default LandingPage;