import axios from 'axios';

const apiService  = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token')
    }
});

export const getPanier = async () => {
    try {
        return await apiService.get('/commande/get-panier');
    } catch (error) {
        return 'error';
    }
}

export const createPanier = async (listProduit) => {
    // listProduit = [ {id_produit, quantite_commander}, ...]
    try {
        return await apiService.post('/commande/create-panier', {
            list_produit: listProduit
        });
    } catch (error) {
        return 'error';
    }
}

export const updatePanier = async (listProduit) => {
    // listProduit = [ {id_produit, quantite_commander}, ...]
    try {
        return await apiService.post('/commande/update-panier', {
            list_produit: listProduit
        });
    } catch (error) {
        return 'error';
    }
}

export const commanderPanier = async () => {
    // listProduit = [ {id_produit, quantite_commander}, ...]
    try {
        return await apiService.post('/commande/commander-panier');
    } catch (error) {
        return 'error';
    }
}

export const removePanier = async () => {
    // listProduit = [ {id_produit, quantite_commander}, ...]
    try {
        return await apiService.post('/commande/commander-panier');
    } catch (error) {
        return 'error';
    }
}