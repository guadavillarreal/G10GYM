import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem('auth') === 'true'
  if (!isAuth) return <Navigate to="/" replace />
  return children
}
