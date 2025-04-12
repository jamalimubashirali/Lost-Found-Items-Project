import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function ProfileTabs({ activeTab, onTabChange }) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="lost">Lost Items</TabsTrigger>
        <TabsTrigger value="found">Found Items</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}