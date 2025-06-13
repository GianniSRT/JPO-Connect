import { useState } from 'react'
import Header from './components/Header'
import CityCard from './components/CityCard'
import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm'
import Inscriptionvalide from './components/Inscriptionvalide'
import './App.css'
import Footer from './components/footer'

function App() {
  const [showSignup, setShowSignup] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [user, setUser] = useState(null)
  const [inscriptionValide, setInscriptionValide] = useState(false)
  const [campusInscrit, setCampusInscrit] = useState(null)

  // Ajoute un id_jpo à chaque ville pour l'inscription
  const cities = [
    {
      id_jpo: 1,
      name: "Martigues",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      date: "Samedi 15 juin 2025",
      address: "12 Rue des Écoles, 13500 Martigues",
      description: "Découvrez notre campus de Martigues, ses formations et son équipe passionnée.",
      link: "#martigues"
    },
    {
      id_jpo: 2,
      name: "Cannes",
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
      date: "Samedi 22 juin 2025",
      address: "8 Avenue des Fleurs, 06400 Cannes",
      description: "Visitez le campus de Cannes et échangez avec nos étudiants et formateurs.",
      link: "#cannes"
    },
    {
      id_jpo: 3,
      name: "Marseille",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
      date: "Samedi 29 juin 2025",
      address: "19 Quai de Rive Neuve, 13007 Marseille",
      description: "Participez à la JPO de Marseille et découvrez nos formations innovantes.",
      link: "#marseille"
    }
  ];

  // Fonction d'inscription à la JPO
  const inscrireAJPO = async (id_jpo) => {
    if (!user) {
      alert("Veuillez vous connecter pour vous inscrire à une JPO.");
      return;
    }
    try {
      const res = await fetch('http://localhost/JPO-Connect/JPO-Connect/backend/api/inscription.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_jpo,
          id_utilisateur: user.id
        })
      });
      const data = await res.json();
      if (data.success) {
        // Trouve le campus correspondant
        const campus = cities.find(c => c.id_jpo === id_jpo);
        setCampusInscrit(campus);
        setInscriptionValide(true);
      } else {
        alert("Erreur lors de l'inscription.");
      }
    } catch {
      alert("Erreur réseau.");
    }
  };

  if (inscriptionValide && campusInscrit) {
    return (
      <Inscriptionvalide campus={campusInscrit} onClose={() => setInscriptionValide(false)} />
    );
  }

  return (
    <>
      <Header
        onSignupClick={() => setShowSignup(true)}
        onLoginClick={() => setShowLogin(true)}
        user={user}
      />
      <div className="lp-banner">
        <div className="lp-banner-content">
          <h1>Journées Portes Ouvertes</h1>
          <p>
            Nos écoles vous ouvrent leurs portes,<br />
            rencontrez nous et discutons de votre avenir
          </p>
          <div className="lp-banner-info">
            <strong>Prochaine Journée Portes Ouvertes à Marseille :</strong><br />
            La Plateforme_ Marseille, Samedi 14 juin 2025 de 14h à 17h
          </div>
          <div className="lp-banner-btns">
            <button className="lp-banner-btn-white">Une simple question ?</button>
          </div>
        </div>
        <div className="lp-banner-img"></div>
      </div>
      <main className="lp-main">
        <h1>Bienvenue sur la plateforme JPO</h1>
        <p>
          Découvrez les Journées Portes Ouvertes de La Plateforme_ à Martigues, Cannes et Marseille.<br />
          Explorez nos campus, rencontrez nos équipes et découvrez nos formations innovantes !
        </p>
        <section className="city-cards">
          {cities.map(city => (
            <CityCard
              key={city.name}
              name={city.name}
              image={city.image}
              date={city.date}
              address={city.address}
              description={city.description}
              link={city.link}
              onInscription={() => inscrireAJPO(city.id_jpo)}
            />
          ))}
        </section>
      </main>
      {showSignup && <SignupForm onClose={() => setShowSignup(false)} />}
      {showLogin && (
        <LoginForm
          onClose={() => setShowLogin(false)}
          onLogin={setUser}
        />
      )}
      <Footer />
    </>
  )
}

export default App
