import React, {useEffect, useState} from "react";
import axios from "axios";
import {getAll} from "../services/produit";
import ProductCardComponent from "../components/produit/productCardComponent";
import './ouProductPage.css';

const OurProductPage = () => {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAll();
                setProducts(response.data.data);
                console.log(response)
            } catch (error) {
                console.error('Une erreur s\'est produite lors de la récupération des produits :', error);
            }
        };

        fetchProducts().then(r => r);
    }, []);

return (
        <div className='our-products-page'>
            <h1 className='our-products-title'>Nos produits</h1>
            <div className='grid-container'>
            {products.length > 0 && products.map(product => (
                <ProductCardComponent key={product.id_produit} productId={product.id_produit} />
            ))}
            </div>
        </div>
    );
}

export default OurProductPage;