import loginImage from '/login-image.webp'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCreateLog } from '@/services/mutation'
import { useNavigate } from 'react-router-dom'


const AdminLogin = () => {
  const navigate = useNavigate()
  const { mutate } = useCreateLog()
  const handleLogin = () => {
    mutate()
    navigate('/admin/dashboard')
  }
  return (
    <div className="w-full lg:grid lg:grid-cols-2 h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Admin Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your credentials below to
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value='admin@admin.com'
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
               
              </div>
              <Input id="password" type="password" value='abcedf' required />
            </div>
            <Button type="submit" className="w-full" onClick={handleLogin}>
              Login
            </Button>
          
          </div>
         
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src={loginImage}
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover grayscale-0"
        />
      </div>
    </div>
  )
}


export default AdminLogin