import { useState } from 'react'
import AdminSitePath from '@/components/admin/AdminSitePath'
import { Button } from '@/components/ui/button'
import {  useGetProperties } from '@/services/queries'
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
import {  useDeleteProperty } from '@/services/mutation'
import { Input } from '@/components/ui/input'

const ManageProperties = () => {
  const [deletePropertyId, setDeletePropertyId] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { data: properties, isPending, isError } = useGetProperties()
  const { mutateAsync: deleteAmenityAsync } = useDeleteProperty()

  const handleDeleteProperty = async (id: string) => {
    await deleteAmenityAsync(id)
    toast('Amenity deleted successfully')
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const filteredProperties = properties?.filter(property =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 '>
      <div className='flex flex-col gap-4 '>
        <AdminSitePath items={false} currentPage='Manage Properties' />
        <div className='flex justify-between items-center'>
          <h1 className='text-lg font-bold md:text-2xl'>Manage Properties</h1>
          <Link to='/admin/create-property'>
            <Button size='sm'>+ Create Property</Button>
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
                        placeholder='Search properties...'
                        className='w-full appearance-none bg-background pl-8 shadow-none'
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                    </div>
                  </form>
                </div>
            {filteredProperties && filteredProperties.length > 0 ? (
              
            
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Property Agent</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead>Status</TableHead>
                      <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProperties.map(property => (
                      <TableRow key={property._id}>
                        <TableCell className='font-medium'>
                          {property.title
                            ? property.title.charAt(0).toUpperCase() +
                              property.title.slice(1)
                            : ''}
                        </TableCell>
                        <TableCell>{property.propertyType}</TableCell>
                        <TableCell>{property.propertyAgent}</TableCell>
                        <TableCell>{property.featured}</TableCell>
                        
                        <TableCell
                          className={`${
                            property.status ? 'text-green-500' : 'text-red-500'
                          }`}
                        >
                          {property.status ? <CircleCheckBig size={16}/>: <CircleSlash2 size={16}/>}
                        </TableCell>
                        <TableCell className='text-right'>
                          <div className='flex gap-6 justify-end'>
                            <Link to={`/admin/update-property/${property._id}`}>
                              <Edit size={20} color='black' />
                            </Link>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <div className='inline-block'>
                                  <Trash
                                    size={20}
                                    color='red'
                                    onClick={() =>
                                      setDeletePropertyId(property._id!)
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
                                    onClick={() => setDeletePropertyId('')}
                                  >
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleDeleteProperty(deletePropertyId)
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
              <p>{!isPending && !isError && 'No property found'}</p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default ManageProperties
