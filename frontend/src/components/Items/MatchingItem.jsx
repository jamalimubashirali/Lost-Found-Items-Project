// import { useGetMatches } from '@/api/items' // Custom hook for API call
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card'
// import { Skeleton } from '@/components/ui/skeleton'
// import { MatchCard } from './MatchCard'

// export function MatchingItems({ itemId }) {
//   const { data: matches, isLoading } = useGetMatches(itemId)

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Potential Matches</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {isLoading ? (
//           [...Array(3)].map((_, i) => (
//             <Skeleton key={i} className="h-[100px] w-full rounded-lg" />
//           ))
//         ) : matches?.length > 0 ? (
//           matches.map(match => (
//             <MatchCard key={match.id} match={match} />
//           ))
//         ) : (
//           <p className="text-gray-500 text-center py-4">
//             No potential matches found yet
//           </p>
//         )}
//       </CardContent>
//     </Card>
//   )
// }

import React from 'react'

const MatchingItem = () => {
  return (
    <div>
      
    </div>
  )
}

export default MatchingItem
