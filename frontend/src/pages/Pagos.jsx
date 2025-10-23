import Sidebar from '../components/Sidebar.jsx'
import { useState, useEffect } from 'react'

const containerStyle = { marginLeft: 240, padding: '2rem', background: '#0b0c10', minHeight: '100vh', color: '#e8eef6' }

export default function Pagos() {
  const [membresia, setMembresia] = useState(null)

  useEffect(() => {
    setMembresia(JSON.parse(localStorage.getItem('membresia') || 'null'))
  }, [])

  const handlePagar = () => {
    const expiry = new Date()
    expiry.setMonth(expiry.getMonth() + 1) // +1 mes
    const nueva = { status: 'activa', expiry: expiry.toISOString() }
    localStorage.setItem('membresia', JSON.stringify(nueva))
    setMembresia(nueva)
    alert('Pago simulado OK — membresía renovada por 1 mes')
  }

  return (
    <>
      <Sidebar />
      <main style={containerStyle}>
        <h3 style={{ color: '#ffffff' }}>Pagos</h3>
        <p className="text-muted">Realizá el pago para mantener tu membresía activa.</p>

        <div className="card p-3 mt-3" style={{ background: '#121217', border: '1px solid rgba(255,255,255,0.03)' }}>
          <h5 style={{ color: '#ffffff' }}>Plan mensual</h5>
          <p className="mb-2 text-muted">Precio: (mock) — $X</p>
          <button className="btn btn-primary" onClick={handlePagar}>Pagar ahora</button>
        </div>
      </main>
    </>
  )
}
