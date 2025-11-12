// organizar en zustand (estado gobal que va dentro de la carpeta llamada store)
// utilizar axios en vez de fetch


import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    usuario: '',
    contraseña: ''
  })
  const [error, setError] = useState('')

  const cardStyle = {
    width: 360,
    background: '#121217',
    color: '#e8eef6',
    border: '1px solid rgba(255,255,255,0.04)'
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      console.log('Enviando datos:', formData);
      
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      console.log('Status:', response.status);
      
      const data = await response.json()
      console.log('Respuesta:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Error al iniciar sesión')
      }

      // Guardar datos del usuario
      localStorage.setItem('auth', 'true')
      localStorage.setItem('usuario', JSON.stringify(data.usuario))

      // Inicializar otros datos necesarios
      if (!localStorage.getItem('membresia')) {
        const expiry = new Date()
        expiry.setDate(expiry.getDate() + 30)
        localStorage.setItem('membresia', JSON.stringify({ 
          status: 'activa', 
          expiry: expiry.toISOString() 
        }))
      }
      if (!localStorage.getItem('reservas')) {
        localStorage.setItem('reservas', JSON.stringify([]))
      }

      navigate('/dashboard')
    } catch (error) {
      console.error('Error completo:', error);
      setError('Error al iniciar sesión')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0b0c10', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card p-4" style={cardStyle}>
        <h3 className="text-center mb-3">Iniciar sesión</h3>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label className="form-label" style={{ color: '#cfd6dc' }}>Usuario</label>
          <input
            type="text"
            name="usuario"
            className="form-control mb-3"
            placeholder="Ingrese su usuario"
            value={formData.usuario}
            onChange={handleChange}
            required
          />
          <label className="form-label" style={{ color: '#cfd6dc' }}>Contraseña</label>
          <input
            type="password"
            name="contraseña"
            className="form-control mb-4"
            placeholder="********"
            value={formData.contraseña}
            onChange={handleChange}
            required
          />
          <button className="btn btn-primary w-100">Entrar</button>
        </form>
      </div>
    </div>
  )
}
