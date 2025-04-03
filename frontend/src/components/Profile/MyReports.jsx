import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table'
  import { Badge } from '@/components/ui/badge'
  import { Button } from '@/components/ui/button'
  
  const reports = [
    {
      id: '1',
      item: 'Black Wallet',
      type: 'lost',
      date: '2023-10-15',
      status: 'active',
      matches: 3
    },
    {
      id: '2',
      item: 'iPhone 13',
      type: 'found',
      date: '2023-10-10',
      status: 'resolved',
      matches: 0
    },
    // ... more reports
  ]
  
  export function MyReports() {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Matches</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.item}</TableCell>
                <TableCell>
                  <Badge variant={report.type === 'lost' ? 'destructive' : 'default'}>
                    {report.type}
                  </Badge>
                </TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>
                  <Badge variant={report.status === 'active' ? 'default' : 'secondary'}>
                    {report.status}
                  </Badge>
                </TableCell>
                <TableCell>{report.matches}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }