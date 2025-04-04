import { useState } from 'react';
import { GalleryFilters } from '@/components/GalleryPage/GalleryFilters';
import { GalleryGrid } from '@/components/GalleryPage/GalleryGrid';
import { GalleryLightbox } from '@/components/GalleryPage/GalleryLightBox';
import { Container } from '@/components';

function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  // In a real app, this would come from an API
  const items = [
    {
      id: 1,
      title: "Black Leather Wallet",
      category: "wallet",
      image: "/wallet.jpg",
      date: "2023-05-15",
      status: "lost"
    },
    {
      id: 2,
      title: "AirPods Pro",
      category: "electronics",
      image: "/airpods.jpg",
      date: "2023-05-10",
      status: "found"
    },
    // ... more items
  ];

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Container className="py-8 min-h-screen">
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Lost & Found Gallery</h1>
        
        <GalleryFilters 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <GalleryGrid 
          items={filteredItems} 
          onItemClick={setSelectedItem}
        />
        
        {selectedItem && (
          <GalleryLightbox 
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </div>
    </Container>
  );
}

export default GalleryPage;