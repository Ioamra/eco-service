import React, { useState, useEffect } from 'react';
import './productPage.css';
import axios from 'axios';

function ProductPage({ productId }) {
    const [product, setProduct] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/produit/${productId}`);
                setProduct(response.data.data.produit);
                setImageUrl(response.data.data.images[0].url)
            } catch (error) {
                console.error('Erreur lors de la récupération du produit : ', error);
            }
        };

        const fetchRelatedProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/produit/');
                setRelatedProducts(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des produits associés : ', error);
            }
        };

        fetchProduct().then(r => console.log(r));
        fetchRelatedProducts().then(r => console.log(r));
    }, [productId]);

    const addToCart = () => {
        console.log('Le produit a été ajouté au panier');
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    const isOnSale = product.promo && product.promo > 0;
    const displayPrice = isOnSale ? product.prix - (product.prix * product.promo / 100) : product.prix;

    return (
        <div className="product-page">
            <div className="product-first-line">
                <img className="product-image" src={`http://localhost:5001/${imageUrl}`} alt={product.nom}/>
                <div className="product-details">
                    <h2 className="product-name">{product.nom}</h2>
                    <p className="product-category">{product.categorie}</p>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">Prix: {isOnSale ?
                        <del>{product.prix}</del> : null} {displayPrice} {isOnSale ? '(En promotion)' : null}</p>
                    <button className="add-to-cart-btn" onClick={addToCart}>Ajouter au panier</button>
                </div>
            </div>
            <h3 className="related-products-title">Produits associés :</h3>
            <div className="related-products">
                {Array.isArray(relatedProducts) && relatedProducts.map(relatedProduct => (
                    <div key={relatedProduct.id} className="related-product">
                        <img className="related-product-image" src={`http://localhost:5001/${relatedProduct.imagePath}`}
                             alt={relatedProduct.nom}/>
                        <p className="related-product-name">{relatedProduct.nom}</p>
                        <p className="related-product-price">{relatedProduct.prix}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductPage;
