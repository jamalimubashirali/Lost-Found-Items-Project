import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {Container} from "@/components";

export function RecentActivity() {
  // Sample data - replace with real data from your API
  const activities = [
    {
      id: 1,
      type: "found",
      item: "Black Wallet",
      user: {
        name: "Alex Chen",
        avatar: "/avatars/alex.jpg",
        initials: "AC"
      },
      time: "5 minutes ago",
      location: "Library Entrance"
    },
    {
      id: 2,
      type: "reunited",
      item: "Student ID",
      user: {
        name: "Jamie Wilson",
        avatar: "/avatars/jamie.jpg",
        initials: "JW"
      },
      time: "1 hour ago",
      location: "Cafeteria"
    },
    {
      id: 3,
      type: "reported",
      item: "AirPods Case",
      user: {
        name: "Taylor Smith",
        avatar: "/avatars/taylor.jpg",
        initials: "TS"
      },
      time: "3 hours ago",
      location: "Parking Lot B"
    },
    {
      id: 4,
      type: "found",
      item: "Water Bottle",
      user: {
        name: "Morgan Lee",
        avatar: "/avatars/morgan.jpg",
        initials: "ML"
      },
      time: "5 hours ago",
      location: "Gym"
    },
    {
      id: 5,
      type: "reunited",
      item: "Textbook",
      user: {
        name: "Casey Johnson",
        avatar: "/avatars/casey.jpg",
        initials: "CJ"
      },
      time: "1 day ago",
      location: "Lecture Hall 3"
    }
  ];

  const getActivityIcon = (type) => {
    switch(type) {
      case 'found':
        return '🔍';
      case 'reunited':
        return '🤝';
      case 'reported':
        return '📝';
      default:
        return 'ℹ️';
    }
  };

  const getActivityColor = (type) => {
    switch(type) {
      case 'found':
        return 'text-blue-500';
      case 'reunited':
        return 'text-green-500';
      case 'reported':
        return 'text-orange-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div>
      <Container>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        <Button variant="ghost" size="sm">See All</Button>
      </div>
      
      <ScrollArea className="h-full">
        <div className="space-y-4 pr-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-3 p-3 hover:bg-secondary/50 rounded-lg transition-colors">
              <div className={`text-2xl ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={activity.user.avatar} />
                    <AvatarFallback>{activity.user.initials}</AvatarFallback>
                  </Avatar>
                  <p className="font-medium">{activity.user.name}</p>
                </div>
                <p className="text-sm">
                  {activity.type === 'found' && `Found a ${activity.item}`}
                  {activity.type === 'reunited' && `Reunited ${activity.item} with owner`}
                  {activity.type === 'reported' && `Reported a lost ${activity.item}`}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.location} • {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      </Container>
    </div>
  );
}