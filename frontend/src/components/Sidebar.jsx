import { NavLink, useNavigate } from 'react-router-dom'

const SIDEBAR_WIDTH = 240
const accent = '#00bcd4'

const styles = {
  aside: {
    width: SIDEBAR_WIDTH,
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    background: '#0e0f13',
    color: '#e8eef6',
    paddingTop: '1.25rem',
    borderRight: '1px solid rgba(255,255,255,0.04)',
    boxSizing: 'border-box'
  },
  header: {
    padding: '0 16px 18px 16px'
  },
  brand: {
    fontSize: '18px',
    fontWeight: 700,
    letterSpacing: '0.6px',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  subtitle: {
    fontSize: '12px',
    color: '#9aa3ad'
  },
  nav: {
    marginTop: '10px',
    padding: '6px 8px'
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    margin: '6px 8px',
    borderRadius: '8px',
    color: '#cdd6dd',
    textDecoration: 'none',
    fontWeight: 500
  },
  icon: {
    fontSize: '18px',
    width: '22px',
    textAlign: 'center'
  },
  bottom: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    padding: '0 12px'
  },
  btnLogout: {
    width: '100%',
    borderRadius: '8px'
  }
}

function NavItem({ to, icon, children }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        ...styles.link,
        background: isActive ? 'rgba(0,188,212,0.08)' : 'transparent',
        color: isActive ? accent : styles.link.color,
        boxShadow: 'none'
      })}
    >
      <span style={{ ...styles.icon, color: 'inherit' }}>{icon}</span>
      <span>{children}</span>
    </NavLink>
  )
}

export default function Sidebar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    // limpiar todo el localStorage 
    localStorage.clear()
    navigate('/')
  }

  return (
    <aside style={styles.aside}>
      <div style={styles.header}>
        <div style={styles.brand}>
          <span style={{ fontSize: 20 }}>🏋️</span>
          <span>GYMAPP</span>
        </div>
        <div style={styles.subtitle}>Panel socio</div>
      </div>

      <nav style={styles.nav}>
        <NavItem to="/dashboard" icon="🏠">Inicio</NavItem>
        <NavItem to="/clases" icon="🏋️">Clases</NavItem>
        <NavItem to="/reservas" icon="📅">Mis Reservas</NavItem>
        <NavItem to="/membresia" icon="💳">Mi Membresía</NavItem>
        <NavItem to="/pagos" icon="💰">Pagos</NavItem>
      </nav>

      <div style={styles.bottom}>
        <button className="btn btn-outline-light" style={styles.btnLogout} onClick={handleLogout}>
          🚪 Salir
        </button>
      </div>
    </aside>
  )
}
