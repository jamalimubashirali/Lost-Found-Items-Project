import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export function ItemGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <Dialog>
        <DialogTrigger>
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden cursor-zoom-in">
            <img 
              src={images[selectedImage]} 
              alt="Main item view"
              className="w-full h-full object-cover"
            />
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-4xl p-0">
          <img 
            src={images[selectedImage]} 
            alt="Main item view"
            className="w-full h-full object-contain max-h-[80vh]"
          />
        </DialogContent>
      </Dialog>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden ${selectedImage === index ? 'ring-2 ring-primary' : ''}`}
          >
            <img 
              src={image} 
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}