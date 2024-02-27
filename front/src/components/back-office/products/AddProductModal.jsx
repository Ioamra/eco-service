import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './AddProductModal.css';

function AddProductModal({ isOpen, onClose }) {
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const [formData, setFormData] = useState({
        nom: '',
        description: '',
        quantite: '',
        prix: '',
        id_categorie: '',
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/categorie/');
                setCategories(response.data.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des catégories : ', error);
            }
        };

        fetchCategories().then(r => console.log(r));
    }, []);

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const imageData = e.target.result;
            setImage(file);
            console.log('image : ', file);
            setPreviewImage(imageData);
        };

        reader.readAsDataURL(file);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const createProductResponse = await axios.post('http://localhost:5000/api/produit/add', formData, {
                headers: {
                    'authorization': sessionStorage.getItem('token')
                }
            });
            console.log('Produit ajouté avec succès');
            const productId = createProductResponse.data.data.id_produit;
            const formImageData = new FormData();
            formImageData.append('image', image.files[0]);
            formImageData.append('id_produit', productId);
            console.log(productId);

            const extension = image.files[0].name.split('.').pop();
            console.log(extension);
            formImageData.append('ext', extension);

            axios.post('http://localhost:5001/api/produit/add-image', formImageData, {
                headers: {
                    'authorization': sessionStorage.getItem('token')
                }
            })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('Erreur:', error);
                });

            console.log('Image ajoutée avec succès');

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
                {previewImage && <img src={previewImage} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px', marginBottom: '10px' }} />}
                <button type="submit" className="submit-button">Ajouter</button>
            </form>
        </Modal>
    );

}

export default AddProductModal;