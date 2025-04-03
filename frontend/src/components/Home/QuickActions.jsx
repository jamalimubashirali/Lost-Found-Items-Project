import { Button } from '@/components/ui/button';
import { PlusCircle, Search, Bell } from 'lucide-react';

export function QuickActions() {
  return (
    <div className="flex space-x-2 mt-4 md:mt-0">
      <Button variant="outline" className="flex items-center gap-2">
        <PlusCircle className="h-4 w-4" />
        <span>Report Item</span>
      </Button>
      <Button variant="outline" className="flex items-center gap-2">
        <Search className="h-4 w-4" />
        <span>Search</span>
      </Button>
    </div>
  );
}