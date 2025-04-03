import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ContactForm } from './ContactForm'

export function MatchCard({ match }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{match.itemName}</h4>
          <p className="text-sm text-gray-500">{match.location}</p>
          <div className="mt-2 flex items-center gap-2">
            <Progress value={match.confidence} className="h-2 w-[100px]" />
            <Badge variant="secondary">{match.confidence}% match</Badge>
          </div>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">Contact</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Contact Finder</DialogTitle>
            </DialogHeader>
            <ContactForm match={match} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}