import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export function ContactForm({ match }) {
  const form = useForm({
    defaultValues: {
      message: `Hi, I believe you may have found my ${match.itemName}. Can we discuss this further?`
    }
  })

  const onSubmit = (data) => {
    console.log('Message sent:', data)
    // API call to send message
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Message</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="min-h-[120px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Send Message
        </Button>
      </form>
    </Form>
  )
}