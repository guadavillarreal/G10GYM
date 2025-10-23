import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Clases from './pages/Clases.jsx'
import Reservas from './pages/Reservas.jsx'
import Membresia from './pages/Membresia.jsx'
import Pagos from './pages/Pagos.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      } />

      <Route path="/clases" element={
        <ProtectedRoute><Clases /></ProtectedRoute>
      } />

      <Route path="/reservas" element={
        <ProtectedRoute><Reservas /></ProtectedRoute>
      } />

      <Route path="/membresia" element={
        <ProtectedRoute><Membresia /></ProtectedRoute>
      } />

      <Route path="/pagos" element={
        <ProtectedRoute><Pagos /></ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
