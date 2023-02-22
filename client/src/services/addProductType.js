import axios from 'axios';

const apiURL = '/api/products/add'

export const addProductType = async (productInfo) => {    
    return axios.post(apiURL, productInfo)
};