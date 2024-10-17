const express = require('express');
const conectarDB = require('./config/db');
const authRoutes = require('./routes/authRoutes.js');
const empleadosRoutes = require('./routes/empleadosRoutes');
const salariosRoutes = require('./routes/salariosRoutes');
const cors = require('cors');
const path = require('path');

// Conectar a la base de datos
conectarDB();

// Crear una instancia de Express
const app = express();

// Configuración de CORS
const corsOptions = {
    origin: 'http://localhost:5173', // Reemplaza con el dominio de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
    credentials: true // Habilita el manejo de cookies y otros credenciales
    };
    app.use(cors(corsOptions));

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());

// Middleware para servir archivos estáticos desde el directorio 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas de autenticación
app.use('/api/auth', authRoutes);

//Rutas de empleados
app.use('/api', empleadosRoutes);

// Rutas de salarios
app.use('/api', salariosRoutes);

// Configurar el puerto en el que escuchará el servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando y ejecutándose en el puerto ${PORT}`);
});