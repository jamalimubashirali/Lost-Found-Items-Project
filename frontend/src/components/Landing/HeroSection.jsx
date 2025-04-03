import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Container } from "@/components";

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary/5 to-secondary/5">
      <Container>
      <div className="grid items-center gap-6 px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Reconnect Lost Items <br />
            <span className="text-primary">With Their Owners</span>
          </h1>
          <p className="text-gray-500 md:text-xl">
            Our platform helps you find lost belongings or return found items to their rightful owners.
          </p>
        </div>
        
        <div className="mx-auto w-full max-w-md space-y-2">
          <div className="flex space-x-2">
            <Input 
              className="flex-1" 
              placeholder="Search for items (e.g. 'black wallet')" 
            />
            <Button type="submit">Search</Button>
          </div>
          <p className="text-xs text-gray-500 text-center">
            Try: "iphone", "keys", "student ID"
          </p>
        </div>
      </div>
      </Container>
    </section>
  )
}