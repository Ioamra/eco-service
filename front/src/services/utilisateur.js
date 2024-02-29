import axios from 'axios';
import CryptoJS from 'crypto-js';

const apiServiceWithoutToken  = axios.create({
    baseURL: "http://localhost:5001/api/utilisateur",
    headers: {
        'Content-Type': 'application/json'
    }
});

const apiService  = axios.create({
    baseURL: "http://localhost:5001/api/utilisateur",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token')
    }
});

export const connexion = async (email, motDePasse) => {
    try {
        const response = await apiServiceWithoutToken.post('/connexion', {
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
        const response = await apiServiceWithoutToken.post('/inscription', {
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

export const getAll = async () => {
    try {
        return await apiService.get('/');
    } catch (error) {
        return 'error';
    }
}

export const getById = async (id) => {
    try {
        return await apiService.get('/' + id);
    } catch (error) {
        return 'error';
    }
}

export const update = async (id_utilisateur, ancient_mote_de_passe, mail = null, prenom = null, nom = null, mot_de_passe = null, pays = null, ville = null, code_postal = null, complement_adresse = null) => {
    try {
        let body = {
            id_utilisateur: id_utilisateur,
            ancient_mote_de_passe: ancient_mote_de_passe
        }
        mail && (body.mail = mail);
        prenom && (body.prenom = prenom);
        nom && (body.nom = nom);
        mot_de_passe && (body.mot_de_passe = mot_de_passe);
        pays && (body.pays = pays);
        ville && (body.ville = ville);
        code_postal && (body.code_postal = code_postal);
        complement_adresse && (body.complement_adresse = complement_adresse);
        return await apiService.post('/update', body);
    } catch (error) {
        return 'error';
    }
}

export const toggleAdminRole = async (id) => {
    try {
        return await apiService.post('/toggle-admin-role', {
            id_utilisateur: id
        });
    } catch (error) {
        return 'error';
    }
}

export const toggleBanUnban = async (id) => {
    try {
        return await apiService.post('/toggle-ban-unban', {
            id_utilisateur: id
        });
    } catch (error) {
        return 'error';
    }
}