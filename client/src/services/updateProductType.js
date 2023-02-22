import axios from 'axios';

export const updateProductType = async (productInfo, prodTypeId) => {    
    const apiURL = `/api/products/update/${prodTypeId}`
    return axios.put(apiURL, productInfo)
};