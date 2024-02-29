import React, {useEffect, useState} from 'react';
import './productCardComponent.css';
import axios from "axios";

function ProductCardComponent({ productId }) {
    const [product, setProduct] = useState(null)
    const [imageUrl, setImageUrl] = useState('');



    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/produit/${productId}`);
                setProduct(response.data.data.produit);
                setImageUrl(response.data.data.images[0].url)
                console.log(response.data.data);
            } catch (error) {
                console.error('Erreur lors de la récupération du produit : ', error);
            }
        };

        fetchProduct().then(r => console.log(r));
    }, []);

    if (!product) return null;

    const calculateDiscountedPrice = () => {
        const discount = parseFloat(product.promo) / 100; // Convertit le pourcentage en décimal
        return (product.prix - (product.prix * discount)).toFixed(2); // Calcul du prix réduit avec la promotion
    };

    const renderPrice = () => {
        if (product.promo && new Date(product.date_fin_promo) > new Date()) {
            const discountedPrice = calculateDiscountedPrice();
            return (
                <div>
                    <p className="promo">-{product.promo}%</p>
                    <p className="product-original-price">{product.prix} €</p>
                    <p className="product-reduced-price">{discountedPrice} €</p>
                </div>
            );
        } else {
            return <p className="product-price">{product.prix} €</p>;
        }
    };

    return (
        <div className="product-card">
            {imageUrl && <img src={`http://localhost:5001/${imageUrl}`} alt={product.nom} className="product-card-image" />}
            <h3 className="product-name">{product.nom}</h3>
            {renderPrice()}
        </div>
    );
}

export default ProductCardComponent;
