const Empleado = require('../models/Empleado');
const multer = require('multer');
const shortid = require('shortid');
const { cloudinary, storage } = require('../config/cloudinaryConfig');

const configuracionMulter = {
    /*    storage: multer.diskStorage({
            destination: (req, file, cb) => {
                const uploadsDir = path.join(__dirname, '../uploads'); // Usar path.join para asegurar compatibilidad SO
                cb(null, uploadsDir);
    @@ -13,7 +14,10 @@ const configuracionMulter = {
                const extension = file.mimetype.split('/')[1];
                cb(null, `${shortid.generate()}.${extension}`);
            }
        }),*/
        storage: storage, // Usar el almacenamiento de Cloudinary configurado
    
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif' || file.mimetype === 'image/webp') {
            cb(null, true);
        } else {
            cb(new Error('Formato No válido'));
        }
    }
};

// Inicializa 'multer' con la configuración anterior para permitir la subida de un solo archivo con el campo 'imagen'
const upload = multer(configuracionMulter).single('imagen');

// Middleware para subir un archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({ mensaje: error.message });
        }
        return next();
    });
};
// Crea un nuevo empleado
exports.nuevoEmpleado = async (req, res, next) => {
    const empleado = new Empleado(req.body);
    try {
        if (req.file) {
            //empleado.imagen = req.file.filename;
            empleado.imagen = req.file.path; // Guardar la URL de Cloudinary
        }
        await empleado.save();
        res.json({ mensaje: 'Se agregó un nuevo empleado' });
    } catch (error) {
        console.log(error);
        next();
    }
};
// Muestra todos los empleados
exports.mostrarEmpleados = async (req, res, next) => {
    try {
        const empleados = await Empleado.find({});
        res.json(empleados);
    } catch (error) {
        console.log(error);
        next();
    }
};
// Muestra un empleado por su ID
exports.mostrarEmpleado = async (req, res, next) => {
    try {
        const empleado = await Empleado.findById(req.params.idEmpleado);
        if (!empleado) {
            res.json({ mensaje: 'Ese Empleado no existe' });
            return next();
        }
        res.json(empleado);
    } catch (error) {
        console.log('Error al buscar el empleado:', error);
        next();
    }
};
// Actualiza un empleado por su ID
exports.actualizarEmpleado = async (req, res, next) => {
    try {
        let nuevoEmpleado = req.body;
        if (req.file) {
            //nuevoEmpleado.imagen = req.file.filename;
            nuevoEmpleado.imagen = req,file.path; // Guardar la URL de Cloudinary
        } else {
            let empleadoAnterior = await Empleado.findById(req.params.idEmpleado);
            nuevoEmpleado.imagen = empleadoAnterior.imagen;
        }
        let empleado = await Empleado.findOneAndUpdate({ _id: req.params.idEmpleado }, nuevoEmpleado, {
            new: true
        });
        res.json(empleado);
    } catch (error) {
        console.log(error);
        next();
    }
};
// Elimina un empleado por su ID
exports.eliminarEmpleado = async (req, res, next) => {
    try {
        await Empleado.findByIdAndDelete({ _id: req.params.idEmpleado });
        res.json({ mensaje: 'El Empleado se ha eliminado' });
    } catch (error) {
        console.log(error);
        next();
    }
};
// Busca empleados por nombre
exports.buscarEmpleado = async (req, res, next) => {
    try {
        const { query } = req.params;
        const empleado = await Empleado.find({ nombre: new RegExp(query, 'i') });
        res.json(empleado);
    } catch (error) {
        console.log(error);
        next();
    }
};
