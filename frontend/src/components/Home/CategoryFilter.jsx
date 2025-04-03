import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select'
  
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'wallet', label: 'Wallets' },
    { value: 'phone', label: 'Phones' },
    { value: 'keys', label: 'Keys' },
    { value: 'id', label: 'ID Cards' },
    { value: 'other', label: 'Others' },
  ]
  
  export function CategoryFilter({ selectedCategory, onCategoryChange }) {
    return (
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map(category => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }