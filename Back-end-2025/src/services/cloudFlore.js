const Client = require("./axios");
const fs = require('fs');
const FormData = require('form-data');

class Cloudflare extends Client {

    static instance;

    constructor() {
        super();
    }

    static getInstance() {
        if(!Cloudflare.instance) {
            Cloudflare.instance = new Cloudflare()
        }
        return Cloudflare.instance
    }

    async uploadImages(path) {
        const file = fs.createReadStream(path);
        const formData = new FormData();
        formData.append('file', file);
        const result = await this.client.post('/accounts/d1f1c82e1365537ebb76d514fa2413eb/images/v1', formData);
        fs.unlinkSync(path);
    
        // Extraer las URLs de las variantes de la respuesta de Cloudflare
        const variants = result.data.result.variants;
    
        // Devolver un objeto con el formato que el frontend espera
        return {
          original: variants[3], 
          res250: variants[2],   
          res500: variants[0],   
          res750: variants[1]    
        };
    }

    deleteImages(id) {
        return this.client.delete(`/accounts/d1f1c82e1365537ebb76d514fa2413eb/images/v1/${id}`)
    }
}

module.exports = Cloudflare;