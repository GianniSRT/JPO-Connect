import './Header.css'

function Header({ onSignupClick, onLoginClick, user }) {
  return (
    <header className="lp-header">
      <div className="lp-logo">La Plateforme_</div>
      <nav>
        <ul>
          <li>Accueil</li>
          <li>Martigues</li>
          <li>Cannes</li>
          <li>Marseille</li>
        </ul>
      </nav>
      <div>
        {user ? (
          <div className="user-info">
            <span className="user-icon">👤</span>
            <span className="user-email">{user.email}</span>
          </div>
        ) : (
          <>
            <button className="login-btn" onClick={onLoginClick}>Se connecter</button>
            <button className="signup-btn" onClick={onSignupClick}>Inscription</button>
          </>
        )}
      </div>
    </header>
  )
}

export default Header