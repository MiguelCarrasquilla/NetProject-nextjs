import axios from 'axios';

const API_URL = 'https://net-project-golang.vercel.app/api'; // Puedes definir la URL base de tu API

// Servicio de login para autenticar usuarios
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Servicio de registro para crear un nuevo usuario
export const registerUser = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/users`, formData, {
            headers: {
                'Content-Type': 'application/json', // Aquí se especifica el tipo de contenido adecuado
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error en el servicio de registro:', error);
        throw error;
    }
};

// Servicio de actualizacion para un usuario
export const updateUser = async (formData, id) => {
    console.log(formData);
    console.log(`${API_URL}/users/update/${id}`); // Verifica que la URL es correcta
    try {
        const response = await axios.put(`${API_URL}/users/update/${id}`, formData,{
            headers: {
                'Content-Type': 'multipart/form-data', // Aquí se especifica el tipo de contenido adecuado
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error en el servicio de registro:', error);
        throw error;
    }
};

export const getUsers = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/users/get?id=${id}`, {
            headers: {
                'Content-Type': 'application/json', // Aquí se especifica el tipo de contenido adecuado
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all fairs:', error);
        throw error;
    }
};
