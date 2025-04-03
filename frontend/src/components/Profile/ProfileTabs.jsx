import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function ProfileTabs({ activeTab, setActiveTab }) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="reports">My Reports</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}