import { Button } from '@/components/ui/button';
import { PlusCircle, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export function QuickActions() {
  return (
    <div className="flex space-x-2 mt-4 md:mt-0">
      <Link to={'/items/register-item'}>
      <Button variant="outline" className="flex items-center gap-2">
        <PlusCircle className="h-4 w-4" />
        <span>Report Item</span>
      </Button>
      </Link>
    </div>
  );
}