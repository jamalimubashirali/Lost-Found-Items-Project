import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, UploadCloud } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { ImageUpload } from '@/components/utils/ImageUpload'
import { useNavigate } from 'react-router-dom'
import { Container } from '@/components'

// Form validation schema
const formSchema = z.object({
  itemType: z.enum(['lost', 'found'], {
    required_error: "Please select an item type",
  }),
  category: z.string().min(1, "Category is required"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(3, "Location is required"),
  date: z.date({
    required_error: "Please select a date",
  }),
  image: z.instanceof(File).refine(file => file.size <= 5_000_000, "File size should be less than 5MB"),
  reward: z.string().optional(),
  contactPreference: z.enum(['chat', 'email', 'phone']),
  additionalInfo: z.string().optional(),
})

export function RegisterItemPage() {
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemType: undefined,
      name: "",
      description: "",
      location: "",
      reward: "",
      additionalInfo: "",
      contactPreference: "chat",
    }
  })

  const onSubmit = async (data) => {
    console.log("Form data:", data)
    // Here you would typically send data to your API
    try {
      // const response = await api.post('/items', data)
      navigate('/success', { state: { itemType: data.itemType } })
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  return (
    <div className="py-8">
      <Container>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Report {form.watch('itemType') === 'found' ? 'Found' : 'Lost'} Item</h1>
        <p className="text-muted-foreground">
          Help reunite items with their owners by providing accurate details
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Item Type Selection */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="itemType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Type*</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select item type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="lost">I Lost an Item</SelectItem>
                    <SelectItem value="found">I Found an Item</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category*</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="wallet">Wallet/Purse</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="keys">Keys</SelectItem>
                      <SelectItem value="id">ID Card</SelectItem>
                      <SelectItem value="jewelry">Jewelry</SelectItem>
                      <SelectItem value="bag">Bag/Backpack</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="documents">Documents</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Item Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Black Leather Wallet" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location*</FormLabel>
                  <FormControl>
                    <Input placeholder="Where was it lost/found?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description*</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Provide detailed description including brand, color, distinguishing features..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additionalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Information</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any other details that might help identify the item..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='space-y-6'>
          <FormField
            control={form.control}
            name="contactPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Contact Method*</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select contact method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="chat">In-app Chat</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone Call</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date*</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {form.watch('itemType') === 'found' ? 'Upload Item Photo*' : 'Upload Reference Photo*'}
                </FormLabel>
                <FormControl>
                  <ImageUpload
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          <div className="flex justify-center gap-4 lg:justify-end sm:justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button type="submit">
              <UploadCloud className="mr-2 h-4 w-4" />
              Submit Report
            </Button>
          </div>
        </form>
      </Form>
      </Container>
    </div>
  )
}

export default RegisterItemPage