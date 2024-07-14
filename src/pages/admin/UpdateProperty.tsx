/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { PropertyType } from '@/types/types'
import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useUpdateProperty } from '@/services/mutation'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from '@/components/ui/select'

const formSchema = z.object({
  type: z.string().min(2, { message: 'Type is required.' }),
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  propertyType: z.string().min(2, { message: 'Property Type is required.' }),
  googleMap: z.string().url({ message: 'Invalid URL.' }),
  price: z.coerce.number().positive({ message: 'Price must be positive.' }),
  beds: z.coerce.number().positive({ message: 'Beds must be positive.' }),
  baths: z.coerce.number().positive({ message: 'Baths must be positive.' }),
  size: z.coerce.number().positive({ message: 'Size must be positive.' }),
  furnishedType: z.string().min(2, { message: 'Furnished Type is required.' }),
  propertyAgent: z.string().min(2, { message: 'Property Agent is required.' }),
  bannerImage: z.instanceof(File).nullable(),
  thumbnailImages: z.instanceof(File).array().nullable(),
  videoUrl: z.string().url({ message: 'Invalid URL.' }),
  featured: z.string().min(2, { message: 'Featured is required.' }),
  status: z.boolean(),
  meta: z.string().min(5, { message: 'Meta must be at least 5 characters.' }),
  description: z.string(),
})

const UpdateProperty = () => {
  const navigate = useNavigate()
  const property = useLoaderData() as PropertyType
  const { id } = useParams()
  const { mutateAsync: updateProperty, isPending } = useUpdateProperty(id!)

  const [bannerImageFile, setBannerImageFile] = useState<File | null>(null)
  const [bannerImagePreview, setBannerImagePreview] = useState<string | null>(
    (property.bannerImage as string) ?? null
  )
  const [thumbnailImagesFiles, setThumbnailImagesFiles] = useState<File[]>([])
  const [thumbnailImagesPreviews, setThumbnailImagesPreviews] = useState<
    string[]
  >((property.thumbnailImages as string[]) ?? [])

  const [description, setDescription] = useState<string>(property.description)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: property.type,
      title: property.title,
      propertyType: property.propertyType,
      googleMap: property.googleMap,
      price: property.price,
      beds: property.beds,
      baths: property.baths,
      size: property.size,
      furnishedType: property.furnishedType,
      propertyAgent: property.propertyAgent,
      bannerImage: null,
      thumbnailImages: [],
      videoUrl: property.videoUrl,
      featured: property.featured,
      status: property.status,
      meta: property.meta,
      description: property.description,
    },
  })

  const handleBannerImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null
    setBannerImageFile(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setBannerImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setBannerImagePreview((property.bannerImage as string) ?? null)
    }
  }

  const handleThumbnailImagesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files ? Array.from(event.target.files) : []
    setThumbnailImagesFiles(files)
    const previews = files.map(file => URL.createObjectURL(file))
    setThumbnailImagesPreviews(previews)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData()
    formData.append('type', values.type)
    formData.append('title', values.title)
    formData.append('propertyType', values.propertyType)
    formData.append('googleMap', values.googleMap)
    formData.append('price', values.price.toString())
    formData.append('beds', values.beds.toString())
    formData.append('baths', values.baths.toString())
    formData.append('size', values.size.toString())
    formData.append('furnishedType', values.furnishedType)
    formData.append('propertyAgent', values.propertyAgent)
    if (bannerImageFile) {
      formData.append('bannerImage', bannerImageFile)
    }
    thumbnailImagesFiles.forEach(file => {
      formData.append('thumbnailImages', file)
    })
    formData.append('videoUrl', values.videoUrl)
    formData.append('featured', values.featured)
    formData.append('status', values.status.toString())
    formData.append('meta', values.meta)
    formData.append('description', description)

    await updateProperty(formData)

    toast('Property updated successfully')
    navigate('/admin/manage-properties')
  }

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      <div className='flex flex-col gap-4'>
        <AdminSitePath
          items={true}
          prevName='Manage Properties'
          prevLink='/admin/manage-properties'
          currentPage='Update Property'
        />
        <h1 className='text-lg font-bold md:text-2xl'>Update Property</h1>
      </div>
      <div
        className='flex flex-1 p-4 rounded-lg border border-dashed shadow-sm'
        x-chunk='dashboard-02-chunk-1'
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-2 gap-10 w-full'>
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select type' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='sale'>Sale</SelectItem>
                          <SelectItem value='rent'>Rent</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name='propertyType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select property type' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='apartment'>Apartment</SelectItem>
                          <SelectItem value='house'>House</SelectItem>
                          <SelectItem value='villa'>Villa</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='googleMap'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Google Map</FormLabel>
                    <FormControl>
                      <Input
                        type='url'
                        placeholder='Enter Google Map URL'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Enter price'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='beds'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Beds</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Enter beds'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='baths'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Baths</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Enter baths'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='size'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Enter size'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='furnishedType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Furnished Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select furnished type' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='furnished'>Furnished</SelectItem>
                          <SelectItem value='unfurnished'>
                            Unfurnished
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='propertyAgent'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Agent</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter property agent' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='videoUrl'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video URL</FormLabel>
                    <FormControl>
                      <Input
                        type='url'
                        placeholder='Enter video URL'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='featured'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Featured</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select featured' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='Home'>Home</SelectItem>
                          <SelectItem value='None'>None</SelectItem>
                        </SelectContent>
                      </Select>
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
                name='meta'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta (SEO Description)</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter meta' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            
              <FormField
                control={form.control}
                name='bannerImage'
                render={() => (
                  <FormItem>
                    <FormLabel>Banner Image</FormLabel>
                    <FormControl>
                      <Input type='file' onChange={handleBannerImageChange} />
                    </FormControl>
                    {bannerImagePreview && (
                      <img
                        src={bannerImagePreview}
                        alt='Banner Preview'
                        className='mt-2 h-32 w-32 object-cover'
                      />
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='thumbnailImages'
                render={() => (
                  <FormItem>
                    <FormLabel>Thumbnail Images</FormLabel>
                    <FormControl>
                      <Input
                        type='file'
                        multiple
                        onChange={handleThumbnailImagesChange}
                      />
                    </FormControl>
                    {thumbnailImagesPreviews.length > 0 && (
                      <div className='mt-2 flex gap-2'>
                        {thumbnailImagesPreviews.map((preview, index) => (
                          <img
                            key={index}
                            src={preview}
                            alt={`Thumbnail ${index + 1}`}
                            className='h-16 w-16 object-cover'
                          />
                        ))}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='my-6'>
            <FormField
                control={form.control}
                name='description'
                render={() => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <ReactQuill
                        value={description}
                        onChange={setDescription}
                        className='lg:w-[800px] h-64 pb-12 lg:pb-8 mb-8'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
           </div>
            <Button type='submit' disabled={isPending}>
              Update Property
            </Button>
          </form>
        </Form>
      </div>
    </main>
  )
}

export default UpdateProperty
