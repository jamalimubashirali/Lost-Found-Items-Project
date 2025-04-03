import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function ProfileHeader() {
  const user = {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: '/avatars/01.png',
    joined: 'Member since June 2022',
    stats: {
      itemsReported: 12,
      itemsFound: 5,
      successRate: '92%'
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
      <Avatar className="h-24 w-24">
        <AvatarImage src={user.avatar} />
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <Badge variant="secondary">Verified</Badge>
        </div>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-sm text-gray-500 mt-1">{user.joined}</p>
        
        <div className="flex gap-4 mt-4">
          <div className="text-center">
            <p className="font-bold">{user.stats.itemsReported}</p>
            <p className="text-sm text-gray-500">Reported</p>
          </div>
          <div className="text-center">
            <p className="font-bold">{user.stats.itemsFound}</p>
            <p className="text-sm text-gray-500">Found</p>
          </div>
          <div className="text-center">
            <p className="font-bold">{user.stats.successRate}</p>
            <p className="text-sm text-gray-500">Success Rate</p>
          </div>
        </div>
      </div>
      
      <Button variant="outline">Edit Profile</Button>
    </div>
  )
}