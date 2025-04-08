import { Badge } from '@/components/ui/badge';

export function ItemHeader({ title, status, date, time, location }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        <Badge variant={status === 'lost' ? 'destructive' : 'success'}>
          {status === 'lost' ? 'Lost' : 'Found'}
        </Badge>
      </div>
      
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          {/* <CalendarIcon className="h-4 w-4" /> */}
          <span>{date} </span>
        </div>
        <div className="flex items-center gap-1">
          {/* <MapPinIcon className="h-4 w-4" /> */}
          <span>{`at ${location}`}</span>
        </div>
      </div>
    </div>
  );
}