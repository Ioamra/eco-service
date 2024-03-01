import React, { useEffect, useState } from 'react';
import './modal.css'
import { getPanier } from '../../services/commande';
import LineCart from './lineCart.jsx';

const Modal = ({ handleClose, show }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  const [panier, setPanier] = useState(null)
  const [prixTotal, setPrixTotal] = useState(0)

  useEffect(() => {
      const fetchPanier = async () => {
        try {
          const response = await getPanier();
          setPanier(response.data.data);

          let prixTotalTmp = 0;
          response.data.data.produits.forEach(produit => {
            prixTotalTmp += produit.prix * produit.quantite_commande;
          });
          setPrixTotal(prixTotalTmp);
        } catch (error) {
          console.error('Erreur lors de la récupération du panier : ', error);
        }
      };
      
      fetchPanier();
  }, []);

  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        <section className='cart-header'>
          <span className='cart-header-img'></span>
          <p className='cart-header-nom'>Nom</p>
          <p className='cart-header-prix'>Prix</p>
          <p className='cart-header-quantite'>Quantite</p>
          <p className='cart-header-total-line'>Prix Total</p>
        </section>
        {panier && (panier.produits.map((produit) => (
          <LineCart produit={produit}/>
        )))}
        <section className='cart-total-price'>
          {prixTotal} €
        </section>
        <button type='button' onClick={handleClose}>
          Commander
        </button>
        <button type='button' onClick={handleClose}>
          Fermer
        </button>
      </section>
    </div>
  );
};

export default Modal;
