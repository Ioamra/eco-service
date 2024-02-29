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

export const inscription = async (mail, prenom, nom, mot_de_passe, pays, ville, code_postal, complement_adresse) => {
    try {
        const response = await apiService.post('/utilisateur/inscription', {
            mail: mail, 
            prenom: prenom, 
            nom: nom, 
            pays: pays, 
            ville: ville, 
            code_postal: code_postal, 
            complement_adresse: complement_adresse,
            mot_de_passe: CryptoJS.SHA256(mot_de_passe).toString()
        })
        sessionStorage.setItem('token', response.data.data.token)
        return 'ok';
    } catch (error) {
        return 'error';
    }
}