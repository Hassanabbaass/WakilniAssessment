import axios from 'axios';

export const deleteProductTypes = async (productTypeId) => {   
    const apiURL = `/api/products/delete/${productTypeId}`; 
    return axios.delete(apiURL)
};