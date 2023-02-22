import axios from 'axios';

export const deleteItem = async (itemId) => {   
    const apiURL = `/api/items/delete/${itemId}`; 
    return axios.delete(apiURL)
};