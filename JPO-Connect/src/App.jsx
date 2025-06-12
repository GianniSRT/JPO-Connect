import { useState } from 'react'
import Header from './components/Header'
import CityCard from './components/CityCard'
import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm'
import './App.css'
import Footer from './components/footer'

function App() {
  const [showSignup, setShowSignup] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [user, setUser] = useState(null) // état pour l'utilisateur connecté

  const cities = [
    {
      name: "Martigues",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      date: "Samedi 15 juin 2025",
      address: "12 Rue des Écoles, 13500 Martigues",
      description: "Découvrez notre campus de Martigues, ses formations et son équipe passionnée.",
      link: "#martigues"
    },
    {
      name: "Cannes",
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
      date: "Samedi 22 juin 2025",
      address: "8 Avenue des Fleurs, 06400 Cannes",
      description: "Visitez le campus de Cannes et échangez avec nos étudiants et formateurs.",
      link: "#cannes"
    },
    {
      name: "Marseille",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
      date: "Samedi 29 juin 2025",
      address: "19 Quai de Rive Neuve, 13007 Marseille",
      description: "Participez à la JPO de Marseille et découvrez nos formations innovantes.",
      link: "#marseille"
    }
  ];

  return (
    <>
      <Header
        onSignupClick={() => setShowSignup(true)}
        onLoginClick={() => setShowLogin(true)}
        user={user}
      />
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
            />
          ))}
        </section>
      </main>
      {showSignup && <SignupForm onClose={() => setShowSignup(false)} />}
      {showLogin && (
        <LoginForm
          onClose={() => setShowLogin(false)}
          onLogin={setUser} // <-- AJOUTE ou VÉRIFIE cette ligne !
        />
      )}
      <Footer />
    </>
  )
}

export default App
