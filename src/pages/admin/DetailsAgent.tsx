import AdminSitePath from '@/components/admin/AdminSitePath'
import { AgentType } from '@/types/types' // Replace with your actual path to AgentType
import { useLoaderData } from 'react-router-dom'

const DetailsAgent = () => {
  const agent = useLoaderData() as AgentType
  console.log(agent)

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      <div className='flex flex-col gap-4'>
        <AdminSitePath
          items={true}
          prevName='Manage Agents'
          prevLink='/admin/manage-agents'
          currentPage='Agent Details'
        />

        <h1 className='text-lg font-bold md:text-2xl'>Agent Details</h1>
      </div>
      <div
        className='flex flex-col gap-2 flex-1 p-4 rounded-lg border border-dashed shadow-sm'
        x-chunk='dashboard-02-chunk-1'
      >
        <div className='flex gap-6'>
          <img
            src={agent.image as string}
            alt={agent.name}
            className='h-24 w-24 rounded-full object-contain'
          />
          <div className='flex flex-col gap-3'>
            <div>
              <p className='font-bold'>Name</p>
              <p>{agent.name}</p>
            </div>
            <div>
              <p className='font-bold'>Email</p>
              <p>{agent.email}</p>
            </div>
            <div>
              <p className='font-bold'>Status</p>
              <p>{agent.status ? 'Enabled' : 'Disabled'}</p>
            </div>
            <div>
              <p className='font-bold'>Phone</p>
              <p>{agent.phone}</p>
            </div>

            <div>
              <p className='font-bold'>Designation</p>
              <p>{agent.designation}</p>
            </div>
            <div>
              <p className='font-bold'>Languages</p>
              <p>{agent.languages}</p>
            </div>
            <div>
              <p className='font-bold'>Biography</p>
              <p>{agent.biography}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default DetailsAgent
