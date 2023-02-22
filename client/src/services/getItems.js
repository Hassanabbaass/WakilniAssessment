import axios from 'axios';

export const getItems = async (productId) => {    
    const apiURL = `/api/items/${productId}`;
    return axios.get(apiURL)
};