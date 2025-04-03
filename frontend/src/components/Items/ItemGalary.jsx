import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

export function ItemGallery() {
  return (
    <Carousel className="w-full rounded-lg overflow-hidden">
      <CarouselContent>
        {[...Array(3)].map((_, i) => (
          <CarouselItem key={i}>
            <img
              src="/placeholder-item.jpg"
              alt="Item"
              className="w-full h-96 object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}