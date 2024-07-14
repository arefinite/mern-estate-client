import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  useGetAgents,
  useGetAmenities,
  useGetBlogs,
  useGetDubaiAreas,
  useGetDubaiDevelopers,
  useGetProperties,
  useGetSubscribers,
} from '@/services/queries'
const DashboardHome = () => {
  const { data: properties } = useGetProperties()
  const { data: areas } = useGetDubaiAreas()
  const { data: developers } = useGetDubaiDevelopers()
  const { data: subscribers } = useGetSubscribers()
  const { data: agents } = useGetAgents()
  const { data: blogs } = useGetBlogs()
  const { data: amenities } = useGetAmenities()

  const countProperties = properties?.length
  const countAreas = areas?.length
  const countDevelopers = developers?.length
  const countSubscribers = subscribers?.length
  const countAgents = agents?.length
  const countBlogs = blogs?.length
  const countAmenities = amenities?.length

  const stats = [
    {
      title: 'Properties',
      description: 'Properties',
      value: countProperties,
    },
    {
      title: 'Dubai Areas',
      description: 'Number of Dubai Areas',
      value: countAreas,
    },
    {
      title: 'Dubai Developers',
      description: 'Number of Dubai Developers',
      value: countDevelopers,
    },
    {
      title: 'Subscribers',
      description: 'Number of Subscribers',
      value: countSubscribers,
    },
    {
      title: 'Agents',
      description: 'Number of Agents',
      value: countAgents,
    },

    {
      title: 'Blogs',
      description: 'Number of Blogs',
      value: countBlogs,
    },
    {
      title: 'Amenities',
      description: 'Number of Amenities',
      value: countAmenities,
    },
  ]
  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      <div className='flex items-center'>
        <h1 className='text-lg font-bold md:text-2xl'>Dashboard</h1>
      </div>
      <div
        className='flex flex-1 p-4 rounded-lg border border-dashed shadow-sm'
        x-chunk='dashboard-02-chunk-1'
      >
        <section className='grid grid-cols-2 md:grid-cols-5 gap-4 mt-8 h-fit'>
          {stats.map((stat, index) => (
            <Card className='text-center' key={index}>
              <CardHeader>
                <CardTitle>{stat.title}</CardTitle>
                <CardDescription>{stat.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <h1 className='text-4xl font-bold'>{stat.value}</h1>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </main>
  )
}

export default DashboardHome
