import { useState } from 'react'
import './SignupForm.css'

function SignupForm({ onClose }) {
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    mot_de_passe: '',
    adresse: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // 1. Création de l'utilisateur
      const userRes = await fetch('http://localhost/JPO-Connect/JPO-Connect/backend/api/utilisateur.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const userData = await userRes.json()
      if (!userData.success || !userData.id_utilisateur) {
        setError("Erreur lors de la création de l'utilisateur.")
        setLoading(false)
        return
      }

      // 2. Inscription à la JPO (ici id_jpo = 1 par défaut)
      const inscriptionRes = await fetch('http://localhost/JPO-Connect/JPO-Connect/backend/api/inscription.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_jpo: 1, // à adapter si tu veux laisser le choix à l'utilisateur
          id_utilisateur: userData.id_utilisateur
        })
      })
      const inscriptionData = await inscriptionRes.json()
      if (!inscriptionData.success) {
        setError("Erreur lors de l'inscription à la JPO.")
        setLoading(false)
        return
      }

      alert('Inscription réussie !')
      onClose()
    } catch (err) {
      setError("Erreur réseau ou serveur.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signup-modal">
      <div className="signup-modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Inscription</h2>
        <form onSubmit={handleSubmit}>
          <input name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required />
          <input name="prenom" placeholder="Prénom" value={form.prenom} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="mot_de_passe" type="password" placeholder="Mot de passe" value={form.mot_de_passe} onChange={handleChange} required />
          <input name="adresse" placeholder="Adresse" value={form.adresse} onChange={handleChange} />
          {error && <div style={{ color: 'red', marginBottom: '1em' }}>{error}</div>}
          <button type="submit" disabled={loading}>{loading ? "Envoi..." : "S'inscrire"}</button>
        </form>
      </div>
    </div>
  )
}

export default SignupForm