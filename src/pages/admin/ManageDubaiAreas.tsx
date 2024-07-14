import { useState } from 'react'
import AdminSitePath from '@/components/admin/AdminSitePath'
import { Button } from '@/components/ui/button'
import { useGetDubaiAreas } from '@/services/queries'
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
import { CircleCheckBig, CircleSlash2, Edit, Search, Trash } from 'lucide-react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { useDeleteDubaiArea } from '@/services/mutation'

const ManageDubaiAreas = () => {
  const [deleteDubaiAreaId, setDeleteDubaiAreaId] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { data: dubaiAreas, isPending, isError } = useGetDubaiAreas()
  const { mutateAsync: deleteDubaiAreaAsync } = useDeleteDubaiArea()

  const handleDeleteDubaiArea = async (id: string) => {
    await deleteDubaiAreaAsync(id)
    toast('Dubai area deleted successfully')
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const filteredDubaiAreas = dubaiAreas?.filter(dubaiArea =>
    dubaiArea.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 '>
      <div className='flex flex-col gap-4 '>
        <AdminSitePath items={false} currentPage='Manage Dubai Areas' />
        <div className='flex justify-between items-center'>
          <h1 className='text-lg font-bold md:text-2xl'>Manage Dubai Areas</h1>
          <Link to='/admin/create-dubai-area'>
            <Button size='sm'>+ Create Dubai Area</Button>
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
                    placeholder='Search dubai areas...'
                    className='w-full appearance-none bg-background pl-8 shadow-none'
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
              </form>
            </div>
            {filteredDubaiAreas && filteredDubaiAreas.length > 0 ? (
              <Table className='min-w-[420px]'>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className='text-right'>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDubaiAreas.map(dubaiArea => (
                    <TableRow key={dubaiArea._id}>
                      <TableCell className='font-medium'>
                        {dubaiArea.title
                          ? dubaiArea.title.charAt(0).toUpperCase() +
                            dubaiArea.title.slice(1)
                          : ''}
                      </TableCell>
                      <TableCell
                        className={`${
                          dubaiArea.status ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        {dubaiArea.status ? (
                          <CircleCheckBig size={16} />
                        ) : (
                          <CircleSlash2 size={16} />
                        )}
                      </TableCell>
                      <TableCell className='text-right'>
                        <div className='flex gap-6 justify-end'>
                          <Link
                            to={`/admin/update-dubai-area/${dubaiArea._id}`}
                          >
                            <Edit size={20} color='black' />
                          </Link>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <div className='inline-block'>
                                <Trash
                                  size={20}
                                  color='red'
                                  onClick={() =>
                                    setDeleteDubaiAreaId(dubaiArea._id!)
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
                                  onClick={() => setDeleteDubaiAreaId('')}
                                >
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleDeleteDubaiArea(deleteDubaiAreaId)
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
              <p>{!isPending && !isError && 'No dubai area found'}</p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default ManageDubaiAreas
