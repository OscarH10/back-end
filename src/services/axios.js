const axios = require('axios');

class Client {
    client;

    constructor() {
        this.client = axios.create({
            baseURL: 'https://api.cloudflare.com/client/v4/',
            headers: {
                'Authorization': 'Bearer 67UVxcA8xKhXl_qbR22JoXccsDpdcQuLXLqZkuTZ',
                'Content-Type': 'application/json',
            },
            timeout: 10000, 
        });
    }

    async makeRequest(method, url, data = null) {
        try {
            const response = await this.client.request({
                method,
                url,
                data,
            });
            return response.data; // Devuelve solo los datos de la respuesta
        } catch (error) {
            if (error.response) {
                
                console.error('Error en la respuesta:', error.response.data);
                throw new Error(`Error ${error.response.status}: ${error.response.data.message}`);
            } else if (error.request) {
               
                console.error('No se recibió respuesta del servidor:', error.request);
                throw new Error('No se recibió respuesta del servidor');
            } else {
           
                console.error('Error en la configuración:', error.message);
                throw new Error(`Error en la solicitud: ${error.message}`);
            }
        }
    }
}

module.exports = Client;