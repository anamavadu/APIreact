
// Importación de dependencias necesarias
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// Configuración de Cloudinary con las variables de entorno
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Configuración del almacenamiento en Cloudinary usando CloudinaryStorage y multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
    folder: 'uploads',  
    allowed_formats: ['jpeg', 'png', 'webp'], // Formatos permitidos
},
});
// Exportación de la configuración de Cloudinary y el almacenamiento
module.exports = { cloudinary, storage };