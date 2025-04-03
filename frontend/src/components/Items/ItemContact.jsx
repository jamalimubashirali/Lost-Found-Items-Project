import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function ItemContact({ user, itemId }) {
  return (
    <div className="bg-secondary/10 p-6 rounded-xl space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-sm text-muted-foreground">
            Member since {new Date(user.joined).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-background p-3 rounded-lg">
          <p className="text-sm text-muted-foreground">Items Reported</p>
          <p className="font-semibold">{user.itemsReported}</p>
        </div>
        <div className="bg-background p-3 rounded-lg">
          <p className="text-sm text-muted-foreground">Items Reunited</p>
          <p className="font-semibold">{user.itemsReunited}</p>
        </div>
      </div>

      <Button className="w-full">Contact About This Item</Button>

      <div className="text-center text-sm text-muted-foreground">
        <p>Please be cautious when sharing personal information</p>
      </div>
    </div>
  );
}