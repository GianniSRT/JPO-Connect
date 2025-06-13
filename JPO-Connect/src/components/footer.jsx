import './Footer.css'
import logoPlateforme from '../assets/logos-laplateforme/logo-sans-baseline/Logo_Plateforme_Blc.svg'

function Footer() {
  return (
    <footer className="lp-footer">
      <div className="lp-logo">
        <img src={logoPlateforme} alt="Logo de la Plateforme" />
      </div>
      <nav>
        <ul>
          <li>Contact</li>
          <li>À propos</li>
          <li>Aide</li>
          <li>Mentions légales</li>
        </ul>
      </nav>
    </footer>
  )
}

export default Footer