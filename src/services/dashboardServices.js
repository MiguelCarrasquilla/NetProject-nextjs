import axios from 'axios';

const API_URL = 'https://net-project-golang.vercel.app/api';

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