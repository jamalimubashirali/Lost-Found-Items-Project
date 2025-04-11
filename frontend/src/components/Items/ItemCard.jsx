import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export function ItemCard({ item }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image Section */}
      <div className="h-48 bg-gray-100 relative overflow-hidden">
        {item.images && item.images.length > 0 ? (
          <img
            src={`${item.images[0]}`}
            alt={item.itemName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
            No Image
          </div>
        )}
        <div className="absolute top-2 left-2">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              item.itemType === "lost"
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {item.itemType === "lost" ? "Lost" : "Found"}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">
            {item.itemName}
          </h3>
          <span className="text-sm text-muted-foreground capitalize">
            {item.category}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {item.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <CalendarDays className="h-4 w-4 mr-2" />
            {item.lostDate && format(new Date(item.lostDate), "MM dd, yyyy")}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="line-clamp-1">{item.location}</span>
          </div>
        </div>

        <Link to={`/items/${item._id}`}>
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
