import React, {useState} from "react";
import './backOfficePages.css';
import ProductListComponent from "../../components/back-office/products/ProductListComponent";
import AddProductModal from "../../components/back-office/products/AddProductModal";


const AdminProductPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAddProduct = (formData) => {
        console.log(formData);
        closeModal();
    };

    return (
        <div className="admin-product-page">
            <h1>Administration des produits</h1>
            <button onClick={openModal}>Ajouter un produit</button>
            <ProductListComponent />
            <AddProductModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleAddProduct} />
        </div>
    );
}

export default AdminProductPage;