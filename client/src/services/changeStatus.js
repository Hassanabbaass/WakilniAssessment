import axios from 'axios';

export const changeStatus = async (itemId) => {    
    const apiURL = `/api/items/checked/${itemId}`
    return axios.put(apiURL)
};