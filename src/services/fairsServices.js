import axios from 'axios';

// URL base del backend
const API_URL = "https://net-project-golang.vercel.app/api/fairs";

// Función para crear una feria
export const createFair = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',  // Si estás enviando archivos
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating fair:", error);
        throw error;
    }
};

// Función para obtener una feria por su ID
export const getFair = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/get?id=${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching fair:", error);
        throw error;
    }
};

// Función para obtener todas las ferias
export const getAllFairs = async () => {
    try {
        const response = await axios.get(`${API_URL}/getAll`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all fairs:", error);
        throw error;
    }
};

// Función para actualizar una feria
export const updateFair = async (id, formData) => {
    try {
        const response = await axios.put(`${API_URL}/update/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',  // Si estás enviando archivos
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating fair:", error);
        throw error;
    }
};

// Función para eliminar una feria
export const deleteFair = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.status === 204;  // Espera un código 204 (No Content) si fue exitosa
    } catch (error) {
        console.error("Error deleting fair:", error);
        throw error;
    }
};
