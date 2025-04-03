const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');

// Ruta para subir imágenes (POST)
router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No se ha subido ningún archivo.');
    }

    const fileUrl = `http://192.168.1.254:8000/uploads/${req.file.filename}`;
    res.send({
        message: 'Archivo subido correctamente.',
        fileUrl: fileUrl, // URL completa de la imagen
    });
});

// Ruta para obtener imágenes (GET)
router.get('/upload', (req, res) => {
    res.send('Esta es la ruta para obtener imágenes.');
});

module.exports = router;