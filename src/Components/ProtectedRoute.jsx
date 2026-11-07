import { Navigate } from 'react-router-dom'

function ProtectedRoute({ user, allowedRole, children }) {
  const loginPath = allowedRole === 'Admin' ? '/admin/login' : '/user/login'
  if (!user) return <Navigate replace to={loginPath} />
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate replace to={user.role === 'Admin' ? '/admin' : '/dashboard'} />
  }
  return children
}

export default ProtectedRoute
