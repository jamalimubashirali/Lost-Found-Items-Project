import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

export function ItemContact({ user }) {
  return (
    <div className="bg-secondary/10 p-6 rounded-xl space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{user?.name}</h3>
          <p className="text-sm text-muted-foreground">
            Member since {new Date(user?.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <Link to={`/items/item-chat`}>
        <Button className="w-full mt-10">Contact About This Item</Button>
      </Link>

      <div className="text-center text-sm text-muted-foreground">
        <p>Please be cautious when sharing personal information</p>
      </div>
    </div>
  );
}
