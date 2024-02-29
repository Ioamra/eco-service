import axios from 'axios';

const apiService  = axios.create({
    baseURL: "http://localhost:5001/api/produit",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token')
    }
});

const apiServiceWithoutToken  = axios.create({
    baseURL: "http://localhost:5001/api/produit",
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

export const getAllByCategorie = async (id) => {
    try {
        return await apiServiceWithoutToken.get('/by-categorie/' + id);
    } catch (error) {
        return 'error';
    }
}

export const getBySearch = async (search) => {
    try {
        return await apiServiceWithoutToken.get('/search/' + search);
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

export const update = async () => {
    // ! PAS FONCTIONEL BESOIN DE GERER LES IMG
    try {
        return await apiService.post('/update', {

        });
    } catch (error) {
        return 'error';
    }
}

export const addAvis = async (description, note, id_produit) => {
    try {
        return await apiService.post('/add-avis', {
            description: description,
            note: note,
            id_produit: id_produit
        });
    } catch (error) {
        return 'error';
    }
}

export const addImage = async () => {
    // ! PAS FONCTIONEL BESOIN DE GERER LES IMG
    try {
        return await apiService.post('/add-image', {

        });
    } catch (error) {
        return 'error';
    }
}

export const removeImage = async (id_image) => {
    try {
        return await apiService.delete('/remove-image', {
            id_image: id
        });
    } catch (error) {
        return 'error';
    }
}