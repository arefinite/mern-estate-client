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
import { useUpdateAgent } from '@/services/mutation'
import { toast } from 'sonner'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { AgentType } from '@/types/types'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  status: z.boolean().default(true),
  image: z.instanceof(File).nullable(),
  phone: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 digits.' }),
  biography: z.string().optional(),
  designation: z.string().optional(),
  languages: z.string().optional(),
})

const UpdateAgent = () => {
  const navigate = useNavigate()
  const agent = useLoaderData() as AgentType
  const { id } = useParams()
  const { mutateAsync: updateAgentAsync, isPending } = useUpdateAgent(id!)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null | File>(
    agent.image ?? null
  )
  const [imageError, setImageError] = useState<string>('')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: agent.email,
      name: agent.name,
      status: agent.status,
      image: null,
      phone: agent.phone,
      biography: agent.biography || '',
      designation: agent.designation || '',
      languages: agent.languages || '',
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
      setImagePreview(agent.image ?? null)
      setImageError('')
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData()
    formData.append('email', values.email)
    formData.append('name', values.name)
    formData.append('status', values.status.toString())
    if (imageFile) {
      formData.append('image', imageFile)
    }
    formData.append('phone', values.phone)
    if (values.biography) formData.append('biography', values.biography)
    if (values.designation) formData.append('designation', values.designation)
    if (values.languages) formData.append('languages', values.languages)

    await updateAgentAsync(formData)

    toast('Agent updated successfully')
    navigate('/admin/manage-agents')
  }

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      <div className='flex flex-col gap-4'>
        <AdminSitePath
          items={true}
          prevName='Manage Agents'
          prevLink='/admin/manage-agents'
          currentPage='Update Agent'
        />

        <h1 className='text-lg font-bold md:text-2xl'>Update Agent</h1>
      </div>
      <div
        className='flex flex-1 p-4 rounded-lg border border-dashed shadow-sm'
        x-chunk='dashboard-02-chunk-1'
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter email' {...field} />
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
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter phone number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='biography'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biography</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Enter biography' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='designation'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Designation</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter designation' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='languages'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Languages</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter languages (comma separated)'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' disabled={isPending}>
              {isPending ? 'Updating Agent...' : 'Update Agent'}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  )
}

export default UpdateAgent
