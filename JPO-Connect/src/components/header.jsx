import './Header.css'

function Header({ onSignupClick }) {
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
      <button className="signup-btn" onClick={onSignupClick}>Inscription</button>
    </header>
  )
}

export default Header