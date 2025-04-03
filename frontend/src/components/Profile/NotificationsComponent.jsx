import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export function NotificationsSettings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    matches: true,
    messages: true
  })

  const toggleNotification = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="email-notifications">
            Email Notifications
            <p className="text-sm text-gray-500">
              Receive important updates via email
            </p>
          </Label>
          <Switch
            id="email-notifications"
            checked={notifications.email}
            onCheckedChange={() => toggleNotification('email')}
          />
        </div>
        
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="push-notifications">
            Push Notifications
            <p className="text-sm text-gray-500">
              Get instant alerts on your device
            </p>
          </Label>
          <Switch
            id="push-notifications"
            checked={notifications.push}
            onCheckedChange={() => toggleNotification('push')}
          />
        </div>
        
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="match-notifications">
            Match Alerts
            <p className="text-sm text-gray-500">
              Notify me about potential matches
            </p>
          </Label>
          <Switch
            id="match-notifications"
            checked={notifications.matches}
            onCheckedChange={() => toggleNotification('matches')}
          />
        </div>
        
        <div className="pt-4">
          <Button>Update Preferences</Button>
        </div>
      </CardContent>
    </Card>
  )
}