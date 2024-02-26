// AddProductModal.jsx
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './AddProductModal.css';

function AddProductModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        nom: '',
        description: '',
        quantite: 0,
        prix: 0,
        id_categorie: '',
        image: null
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/categorie/');
                setCategories(response.data.data);
                console.log(response)
                console.log('response.data : ', response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des catégories : ', error);
            }
        };

        fetchCategories().then(r => console.log(r));
    }, []);

    console.log('categories : ', categories);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (event) => {
        setFormData(prevState => ({
            ...prevState,
            image: event.target.files[0]
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formDataToSubmit = new FormData();
        formDataToSubmit.append('nom', formData.nom);
        formDataToSubmit.append('description', formData.description);
        formDataToSubmit.append('quantite', formData.quantite);
        formDataToSubmit.append('prix', formData.prix);
        formDataToSubmit.append('id_categorie', formData.id_categorie);
        formDataToSubmit.append('image', formData.image);

        try {
            console.log('formDataToSubmit : ', formDataToSubmit);
            await axios.post('http://localhost:5001/api/produit/add', formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authorization': sessionStorage.getItem('token')
                }
            });

            onClose();
        } catch (error) {
            console.error('Erreur lors de la création du produit : ', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="add-product-modal">
            <h2 className="modal-heading">Ajouter un produit</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom du produit" required className="form-input" />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description du produit" required className="form-textarea" />
                <input type="number" name="quantite" value={formData.quantite} onChange={handleChange} placeholder="Quantité disponible" required className="form-input" />
                <input type="number" name="prix" value={formData.prix} onChange={handleChange} placeholder="Prix du produit" required className="form-input" />
                <select name="id_categorie" value={formData.id_categorie} onChange={handleChange} required className="form-select">
                    <option value="">Sélectionnez une catégorie</option>
                    {categories.map(category => (
                        <option key={category.id_categorie} value={category.id_categorie}>{category.nom}</option>
                    ))}
                </select>
                <input type="file" name="image" onChange={handleImageChange} accept="image/*" className="form-input" />
                <button type="submit" className="submit-button">Ajouter</button>
            </form>
        </Modal>
    );

}

export default AddProductModal;
