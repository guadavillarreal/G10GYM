import Sidebar from '../components/Sidebar.jsx'
import { useState, useEffect } from 'react'

const containerStyle = { marginLeft: 240, padding: '2rem', background: '#0b0c10', minHeight: '100vh', color: '#e8eef6' }

export default function Reservas() {
  const [reservas, setReservas] = useState([])

  useEffect(() => {
    setReservas(JSON.parse(localStorage.getItem('reservas') || '[]'))
  }, [])

  const handleCancelar = (id) => {
    const nuevas = reservas.filter(r => r.id !== id)
    setReservas(nuevas)
    localStorage.setItem('reservas', JSON.stringify(nuevas))
  }

  return (
    <>
      <Sidebar />
      <main style={containerStyle}>
        <h3 style={{ color: '#ffffff' }}>Mis Reservas</h3>
        <p className="text-muted">Tus próximas clases reservadas.</p>

        {reservas.length === 0 ? (
          <div className="card p-3 mt-3" style={{ background: '#121217', border: '1px solid rgba(255,255,255,0.03)' }}>
            <p className="mb-0 text-muted">No tenés reservas activas.</p>
          </div>
        ) : (
          <div className="list-group mt-3">
            {reservas.map(r => (
              <div key={r.id} className="list-group-item" style={{ background: '#121217', color: '#e8eef6', border: '1px solid rgba(255,255,255,0.03)' }}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong style={{ color: '#ffffff' }}>{r.name}</strong>
                    <div className="text-muted">{r.schedule}</div>
                    <div className="text-muted small">Reservado por: {r.user}</div>
                  </div>
                  <div>
                    <button className="btn btn-sm btn-outline-light" onClick={() => handleCancelar(r.id)}>Cancelar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  )
}
