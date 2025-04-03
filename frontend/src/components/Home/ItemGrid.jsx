import { ItemCard } from '../Items/ItemCard'
import { Skeleton } from '@/components/ui/skeleton'
import { useState } from 'react';

export function ItemGrid({ activeTab, category }) {
  const [isLoading] = useState(false) // Replace with actual loading state
//   const [items] = useState([...]) // Replace with fetched items

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[300px] w-full rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* {items
        .filter(item => 
          (category === 'all' || item.category === category) &&
          item.status === activeTab
        )
        .map(item => (
          <ItemCard key={item.id} item={item} />
        ))} */}
    </div>
  )
}