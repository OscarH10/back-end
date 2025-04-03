const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8000;

// Configuración de CORS para aceptar solicitudes del frontend
app.use(cors({
  origin: 'http://localhost:8081', // Permitir solicitudes desde este origen
  methods: ['GET', 'POST'], // Permitir métodos GET y POST
  allowedHeaders: ['Content-Type'], // Permitir encabezados específicos
}));

// Configuración de Multer para manejar la carga de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir); // Crear la carpeta "uploads" si no existe
    }
    cb(null, uploadsDir); // Guardar las imágenes en la carpeta "uploads"
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Nombre único para cada archivo
  },
});
const upload = multer({ storage: storage });

// Ruta para manejar la subida de imágenes
app.post('/images/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se subió ninguna imagen.' });
  }

  console.log('Imagen subida:', req.file); // Muestra la imagen recibida

  // Respuesta exitosa
  res.status(200).json({
    message: 'Imagen subida correctamente',
    fileName: req.file.filename, // Nombre del archivo subido
    filePath: `/images/${req.file.filename}`, // Ruta para acceder a la imagen
  });
});

// Ruta para obtener las imágenes subidas
app.get('/images/upload', (req, res) => {
  const uploadsDir = path.join(__dirname, 'uploads');

  // Leer los archivos en la carpeta "uploads"
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error al leer las imágenes' });
    }

    // Crear un array con las URLs de las imágenes
    const images = files.map((file) => `192.168.1.254:8000/images/${file}`);
    res.status(200).json({ images });
  });
});

// Servir imágenes estáticas desde la carpeta "uploads"
app.use('/images', express.static(path.join(__dirname, 'uploads')));

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Backend corriendo en http://localhost:${port}`);
});