import React from 'react';
import './productCardComponent.css';

function ProductCardComponent({ product }) {
    const { image_url, nom, prix, promo, date_fin_promo  } = product;

    const calculateDiscountedPrice = () => {
        const discount = parseFloat(promo) / 100; // Convertit le pourcentage en décimal
        return (prix - (prix * discount)).toFixed(2); // Calcul du prix réduit avec la promotion
    };

    const renderPrice = () => {
        if (promo && new Date(date_fin_promo) > new Date()) {
            const discountedPrice = calculateDiscountedPrice();
            return (
                <div>
                    <p className="promo">-{promo}%</p>
                    <p className="product-original-price">{prix} €</p>
                    <p className="product-reduced-price">{discountedPrice} €</p>
                </div>
            );
        } else {
            return <p className="product-price">{prix} €</p>;
        }
    };

    return (
        <div className="product-card">
            <img src={image_url} alt={nom} className="product-card-image" />
            <h3 className="product-name">{nom}</h3>
            {renderPrice()}
        </div>
    );
}

export default ProductCardComponent;
