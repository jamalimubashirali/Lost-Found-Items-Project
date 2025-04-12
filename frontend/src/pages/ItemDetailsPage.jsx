import { useParams } from "react-router-dom";
import { ItemHeader } from "@/components/Items/ItemHeader";
import { ItemGallery } from "@/components/Items/ItemGallery";
import { ItemDescription } from "@/components/Items/ItemDescription";
import { ItemContact } from "@/components/Items/ItemContact";
import { SimilarItems } from "@/components/Items/SimilarItems";
import { MatchingItems } from "@/components/Items/MatchingItem";
import { Container } from "@/components";
import { useEffect, useState } from "react";
import itemsService from "@/services/items.services";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelector } from "react-redux";

function ItemDetailsPage() {
  const { itemId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState({});
  const currentUserId = useSelector((state) => state.user.userData._id);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await itemsService.getItem(itemId);
        setItem(response.item);
      } catch (error) {
        console.error("Error fetching item details:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [itemId]);

  if (isLoading) {
    return (
      <Container className="py-8 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Loading State */}
          <div className="lg:col-span-2 space-y-8">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>

          {/* Right Column - Loading State */}
          <div className="space-y-8">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <ItemHeader
            title={item.itemName}
            status={item.itemType}
            date={item.lostDate?.split("T")[0]}
            time={item.time}
            location={item.location}
          />

          {item.images && item.images.length > 0 ? (
            <ItemGallery images={item.images} />
          ) : (
            <></>
          )}

          <ItemDescription description={item.description} />

          <MatchingItems
            itemId = {item._id} 
          />
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {item.userId._id !== currentUserId && (
            <ItemContact user={item.userId} itemId={item._id} />
          )}

          <SimilarItems category={item.category} currentItemId={item._id} />
        </div>
      </div>
    </Container>
  );
}

export default ItemDetailsPage;
