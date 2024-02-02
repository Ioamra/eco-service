import axios from 'axios';
import CryptoJS from 'crypto-js';

const apiService  = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        'Content-Type': 'application/json'
    }
});

export const connexion = async (email, motDePasse) => {
    try {
        const response = await apiService.post('/utilisateur/connexion', {
            mail: email,
            mot_de_passe: CryptoJS.SHA256(motDePasse).toString()
        })
        sessionStorage.setItem('token', response.data.data.token)
        return 'ok';
    } catch (error) {
        return 'error';
    }
}