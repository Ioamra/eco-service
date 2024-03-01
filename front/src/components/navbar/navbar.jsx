import React, { useEffect, useState } from 'react';
import './navbar.css';
import { NavLink } from "react-router-dom";
import EcoServiceLogo from './logoEcoService.png';
import LogoPanier from './logopanier.png';
import LogoLogin from './logologin.png';
import LogoUser from './logoUser.png';
import Modal from './modal.jsx';
import axios from "axios";
import { getPanier } from '../../services/commande.js';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false); 

  const [panier, setPanier] = useState(null);
  const [nbProduitPanier, setNbProduitPanier] = useState(0);

  useEffect(() => {
      const fetchPanier = async () => {
        try {
          const response = await getPanier();
          setPanier(response.data.data);
          let nbProduitPanierTmp = 0;
          response.data.data.produits.forEach(produit => {
            nbProduitPanierTmp += produit.quantite_commande;
          });
          setNbProduitPanier(nbProduitPanierTmp);
        } catch (error) {
          console.error('Erreur lors de la récupération du panier : ', error);
        }
      };

      fetchPanier();
  }, []);

  var isLog = false;
  if (sessionStorage.getItem('token')) {
    isLog = true;
  }

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const disconnect = () => {
    sessionStorage.clear();
    isLog = false;
    window.location.reload();
  }

  const search = (e) => {
    e.preventDefault();
    window.location = 'http://localhost:3000/search-produit/' + e.target.elements.search.value;
  }

  return (
    <div className="navbar-container">
      <NavLink to="/">
        <img src={EcoServiceLogo} alt="Eco Service" className="Eco-service-logo" />
      </NavLink>
      <form className="search-container desktop-search" onSubmit={(e) => search(e)}>
        <input className="search-bar" type="text" name='search' placeholder="Rechercher ..."/>
        <button type='submit' className='search-btn'>
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m505 442.7-99.7-99.7c-4.5-4.5-10.6-7-17-7h-16.3c27.6-35.3 44-79.7 44-128 0-114.9-93.1-208-208-208s-208 93.1-208 208 93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zm-297-106.7c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg>
        </button>
      </form>
      <button className="burger-menu" onClick={toggleMenu}>☰</button>
      <div className={`menu ${showMenu ? "show" : ""}`}>
        <div className="nav-items">
          <NavLink className="nav-item" to="/nos-produits">NOS PRODUITS</NavLink>
          <NavLink className="nav-item" to="/notre-demarche">NOTRE DEMARCHE</NavLink>
          <NavLink className="nav-item" to="/nos-tutoriels">NOS TUTORIELS</NavLink>
        </div>
        <div className={showMenu ? 'icon-container-mobile show' : 'icon-container-mobile'}>
          <button onClick={handleOpenModal} className="panier">
            <img src={LogoPanier} alt="Panier"/>
            <span>PANIER</span>
            <span className={nbProduitPanier == 0 ? 'd-none' : 'nb-item-panier'}>{nbProduitPanier}</span>
          </button>
          <NavLink className='text-deco-none' to='/profil'>
            <button className='panier'>
              <img src={LogoUser} className='logo-user' alt="Connexion"/>
              <span>PROFIL</span>
            </button>
          </NavLink>
          <NavLink className={isLog ? 'd-none text-deco-none' : 'text-deco-none'} to='/login'>
              <button className="connexion">
                <img src={LogoLogin} alt="Connexion"/>
                <span>CONNEXION</span>
              </button>
          </NavLink>
          <div className={!isLog && 'd-none'}>
          <button className="connexion" onClick={disconnect}>
            <img src={LogoLogin} alt="Deconnexion"/>
            <span>DECONNEXION</span>
          </button>
          </div>
        </div>
        <form className="search-container mobile-search" onSubmit={(e) => search(e)}>
          <input className="search-bar" type="text" name='search' placeholder="Rechercher ..."/>
          <button type='submit' className='search-btn-mobile'>
            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m505 442.7-99.7-99.7c-4.5-4.5-10.6-7-17-7h-16.3c27.6-35.3 44-79.7 44-128 0-114.9-93.1-208-208-208s-208 93.1-208 208 93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zm-297-106.7c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg>
          </button>
        </form>
      </div>
      <div className="icon-container">
        <button onClick={handleOpenModal} className="panier">
          <img src={LogoPanier} alt="Panier"/>
          <span>PANIER</span>
          <span className={nbProduitPanier == 0 ? 'd-none' : 'nb-item-panier'}>{nbProduitPanier}</span>
        </button>
        <NavLink className={!isLog ? 'd-none' : 'text-deco-none'} to='/profil'>
          <button className='panier'>
            <img src={LogoUser} className='logo-user' alt="Connexion"/>
            <span>PROFIL</span>
          </button>
        </NavLink>
        <NavLink className={isLog ? 'd-none' : 'text-deco-none'} to='/login'>
            <button className="connexion">
              <img src={LogoLogin} alt="Connexion"/>
              <span>CONNEXION</span>
            </button>
        </NavLink>
        <div className={!isLog && 'd-none'}>
        <button className="connexion" onClick={disconnect}>
          <img src={LogoLogin} alt="Deconnexion"/>
          <span>DECONNEXION</span>
        </button>
        </div>
      </div>
      <Modal show={showModal} handleClose={handleCloseModal}/>
    </div>
  );
};

export default Navbar;
