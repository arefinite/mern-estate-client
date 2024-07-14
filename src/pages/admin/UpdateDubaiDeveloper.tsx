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
import { useUpdateDubaiDeveloper } from '@/services/mutation'
import { toast } from 'sonner'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { DubaiDeveloperType } from '@/types/types'
import { useState } from 'react'

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Dubai Developer title must be at least 2 characters.',
  }),
  status: z.boolean().default(true),
  image: z.instanceof(File).nullable(),
})

const UpdateDubaiDeveloper = () => {
  const navigate = useNavigate()
  const developer = useLoaderData() as DubaiDeveloperType
  const { id } = useParams()
  const { mutateAsync: updateDubaiDeveloper, isPending } =
    useUpdateDubaiDeveloper(id!)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null | File>(
    developer.image ?? null
  )
  const [imageError, setImageError] = useState<string>('')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: developer.title,
      status: developer.status,
      image: null,
    },
  })

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setImageFile(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      setImageError('')
    } else {
      setImagePreview(developer.image ?? null)
      setImageError('')
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('status', values.status.toString())
    if (imageFile) {
      formData.append('image', imageFile)
    }
    await updateDubaiDeveloper(formData)

    toast('Dubai Developer updated successfully')
    navigate('/admin/manage-dubai-developers')
  }

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      <div className='flex flex-col gap-4'>
        <AdminSitePath
          items={true}
          prevName='Manage Dubai Developers'
          prevLink='/admin/manage-dubai-developers'
          currentPage='Update Dubai Developer'
        />

        <h1 className='text-lg font-bold md:text-2xl'>
          Update Dubai Developer
        </h1>
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
                  <FormLabel>Dubai Developer Title</FormLabel>
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
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Image (JPG, JPEG, PNG recommended. Max 10MB is allowed)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='file'
                      accept='image/*'
                      onChange={e => {
                        handleImageChange(e)
                        field.onChange(e.target.files?.[0] || null)
                      }}
                    />
                  </FormControl>
                  {imagePreview && (
                    <div className='mt-4'>
                      <img
                        src={imagePreview as string}
                        alt='Image Preview'
                        className='h-32 w-32 object-cover border rounded-lg shadow-sm'
                      />
                    </div>
                  )}
                  {imageError && <FormMessage>{imageError}</FormMessage>}
                </FormItem>
              )}
            />
            <Button type='submit' disabled={isPending}>
              {isPending
                ? 'Updating Dubai Developer...'
                : 'Update Dubai Developer'}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  )
}

export default UpdateDubaiDeveloper
