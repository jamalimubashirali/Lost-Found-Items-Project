import { ItemCard } from './ItemCard';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { useEffect , useState } from 'react';
import matchesService from '@/services/matches.services';

export function MatchingItems({ itemId }) {
  const [matchingItems, setMatchingItems] = useState([]);
  const handleClaimMatch = async (foundItemId) => {
    try {
      alert(`Match claimed! The owner of item ${foundItemId} will be notified.`);
    } catch (error) {
      console.error('Error claiming match:', error);
    }
  };

  useEffect(() => {
    (
      async () => {
        try {
          const response = await matchesService.getMatches(itemId);
          if(response?.message === "No matches found for this item"){
            const response = await matchesService.createMatches(itemId);
            if(response?.matches?.length > 0){
              setMatchingItems(response.matches);
              console.log("Matches created successfully:", response.matches);
            }
          } 
          else {
            setMatchingItems(response.matches);
          }
        } catch (error) {
          console.log("Error fetching matches:", error);
        }
      }
    )();
  } , [itemId]);

  return (
    <div className="mt-8">
      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertTitle>Potential Matches Found!</AlertTitle>
        <AlertDescription>
          We found {matchingItems?.length} items that might match your lost item.
        </AlertDescription>
      </Alert>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {matchingItems.map((item) => (
          <div key={item._id} className="relative">
            <ItemCard item={item} />
            {/* {item?.userId !== userId && (
              <Button 
                size="sm" 
                className="mt-2 w-full"
                onClick={() => handleClaimMatch(item._id)}
              >
                This Might Be Mine
              </Button>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
}