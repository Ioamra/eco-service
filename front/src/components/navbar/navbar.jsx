import React, { useState } from 'react';
import './navbar.css';
import { NavLink } from "react-router-dom";
import EcoServiceLogo from './logoEcoService.png';
import LogoPanier from './logopanier.png';
import LogoLogin from './logologin.png';
import Modal from './modal.jsx';
import { getPanier } from '../../services/commande.js';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false); 

  // const panier = getPanier();

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="navbar-container">
      <NavLink to="/">
        <img src={EcoServiceLogo} alt="Eco Service" className="Eco-service-logo" />
      </NavLink>
          <div className="search-container desktop-search">
        <input className="search-bar" type="text" placeholder="Search..."/>
      </div>
      <button className="burger-menu" onClick={toggleMenu}>☰</button>
      <div className={`menu ${showMenu ? "show" : ""}`}>
        <div className="nav-items">
          <NavLink className="nav-item" to="/nos-produits">NOS PRODUITS</NavLink>
          <NavLink className="nav-item" to="/notre-demarche">NOTRE DEMARCHE</NavLink>
          <NavLink className="nav-item" to="/nos-tutoriels">NOS TUTORIELS</NavLink>
        </div>
        <div className="search-container mobile-search">
          <input className="search-bar" type="text" placeholder="Search..."/>
        </div>
      </div>
      <div className="icon-container">
        <button onClick={handleOpenModal} className="icon-button panier">
          <img src={LogoPanier} alt="Panier" className="icon-logo" />
          <span>PANIER</span>
        </button>
        <Modal show={showModal} handleClose={handleCloseModal} />
        <NavLink to='/login'>
            <button className="icon-button connexion">
              <img src={LogoLogin} alt="Connexion" className="icon-logo" />
              <span>CONNEXION</span>
            </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
