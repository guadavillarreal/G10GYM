import Sidebar from '../components/Sidebar.jsx'
import { useState, useEffect } from 'react'

const containerStyle = { marginLeft: 240, padding: '2rem', background: '#0b0c10', minHeight: '100vh', color: '#e8eef6' }

export default function Membresia() {
  const [membresia, setMembresia] = useState(null)

  useEffect(() => {
    setMembresia(JSON.parse(localStorage.getItem('membresia') || 'null'))
  }, [])

  const statusText = () => {
    if (!membresia) return 'Sin información'
    const exp = new Date(membresia.expiry)
    const isActive = membresia.status === 'activa' && exp > new Date()
    return isActive ? `Activa (vence ${exp.toLocaleDateString()})` : `Vencida (${exp.toLocaleDateString()})`
  }

  return (
    <>
      <Sidebar />
      <main style={containerStyle}>
        <h3 style={{ color: '#ffffff' }}>Mi Membresía</h3>
        <p className="text-muted">Estado de tu membresía y fecha de vencimiento.</p>

        <div className="card p-3 mt-3" style={{ background: '#121217', border: '1px solid rgba(255,255,255,0.03)' }}>
          <h5 style={{ color: '#ffffff' }}>Estado</h5>
          <p className="mb-1">{statusText()}</p>
          <small className="text-muted">Si está vencida, por favor realizá el pago desde la sección Pagos.</small>
        </div>
      </main>
    </>
  )
}
