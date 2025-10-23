import Sidebar from '../components/Sidebar.jsx'

export default function Dashboard() {
  const containerStyle = {
    marginLeft: 240,
    padding: '2rem',
    background: '#0b0c10',
    minHeight: '100vh',
    color: '#e8eef6'
  }

  return (
    <>
      <Sidebar />
      <main style={containerStyle}>
        <div className="container-fluid">
          <h2 style={{ color: '#ffffff' }}>Bienvenido</h2>
          <p className="text-muted">Panel de inicio para socios — reservá clases según tu membresía.</p>

          <div className="row mt-4">
            <div className="col-md-4 mb-3">
              <div className="card p-3" style={{ background: '#121217', border: '1px solid rgba(255,255,255,0.03)' }}>
                <h5 style={{ color: '#ffffff' }}>Clases disponibles</h5>
                <p className="mb-0 text-muted">Ver y reservar clases.</p>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card p-3" style={{ background: '#121217', border: '1px solid rgba(255,255,255,0.03)' }}>
                <h5 style={{ color: '#ffffff' }}>Mis reservas</h5>
                <p className="mb-0 text-muted">Tus próximas clases reservadas.</p>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card p-3" style={{ background: '#121217', border: '1px solid rgba(255,255,255,0.03)' }}>
                <h5 style={{ color: '#ffffff' }}>Mi membresía</h5>
                <p className="mb-0 text-muted">Estado y vencimiento.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
