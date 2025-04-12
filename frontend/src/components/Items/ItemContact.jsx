import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mail, Phone, Shield } from "lucide-react";

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

      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full mt-4">Contact About This Item</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Contact Information</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <a 
                  href={`mailto:${user?.email}`} 
                  className="font-medium hover:underline"
                >
                  {user?.email}
                </a>
              </div>
            </div>

            {user?.phone && (
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a 
                    href={`tel:${user?.phone}`} 
                    className="font-medium hover:underline"
                  >
                    {user?.phone}
                  </a>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
              <Shield className="h-4 w-4" />
              <p>Please be cautious when sharing personal information</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="text-center text-sm text-muted-foreground">
        <p>Click the button above to view contact details</p>
      </div>
    </div>
  );
}