import { useState } from 'react'
import './SignupForm.css' // Réutilise le style de la modale

function LoginForm({ onClose }) {
  const [form, setForm] = useState({ email: '', mot_de_passe: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('http://localhost/JPO-Connect/JPO-Connect/backend/api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (data.success) {
        alert('Connexion réussie !')
        onClose()
        // Ici tu peux stocker l'utilisateur connecté dans le state ou localStorage
      } else {
        setError('Email ou mot de passe incorrect.')
      }
    } catch {
      setError('Erreur serveur.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signup-modal">
      <div className="signup-modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="mot_de_passe" type="password" placeholder="Mot de passe" value={form.mot_de_passe} onChange={handleChange} required />
          {error && <div style={{ color: 'red', marginBottom: '1em' }}>{error}</div>}
          <button type="submit" disabled={loading}>{loading ? "Connexion..." : "Se connecter"}</button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm