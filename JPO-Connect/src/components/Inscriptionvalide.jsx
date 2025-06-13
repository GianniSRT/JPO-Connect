import Header from './Header'
import './Inscriptionvalide.css'

function Inscriptionvalide({ campus, onClose }) {
  return (
    <>
      <Header />
      <div className="inscription-valide-container">
        <div className="inscription-valide-card">
          <h2>🎉 Merci pour votre inscription !</h2>
          <p>
            Votre participation à la Journée Portes Ouvertes de La Plateforme a bien été enregistrée.
          </p>
          <ul>
            <li>📍 <b>Lieu :</b> LaPlateforme_ – {campus.name.toUpperCase()}</li>
            <li>📅 <b>Date :</b> {campus.date}</li>
            <li>🕒 <b>Heure :</b> 15H00</li>
          </ul>
          <p>
            Un e-mail de confirmation vous a été envoyé à l'adresse que vous avez renseignée.<br />
            Vous recevrez également un rappel quelques jours avant l'événement.
          </p>
          <p>
            👉 En cas d'empêchement, vous pouvez vous désinscrire via le lien présent dans l'email.
          </p>
          <p>
            À très bientôt sur notre campus ! 👋<br />
            <br />
            L’équipe de La Plateforme
          </p>
          <button className="inscription-valide-btn" onClick={onClose}>Retour à l'accueil</button>
        </div>
      </div>
    </>
  );
}

export default Inscriptionvalide;