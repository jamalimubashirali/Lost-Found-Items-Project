// import { useParams } from 'react-router-dom'
// import { LostItemDetails } from './LostItemDetails'
// import { MatchingItems } from './MatchingItems'
// import { ItemActions } from './ItemActions'
// import { Button } from '@/components/ui/button'
// import { ArrowLeft } from 'lucide-react'
// import { useGetLostItem } from '@/api/items' // Custom hook for API call

// export function LostItemPage() {
//   const { id } = useParams()
//   const { data: item, isLoading, error } = useGetLostItem(id)

//   if (isLoading) return <LoadingState />
//   if (error) return <ErrorState error={error} />
//   if (!item) return <NotFoundState />

//   return (
//     <div className="container py-8">
//       <Button variant="ghost" className="mb-6" onClick={() => window.history.back()}>
//         <ArrowLeft className="mr-2 h-4 w-4" />
//         Back to all items
//       </Button>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Left Column - Item Details */}
//         <div className="lg:col-span-2">
//           <LostItemDetails item={item} />
//         </div>

//         {/* Right Column - Actions & Matches */}
//         <div className="space-y-6">
//           <ItemActions item={item} />
//           <MatchingItems itemId={item.id} />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default LostItemPage

import React from 'react'

const LostItemPage = () => {
  return (
    <div>
      
    </div>
  )
}

export default LostItemPage
