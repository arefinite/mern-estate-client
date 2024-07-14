

import { useState } from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [user, ] = useState('arefin')
  if (!user) {
    return <Navigate to='/admin/login' />
  }
  return children
}
export default ProtectedRoute
