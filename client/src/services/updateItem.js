import axios from 'axios';

export const updateItem = async (editInfo, itemId) => {    
    const apiURL = `/api/items/update/${itemId}`
    return axios.put(apiURL, editInfo)
};