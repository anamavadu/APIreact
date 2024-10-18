import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeModal = ({ showModal, closeModal, fetchEmployees, employeeToEdit }) => {
    const initialEmployeeData = {
        nombre: '',
        puesto: '',
        salarioPorHora: 0,
        fechaContratacion: '',
        correo: '',
        imagen: null
};
const [employeeData, setEmployeeData] = useState(initialEmployeeData);
const [errorMessage, setErrorMessage] = useState('');
const [successMessage, setSuccessMessage] = useState('');
useEffect(() => {
    if (employeeToEdit) {
        setEmployeeData({
            nombre: employeeToEdit.nombre,
            puesto: employeeToEdit.puesto,
            salarioPorHora: employeeToEdit.salarioPorHora,
            fechaContratacion: new Date(employeeToEdit.fechaContratacion).toISOString().split('T')[0],
            correo: employeeToEdit.correo,
            imagen: null
    });
    } else {
        setEmployeeData(initialEmployeeData);
    }
}, [employeeToEdit]);
const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
        ...employeeData,
        [name]: value
    });
};
const handleFileChange = (e) => {
    setEmployeeData({
        ...employeeData,
        imagen: e.target.files[0]
    });
};
const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre', employeeData.nombre);
    formData.append('puesto', employeeData.puesto);
    formData.append('salarioPorHora', employeeData.salarioPorHora);
    formData.append('fechaContratacion', employeeData.fechaContratacion);
    formData.append('correo', employeeData.correo);
    formData.append('imagen', employeeData.imagen);
try {
    let response;
    if (employeeToEdit) {
        response = await axios.put(`http://localhost:5000/api/empleados/${employeeToEdit._id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } else {
        response = await axios.post('http://localhost:5000/api/empleados', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    setSuccessMessage(response.data.mensaje || 'Operación exitosa');
    fetchEmployees();
    setEmployeeData(initialEmployeeData); // Limpiar el formulario después de agregar/actualizar
    setTimeout(() => {
        closeModal();
        setSuccessMessage('');
    }, 2000);
} catch (error) {
    setErrorMessage(error.response?.data?.mensaje || 'Error al guardar el empleado');
}
};

if (!showModal) {
    return null;
}
return (
<div className="modalEmpleado-overlay">
    <div className="modalEmpleado">
        <button className="modalEmpleado-close" onClick={closeModal}>×</button>
        <h2>{employeeToEdit ? 'Actualizar Empleado' : 'Agregar Empleado'}</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
        <label>
                        Nombre:
                        <input type="text" name="nombre" value={employeeData.nombre} onChange={handleInputChange} />
                    </label>
                    <label>
                        Puesto:
                        <input type="text" name="puesto" value={employeeData.puesto} onChange={handleInputChange} />
                    </label>
                    <label>
                        Salario por hora:
                        <input type="number" name="salarioPorHora" value={employeeData.salarioPorHora} onChange={handleInputChange} />
                    </label>
                    <label>
                        Fecha de contratación:
                        <input type="date" name="fechaContratacion" value={employeeData.fechaContratacion} onChange={handleInputChange} />
                    </label>
                    <label>
                        Correo:
                        <input type="email" name="correo" value={employeeData.correo} onChange={handleInputChange} />
                    </label>
                    <label>
                        Imagen:
                        <input type="file" name="imagen" onChange={handleFileChange} />
                    </label>
                    <button type="submit">{employeeToEdit ? 'Actualizar' : 'Agregar'}</button>
                </form>
                </div>
            </div>
        );
};
export default EmployeeModal;