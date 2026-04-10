// frontend/src/components/LoginPopup/LoginPopup.jsx
import React, { useState, useContext } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { api } from '../../services/api';
import { StoreContext } from '../../Context/StoreContext';

const LoginPopup = ({ setShowLogin }) => {
  const { setToken, setUser } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [formData, setFormData] = useState({
    nom: '',
    post_nom: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (currState === "Login") {
        // Connexion
        const response = await api.login({
          email: formData.email,
          password: formData.password,
        });

        if (response.status_code === 200) {
          // Stocker le token et les infos utilisateur
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          
          // Mettre à jour le contexte
          setToken(response.data.token);
          setUser(response.data.user);
          
          setShowLogin(false);
        } else {
          setError(response.status_message || 'Erreur de connexion');
        }
      } else {
        // Inscription
        const response = await api.register({
          nom: formData.nom,
          post_nom: formData.post_nom,
          email: formData.email,
          password: formData.password,
          role: 'user',
        });

        if (response.status_code === 201) {
          // Auto-connexion après inscription
          const loginResponse = await api.login({
            email: formData.email,
            password: formData.password,
          });

          if (loginResponse.status_code === 200) {
            localStorage.setItem('token', loginResponse.data.token);
            localStorage.setItem('user', JSON.stringify(loginResponse.data.user));
            
            // Mettre à jour le contexte
            setToken(loginResponse.data.token);
            setUser(loginResponse.data.user);
            
            setShowLogin(false);
          }
        } else {
          setError(response.status_message || "Erreur d'inscription");
          if (response.errors) {
            const errorMessages = Object.values(response.errors).flat();
            setError(errorMessages.join(', '));
          }
        }
      }
    } catch (err) {
      setError('Erreur de connexion au serveur. Vérifiez que le backend est démarré.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{currState === "Login" ? "Connexion" : "Inscription"}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        
        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <>
              <input 
                type="text" 
                name="nom"
                placeholder='Nom' 
                value={formData.nom}
                onChange={handleChange}
                required 
              />
              <input 
                type="text" 
                name="post_nom"
                placeholder='Post-nom' 
                value={formData.post_nom}
                onChange={handleChange}
                required 
              />
            </>
          )}
          
          <input 
            type="email" 
            name="email"
            placeholder='Email' 
            value={formData.email}
            onChange={handleChange}
            required 
          />
          
          <input 
            type="password" 
            name="password"
            placeholder='Mot de passe' 
            value={formData.password}
            onChange={handleChange}
            required 
          />
        </div>
        
        {error && <div className="error-message" style={{color: 'red', marginTop: '10px', fontSize: '14px'}}>{error}</div>}
        
        <button type="submit" disabled={loading}>
          {loading ? 'Chargement...' : (currState === "Sign Up" ? "Créer un compte" : "Se connecter")}
        </button>
        
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>En continuant, j'accepte les conditions d'utilisation et la politique de confidentialité</p>
        </div>
        
        {currState === "Login" ? (
          <p>Créer un nouveau compte ? <span onClick={() => {
            setCurrState("Sign Up");
            setError('');
            setFormData({...formData, nom: '', post_nom: ''});
          }}>Cliquez ici</span></p>
        ) : (
          <p>Déjà un compte ? <span onClick={() => {
            setCurrState("Login");
            setError('');
          }}>Connectez-vous ici</span></p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;