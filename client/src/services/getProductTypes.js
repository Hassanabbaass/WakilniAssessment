import axios from 'axios';

const apiURL = '/api/products/';

export const getProductTypes = async () => {    
    return axios.get(apiURL)
};