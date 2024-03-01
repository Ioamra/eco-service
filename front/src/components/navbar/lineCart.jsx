import React from 'react';
import './lineCart.css'

const LineCart = ({ produit }) => {

  return (
    <div className='line-cart-container'>
        <img className='cart-img' src={`http://localhost:5001/${produit.url_img}`}/>
        <p className='cart-nom'>{produit.nom}</p>
        <p className='cart-prix'>{produit.prix} €</p>
        <p className='cart-quantite'>{produit.quantite_commande}</p>
        <p className='cart-total-line'>{produit.prix * produit.quantite_commande} €</p>
    </div>
  );
};

export default LineCart;
