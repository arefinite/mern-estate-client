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
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {
  useCreatePageGuideOnRenting,
  useUpdatePageGuideOnRenting,
} from '@/services/mutation'
import { useGetPageGuideOnRenting } from '@/services/queries'

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  meta: z.string().min(5, {
    message: 'Meta must be at least 5 characters.',
  }),
  image: z.instanceof(File).nullable(),
  description: z.string(),
})

const PageGuideOnRenting = () => {
  const navigate = useNavigate()
  const { data: page } = useGetPageGuideOnRenting()
  const { mutateAsync: createPageSync, isPending: isCreating } =
    useCreatePageGuideOnRenting()
  const { mutateAsync: updatePageSync, isPending: isUpdating } =
    useUpdatePageGuideOnRenting()

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [description, setDescription] = useState<string>('')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      meta: '',
      image: null,
      description: '',
    },
  })

  useEffect(() => {
    if (page) {
      form.setValue('title', page.title)
      form.setValue('meta', page.meta)
      setDescription(page.description)
      setImagePreview(page.image)
    }
  }, [page, form])

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setImageFile(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setImagePreview(null)
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('meta', values.meta)
    if (imageFile) {
      formData.append('image', imageFile)
    } else if (page && page.image) {
      formData.append('existingImage', page.image)
    }
    formData.append('description', description)

    if (page) {
      await updatePageSync(formData)
      toast('Page updated successfully')
    } else {
      await createPageSync(formData)
      toast('Page created successfully')
    }
    navigate('.', { replace: true })
  }

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      <div className='flex flex-col gap-4'>
        <AdminSitePath
          items={false}
          currentPage={page ? 'Edit Page' : 'Create Page'}
        />
        <h1 className='text-lg font-bold md:text-2xl'>
          {page ? 'Edit Guide on Renting Page' : 'Add Guide on Renting Page'}
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
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter title' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='meta'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta (SEO Description)</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter meta description' {...field} />
                  </FormControl>
                  <FormMessage />
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
                        src={imagePreview}
                        alt='Image Preview'
                        className='h-32 w-32 object-cover border rounded-lg shadow-sm'
                      />
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <ReactQuill
                      value={description}
                      onChange={value => {
                        setDescription(value)
                        field.onChange(value)
                      }}
                      theme='snow'
                      className='lg:w-[800px] h-64 pb-12 lg:pb-8 mb-8'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' disabled={isCreating || isUpdating}>
              {isCreating || isUpdating
                ? page
                  ? 'Updating Page...'
                  : 'Creating Page...'
                : page
                ? 'Update Page'
                : 'Create Page'}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  )
}

export default PageGuideOnRenting
