import axios from 'axios';

export const addItem = async (productId, newItem) => {    
    const apiURL = `/api/items/add/${productId}`;
    return axios.post(apiURL, newItem)
};