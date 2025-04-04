import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export function GalleryLightbox({ item, onClose }) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="aspect-square bg-gray-100">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-contain max-h-[70vh]"
            />
          </div>
          
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant={item.status === 'lost' ? 'destructive' : 'success'}>
                {item.status === 'lost' ? 'Lost' : 'Found'}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {new Date(item.date).toLocaleDateString()}
              </span>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Description</h3>
              <p className="text-muted-foreground">
                {item.description || 'No description provided'}
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Location</h3>
              <p className="text-muted-foreground">
                {item.location || 'Location not specified'}
              </p>
            </div>
            
            <Button className="w-full mt-4">
              {item.status === 'lost' ? 'I Found This' : 'This Is Mine'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}