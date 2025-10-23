import Sidebar from '../components/Sidebar.jsx'
import { useState, useEffect } from 'react'

const containerStyle = { marginLeft: 240, padding: '2rem', background: '#0b0c10', minHeight: '100vh', color: '#e8eef6' }

const MOCK_CLASSES = [
  { id: 1, name: 'Yoga - Mañana', schedule: 'Lun 9:00', capacity: 12 },
  { id: 2, name: 'Crossfit', schedule: 'Mar 18:00', capacity: 10 },
  { id: 3, name: 'Zumba', schedule: 'Mie 20:00', capacity: 15 },
  { id: 4, name: 'Spinning', schedule: 'Jue 7:00', capacity: 8 }
]

export default function Clases() {
  const [clases] = useState(MOCK_CLASSES)
  const [membresia, setMembresia] = useState(null)
  const [reservas, setReservas] = useState([])

  useEffect(() => {
    setMembresia(JSON.parse(localStorage.getItem('membresia') || 'null'))
    setReservas(JSON.parse(localStorage.getItem('reservas') || '[]'))
  }, [])

  const isMembresiaActiva = () => {
    if (!membresia) return false
    if (membresia.status !== 'activa') return false
    const exp = new Date(membresia.expiry)
    return exp > new Date()
  }

  const handleReservar = (clase) => {
    if (!isMembresiaActiva()) {
      alert('Tu membresía no está activa. Ir a Pagos para regularizar.')
      return
    }
    const userEmail = localStorage.getItem('userEmail') || 'socio'
    const nuevas = [...reservas, { id: Date.now(), claseId: clase.id, name: clase.name, schedule: clase.schedule, user: userEmail }]
    setReservas(nuevas)
    localStorage.setItem('reservas', JSON.stringify(nuevas))
    alert('Reserva guardada ✅')
  }

  return (
    <>
      <Sidebar />
      <main style={containerStyle}>
        <h3 style={{ color: '#ffffff' }}>Clases disponibles</h3>
        <p className="text-muted">Seleccioná una clase y reservá tu lugar.</p>

        <div className="row mt-3">
          {clases.map(c => (
            <div className="col-md-6 mb-3" key={c.id}>
              <div className="card p-3" style={{ background: '#121217', border: '1px solid rgba(255,255,255,0.03)' }}>
                <h5 style={{ color: '#ffffff' }}>{c.name}</h5>
                <p className="mb-1 text-muted">{c.schedule}</p>
                <p className="mb-2 text-muted">Cupos: {c.capacity}</p>
                <button className="btn btn-sm btn-primary" onClick={() => handleReservar(c)}>Reservar</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
