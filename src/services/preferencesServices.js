import axios from 'axios';

const API_URL = 'https://netproject-golang-production.up.railway.app/api'; // Puedes definir la URL base de tu API

export const fetchUserPreferences = async (id, token) => {
    try {
        const response = await axios.get(`${API_URL}/preferences?id=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Enviando el token en los headers
            },
        });
        return response.data;  // Devuelves los datos de las preferencias
    } catch (error) {
        console.error('Error fetching preferences:', error);
        throw error;
    }
};


export const updateUserPreferences = async (token, preferences) => {
    try {
        const response = await axios.put(
            `${API_URL}/preferences/update`,
            preferences,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error updating preferences:', error);
        throw error;
    }
};

export const createPreferences = async (preferencesData, token) => {
    try {
        const response = await axios.post(`${API_URL}/preferences/create`, preferencesData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error al crear preferencias:", error);
        throw error;
    }
};
