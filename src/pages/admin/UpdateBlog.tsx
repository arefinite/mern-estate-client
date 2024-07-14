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
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useUpdateBlog } from '@/services/mutation'
import { BlogType } from '@/types/types'

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

const UpdateBlog = () => {
  const navigate = useNavigate()
  const blog = useLoaderData() as BlogType
  const { id } = useParams()
  const { mutateAsync: updateBlogSync, isPending: isUpdating } = useUpdateBlog(
    id!
  )

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
    if (blog) {
      form.setValue('title', blog.title)
      form.setValue('meta', blog.meta)
      setDescription(blog.description)
      setImagePreview(blog.image as string)
    }
  }, [blog, form])

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
    } else if (blog && blog.image) {
      formData.append('existingImage', blog.image)
    }
    formData.append('description', description)

    await updateBlogSync(formData)
    toast('Blog updated successfully')
    navigate('/admin/manage-blogs')
  }

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      <div className='flex flex-col gap-4'>
        <AdminSitePath items={false} currentPage='Update Blog' />
        <h1 className='text-lg font-bold md:text-2xl'>Update Blog</h1>
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
            <Button type='submit' disabled={isUpdating}>
              {isUpdating ? 'Updating Blog...' : 'Update Blog'}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  )
}

export default UpdateBlog
