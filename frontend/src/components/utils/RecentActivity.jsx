import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table'
  import { Badge } from '@/components/ui/badge'
  
  const activities = [
    { id: '1', item: 'Wallet', type: 'lost', date: '2023-11-15', status: 'active' },
    { id: '2', item: 'Phone', type: 'found', date: '2023-11-10', status: 'matched' }
  ]
  
  export function RecentActivity() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{activity.item}</TableCell>
                  <TableCell>
                    <Badge variant={activity.type === 'lost' ? 'destructive' : 'default'}>
                      {activity.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{activity.date}</TableCell>
                  <TableCell>
                    <Badge variant={activity.status === 'active' ? 'default' : 'secondary'}>
                      {activity.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }