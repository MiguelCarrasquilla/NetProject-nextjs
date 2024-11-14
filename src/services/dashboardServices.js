import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const fetchAllFairs = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/fairs/getAll`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all fairs:', error);
        throw error;
    }
};