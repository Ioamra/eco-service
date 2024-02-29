import axios from 'axios';

const apiService  = axios.create({
    baseURL: "http://localhost:5000/api/categorie",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token')
    }
});

const apiServiceWithoutToken  = axios.create({
    baseURL: "http://localhost:5000/api/categorie",
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getAll = async () => {
    try {
        return await apiServiceWithoutToken.get('/');
    } catch (error) {
        return 'error';
    }
}

export const add = async () => {
    // ! PAS FONCTIONEL BESOIN DE GERER LES IMG
    try {
        return await apiService.post('/add', {
            
        });
    } catch (error) {
        return 'error';
    }
}

export const remove = async (id) => {
    try {
        return await apiService.delete('/remove', {
            id_categorie: id
        });
    } catch (error) {
        return 'error';
    }
}