import { useState } from 'react'
import AdminSitePath from '@/components/admin/AdminSitePath'
import { Button } from '@/components/ui/button'
import {  useGetSubscribers } from '@/services/queries'
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
import {  CircleCheckBig, CircleSlash2, Edit, Search, Trash } from 'lucide-react'
import { toast } from 'sonner'
import {  useDeleteSubscriber } from '@/services/mutation'
import { Input } from '@/components/ui/input'

const ManageSubscribers = () => {
  const [deleteSubscriberId, setDeleteSubscriberId] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { data: subscribers, isPending, isError } = useGetSubscribers()
  const { mutateAsync: deleteSubscriberAsync } = useDeleteSubscriber()

  const handleDeleteSubscriber = async (id: string) => {
    await deleteSubscriberAsync(id)
    toast('Subscriber deleted successfully')
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const filteredSubscribers = subscribers?.filter(subscriber =>
    subscriber.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 '>
      <div className='flex flex-col gap-4 '>
        <AdminSitePath items={false} currentPage='Manage Subscribers' />
        <div className='flex justify-between items-center'>
          <h1 className='text-lg font-bold md:text-2xl'>Manage Subscribers</h1>
          <Link to='/admin/create-subscriber'>
            <Button size='sm'>+ Create Subscriber</Button>
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
                        placeholder='Search subscribers...'
                        className='w-full appearance-none bg-background pl-8 shadow-none'
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                    </div>
                  </form>
                </div>
            {filteredSubscribers && filteredSubscribers.length > 0 ? (
              
            
                <Table className='min-w-[420px]'>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubscribers.map(subscriber => (
                      <TableRow key={subscriber._id}>
                        <TableCell className='font-medium'>
                          {subscriber.name
                            ? subscriber.name.charAt(0).toUpperCase() +
                              subscriber.name.slice(1)
                            : ''}
                        </TableCell>
                        <TableCell>{subscriber.email}</TableCell>
                        <TableCell
                          className={`${
                            subscriber.status ? 'text-green-500' : 'text-red-500'
                          }`}
                        >
                          {subscriber.status ? <CircleCheckBig size={16}/>: <CircleSlash2 size={16}/>}
                        </TableCell>
                        <TableCell className='text-right'>
                          <div className='flex gap-6 justify-end'>
                            <Link to={`/admin/update-subscriber/${subscriber._id}`}>
                              <Edit size={20} color='black' />
                            </Link>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <div className='inline-block'>
                                  <Trash
                                    size={20}
                                    color='red'
                                    onClick={() =>
                                      setDeleteSubscriberId(subscriber._id!)
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
                                    onClick={() => setDeleteSubscriberId('')}
                                  >
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleDeleteSubscriber(deleteSubscriberId)
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
              <p>{!isPending && !isError && 'No subscriber found'}</p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default ManageSubscribers
