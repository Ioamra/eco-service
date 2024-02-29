import axios from 'axios';

const apiService  = axios.create({
    baseURL: "http://localhost:5000/api/tuto",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token')
    }
});

const apiServiceWithoutToken  = axios.create({
    baseURL: "http://localhost:5000/api/tuto",
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

export const getById = async (id) => {
    try {
        return await apiServiceWithoutToken.get('/' + id);
    } catch (error) {
        return 'error';
    }
}

export const addAvis = async (description, note, id_tuto) => {
    try {
        return await apiService.post('/add-avis', {
            description: description,
            note: note,
            id_tuto: id_tuto
        });
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
            id_tuto: id
        });
    } catch (error) {
        return 'error';
    }
}