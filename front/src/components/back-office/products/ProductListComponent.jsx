import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductListComponent() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/produit');
                setProducts(response.data);
            } catch (error) {
                console.error('Une erreur s\'est produite lors de la récupération des produits :', error);
            }
        };

        fetchProducts().then(r => r);
    }, []);

    console.log("products : "+ products)


    return (
        <div>
            <h2>Liste des produits</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Prix</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.length > 0 && products.map(product => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.nom}</td>
                        <td>{product.description}</td>
                        <td>{product.prix}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductListComponent;
