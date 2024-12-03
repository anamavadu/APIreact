import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeModal from './EmployeeModal';

const ManageEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [employeeToEdit, setEmployeeToEdit] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('${import.meta.env.VITE_API_URL}/api/empleados');
            setEmployees(response.data);
        } catch (error) {
            setErrorMessage('Error al obtener los empleados');
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleDeleteEmployee = async (id) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/empleados/${id}`);
            fetchEmployees();
            setSuccessMessage(response.data.mensaje || 'Empleado eliminado con éxito');
            setTimeout(() => setSuccessMessage(''), 1000);
        } catch (error) {
            setErrorMessage('Error al eliminar el empleado');
        }
    };

    const handleEditEmployee = (employee) => {
        setEmployeeToEdit(employee);
        setShowModal(true);
    };

    const handleAddEmployee = () => {
        setEmployeeToEdit(null);
        setShowModal(true);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/empleados/busqueda/${searchQuery}`);
            setEmployees(response.data);
            if (response.data.length === 0) {
                setErrorMessage('No se encontraron empleados');
            }
        } catch (error) {
            setErrorMessage('Error al buscar empleados');
        }
    };

    return (
        <div>
            <h2>Gestión de Empleados</h2>
            <button onClick={handleAddEmployee}>Agregar Empleado</button>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar empleados..."
                />
                <button type="submit">Buscar</button>
            </form>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <table className="tablaEmpleados">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Puesto</th>
                        <th>Salario por hora</th>
                        <th>Fecha de contratación</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee.nombre}</td>
                            <td>{employee.puesto}</td>
                            <td>${employee.salarioPorHora}</td>
                            <td>{new Date(employee.fechaContratacion).toLocaleDateString()}</td>
                            <td>
                                {employee.imagen && <img src={employee.imagen} alt={employee.nombre} width="100"/>}
                            </td>
                            <td>
                                <button
                                    className="edit-button"
                                    onClick={() => handleEditEmployee(employee)}
                                >
                                    Editar
                                </button>
                                <button onClick={() => handleDeleteEmployee(employee._id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <EmployeeModal
                showModal={showModal}
                closeModal={() => setShowModal(false)}
                fetchEmployees={fetchEmployees}
                employeeToEdit={employeeToEdit}
            />
        </div>
    );
};

export default ManageEmployees;