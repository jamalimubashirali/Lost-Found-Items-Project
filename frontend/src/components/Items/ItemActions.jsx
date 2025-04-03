import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreVertical, Edit, Trash2, Share2, Flag } from 'lucide-react'

export function ItemActions({ item }) {
  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <Button className="w-full" variant="default">
          Mark as Found
        </Button>
        
        <div className="flex space-x-2">
          <Button variant="outline" className="flex-1">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Flag className="mr-2 h-4 w-4" />
                Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}