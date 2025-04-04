import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function ProfileTabs({ activeTab, onTabChange }) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="lost">Lost Items</TabsTrigger>
        <TabsTrigger value="found">Found Items</TabsTrigger>
        <TabsTrigger value="reunited">Reunited</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}