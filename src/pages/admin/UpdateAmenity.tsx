import AdminSitePath from '@/components/admin/AdminSitePath'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {  useUpdateAmenity } from '@/services/mutation'
import { toast } from 'sonner'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { AmenityType } from '@/types/types'

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'amenity must be at least 2 characters.',
  }),
  status: z.boolean().default(true),
})

const UpdateAmenity = () => {
  const navigate = useNavigate()
  const amenity = useLoaderData() as AmenityType
  const {id} = useParams()
  const {mutateAsync:updateAmenity, isPending} = useUpdateAmenity(id!)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: amenity.title,
      status: amenity.status,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateAmenity(values)
    toast('Amenity updated successfully')
    navigate('/admin/manage-amenities')
  }

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      <div className='flex flex-col gap-4'>
        <AdminSitePath
          items={true}
          prevName='Manage Amenities'
          prevLink='/admin/manage-amenities'
          currentPage='Create Amenity'
        />

        <h1 className='text-lg font-bold md:text-2xl'>Update Amenity</h1>
      </div>
      <div
        className='flex flex-1 p-4 rounded-lg border border-dashed shadow-sm'
        x-chunk='dashboard-02-chunk-1'
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amenity Title</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter title' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem className=''>
                  <div className='space-y-0.5'>
                    <FormLabel className='text-base'>Status</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type='submit' disabled={isPending}>{ isPending ? 'Updating Amenity' : 'Update Amenity'}</Button>
          </form>
        </Form>
      </div>
    </main>
  )
}
export default UpdateAmenity
