import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function ProfileHeader({ user }) {
  console.log('user', user);
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
      <div className="flex items-center gap-4 flex-1">
        <Avatar className="h-20 w-20 md:h-24 md:w-24">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>
            {user.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">
            Member since {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      
      <Button variant="outline">Edit Profile</Button>
    </div>
  );
}