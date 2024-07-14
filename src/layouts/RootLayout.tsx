import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='flex h-screen w-screen justify-center items-center'>
      <Button asChild><Link to='/admin/login'>Go to Admin</Link></Button>
    </div>
  )
}
export default RootLayout
