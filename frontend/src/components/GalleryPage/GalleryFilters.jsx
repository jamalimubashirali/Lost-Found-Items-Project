import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function GalleryFilters({ 
  selectedCategory, 
  onCategoryChange, 
  searchQuery, 
  onSearchChange 
}) {
  const categories = [
    { value: 'all', label: 'All Items' },
    { value: 'wallet', label: 'Wallets' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'keys', label: 'Keys' },
    { value: 'clothing', label: 'Clothing' },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
      <Tabs 
        value={selectedCategory} 
        onValueChange={onCategoryChange}
        className="w-full md:w-auto"
      >
        <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:flex h-auto">
          {categories.map(category => (
            <TabsTrigger 
              key={category.value} 
              value={category.value}
              className="py-2 px-3 text-sm"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      
      <Input
        type="search"
        placeholder="Search items..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full md:w-64"
      />
    </div>
  );
}