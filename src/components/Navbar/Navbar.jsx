import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

const Navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState("menu");
    const { getTotalCartAmount, token, logout } = useContext(StoreContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Utilise la fonction logout du contexte
        navigate('/'); // Rediriger vers la page d'accueil
    }

    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.logo} alt="" className='logo'/></Link>
            <ul className="navbar-menu">
                <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
                <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
                <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                
                {/* Affichage conditionnel du bouton */}
                {token ? (
                    <div className="navbar-user">
                        <button onClick={handleLogout} className="logout-btn">
                            Logout
                        </button>
                    </div>
                ) : (
                    <button onClick={() => setShowLogin(true)} className="login-btn">
                        Sign in
                    </button>
                )}
            </div>
        </div>
    )
}

export default Navbar