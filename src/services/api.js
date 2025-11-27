export const BASE_URL = "http://localhost:8080";

const api = {
    baseUrl: BASE_URL,

    get: async (endpoint) => {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);
        return response.json();
    },

    post: async (endpoint, body) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        return response;
    },

    put: async (endpoint, body) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        return response;
    },

    delete: async (endpoint) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'DELETE'
        });
        return response;
    },

    postFormData: async (endpoint, formData) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            body: formData
        });
        return response;
    }
};

export default api;