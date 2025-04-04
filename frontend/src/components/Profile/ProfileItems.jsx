import { EmptyState } from '@/components/Profile/EmptyState';
import { ProfileItemCard } from '@/components/Profile/ProfileItemCard';

export function ProfileItems({ items, emptyMessage }) {
  if (items.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(item => (
        <ProfileItemCard 
          key={item.id} 
          item={item}
        />
      ))}
    </div>
  );
}