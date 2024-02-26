import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductComponent() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/produits');
                setProducts(response.data);
            } catch (error) {
                console.error('Une erreur s\'est produite lors de la récupération des produits :', error);
            }
        };

        fetchProducts().then(r => r);
    }, []);



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
                {products.map(product => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductComponent;
