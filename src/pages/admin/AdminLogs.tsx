import { useState } from 'react'
import AdminSitePath from '@/components/admin/AdminSitePath'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useGetAdminLogs } from '@/services/queries'

const AdminLogs = () => {

  const [searchQuery, setSearchQuery] = useState<string>('')
  const { data: logs, isPending, isError } = useGetAdminLogs()

 


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const filteredLogs = logs?.reverse().filter(log =>
    log.email.toLowerCase().includes(searchQuery.toLowerCase())
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
        <AdminSitePath items={false} currentPage='Admin Logs' />
        <div className='flex justify-between items-center'>
          <h1 className='text-lg font-bold md:text-2xl'>Admin Logs</h1>
        
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
                        placeholder='Search logs...'
                        className='w-full appearance-none bg-background pl-8 shadow-none'
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                    </div>
                  </form>
                </div>
            {filteredLogs && filteredLogs.length > 0 ? (
              
            
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Logged in time</TableHead>
                   
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.reverse().map(log => (
                      <TableRow key={log._id}>
                        <TableCell className='font-medium'>
                        {log.email}
                        </TableCell>
                        <TableCell>{formatDate(log.createdAt!)}</TableCell>
                     
                        
                        
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

export default AdminLogs
