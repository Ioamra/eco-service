import axios from 'axios';

const apiService  = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        'Content-Type': 'application/json'
    }
});

export const connexion = async (email, motDePasse) => {
    try {
        const response = await apiService.post('/utilisateur/connexion', {
            email: email,
            mot_de_passe: motDePasse
        })
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error)
    }
}