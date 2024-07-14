import { useState } from 'react'
import AdminSitePath from '@/components/admin/AdminSitePath'
import { Button } from '@/components/ui/button'
import { useGetBlogs } from '@/services/queries'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {   Edit, Search, Trash } from 'lucide-react'
import { toast } from 'sonner'
import {  useDeleteBlog } from '@/services/mutation'
import { Input } from '@/components/ui/input'

const ManageBlogs = () => {

  const [deleteBlogId, setDeleteBlogId] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { data: blogs, isPending, isError } = useGetBlogs()
  const { mutateAsync: deleteBlogAsync } = useDeleteBlog()

  const handleDeleteBlog = async (id: string) => {
    await deleteBlogAsync(id)
    toast('Amenity deleted successfully')
    
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const filteredBlogs = blogs?.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 '>
      <div className='flex flex-col gap-4 '>
        <AdminSitePath items={false} currentPage='Manage Blogs' />
        <div className='flex justify-between items-center'>
          <h1 className='text-lg font-bold md:text-2xl'>Manage Blogs</h1>
          <Link to='/admin/create-Blog'>
            <Button size='sm'>+ Create Blog</Button>
          </Link>
        </div>
      </div>
      <div className='flex flex-1 p-4 rounded-lg border border-dashed shadow-sm'>
        <div className='flex-1'>
          <div>
            {isPending && <p>Loading...</p>}
            {isError && <p>Something went wrong</p>}
            <div className='w-[250px] mb-6'>
                  <form>
                    <div className='relative'>
                      <Search className='absolute left-2.5 top-3 h-4 w-4 text-muted-foreground' />
                      <Input
                        type='search'
                        placeholder='Search blogs...'
                        className='w-full appearance-none bg-background pl-8 shadow-none'
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                    </div>
                  </form>
                </div>
            {filteredBlogs && filteredBlogs.length > 0 ? (
              
            
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Published At</TableHead>
                      <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBlogs.map(blog => (
                      <TableRow key={blog._id}>
                        <TableCell className='font-medium'>
                          {blog.title
                            ? blog.title.charAt(0).toUpperCase() +
                              blog.title.slice(1)
                            : ''}
                        </TableCell>
                        <TableCell>{formatDate(blog.createdAt!)}</TableCell>
                     
                        
                        <TableCell className='text-right'>
                          <div className='flex gap-6 justify-end'>
                            <Link to={`/admin/update-blog/${blog._id}`}>
                              <Edit size={20} color='black' />
                            </Link>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <div className='inline-block'>
                                  <Trash
                                    size={20}
                                    color='red'
                                    onClick={() =>
                                      setDeleteBlogId(blog._id!)
                                    }
                                    className='cursor-pointer'
                                  />
                                </div>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you absolutely sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete the product from our
                                    server.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel
                                    onClick={() => setDeleteBlogId('')}
                                  >
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleDeleteBlog(deleteBlogId)
                                    }
                                  >
                                    Continue
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
           
            ) : (
              <p>{!isPending && !isError && 'No blog found'}</p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default ManageBlogs
