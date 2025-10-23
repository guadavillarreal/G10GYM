import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const cardStyle = {
    width: 360,
    background: '#121217',
    color: '#e8eef6',
    border: '1px solid rgba(255,255,255,0.04)'
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      alert('Completá email y contraseña.')
      return
    }

    // mock: autenticación simple
    localStorage.setItem('auth', 'true')
    localStorage.setItem('userEmail', email)

    if (!localStorage.getItem('membresia')) {
      const expiry = new Date(); expiry.setDate(expiry.getDate() + 30)
      localStorage.setItem('membresia', JSON.stringify({ status: 'activa', expiry: expiry.toISOString() }))
    }
    if (!localStorage.getItem('reservas')) {
      localStorage.setItem('reservas', JSON.stringify([]))
    }

    navigate('/dashboard')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0b0c10', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card p-4" style={cardStyle}>
        <h3 className="text-center mb-3">Iniciar sesión</h3>
        <form onSubmit={handleSubmit}>
          <label className="form-label" style={{ color: '#cfd6dc' }}>Correo</label>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="socio@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="form-label" style={{ color: '#cfd6dc' }}>Contraseña</label>
          <input
            type="password"
            className="form-control mb-4"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="btn btn-primary w-100">Entrar</button>
        </form>
      </div>
    </div>
  )
}
