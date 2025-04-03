export function CommunitySpotlight() {
    const spotlights = [
      {
        id: 1,
        name: "Sarah Johnson",
        action: "reunited a lost backpack with its owner",
        time: "2 hours ago",
        avatar: "/placeholder-avatar1.jpg"
      },
      {
        id: 2,
        name: "Campus Security",
        action: "found 5 items in the lecture hall",
        time: "1 day ago",
        avatar: "/placeholder-avatar2.jpg"
      }
    ];
  
    return (
      <div className="bg-background rounded-xl">
        <h3 className="font-semibold text-lg mb-4">Community Spotlight</h3>
        <div className="space-y-4">
          {spotlights.map(spotlight => (
            <div key={spotlight.id} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                {/* Avatar image would go here */}
              </div>
              <div>
                <p className="font-medium">{spotlight.name}</p>
                <p className="text-sm text-muted-foreground">
                  {spotlight.action} <span className="text-xs">• {spotlight.time}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }