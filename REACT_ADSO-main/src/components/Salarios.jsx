// Importamos las bibliotecas necesarias de React y axios
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Definimos el componente Salarios
const Salarios = () => {
    // Declaramos el estado 'salarios' para almacenar los salarios y 'userId' para el ID del usuario
    const [salarios, setSalarios] = useState([]);
    const userId = localStorage.getItem('userId');

  // useEffect se utiliza para realizar la llamada a la API cuando el componente se monta o 'userId' cambia
useEffect(() => {
    // Función asincrónica para obtener los salarios del gestor
    const fetchSalarios = async () => {
    try {
        // Realizamos una solicitud GET a la API para obtener los salarios del gestor
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/salarios/gestor/${userId}`);
        // Ordenamos los salarios por fecha de creación en orden descendente
        const sortedSalarios = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        // Actualizamos el estado 'salarios' con los datos obtenidos y ordenados de la API
        setSalarios(sortedSalarios);
    } catch (error) {
        // Manejamos cualquier error que ocurra durante la solicitud
        console.error('Error al obtener los salarios', error);
    }
    };

// Si 'userId' existe, llamamos a la función para obtener los salarios
if (userId) {
    fetchSalarios();
    }
}, [userId]);

  // Renderizamos el componente
return (
    <div className="salarios-container">
    <h2>Mi nómina</h2>
    {salarios.length > 0 ? (
        // Mapeamos cada salario para crear su representación en el DOM
        salarios.map(salario => (
        <div key={salario._id} className="salario-card">
            <div className="salario-header">
                <p><strong>ID del Salario:</strong> {salario._id}</p>
                <p><strong>Fecha de Pago:</strong> {new Date(salario.createdAt).toLocaleDateString()}</p>
                <p><strong className={`estado ${salario.estado.toLowerCase()}`}>Estado: {salario.estado}</strong></p>
                <p><strong>Código de Pago:</strong> {salario.paymentCode}</p> {/* Mostramos el código de pago */}
            </div>
        <div className="salario-body">
            <h3>Detalles de nómina</h3>
            {salario.salario.map(item => (
                <div key={item._id} className="salario-item">
                    <img src={item.empleado?.imagen} alt={item.empleado?.nombre} className="employee-image" />
                    <div className="item-details">
                    <p><strong>Empleado:</strong> {item.empleado?.nombre || 'Empleado eliminado'}</p>
                    <p><strong>Horas Trabajadas:</strong> {item.horasTrabajadas}</p>
                    <p><strong>Salario:</strong> ${item.empleado?.salarioPorHora.toFixed(2)}</p>
                    </div>
                </div>
            ))}
            </div>
            <div className="salario-footer">
                <h3>Detalles de Nómina</h3>
                <p><strong>Generado por:</strong> {salario.gestor?.nombre || 'Gestor eliminado'}</p>
                <p><strong>Fecha de Pago:</strong> {new Date(salario.fechaPago).toLocaleDateString()}</p>
                <p><strong>Nombre del Pago:</strong> {salario.nombrePago}</p>
                <p><strong>Total Salarios:</strong> ${salario.totalSalarios.toFixed(2)}</p>
                </div>
            </div>
        ))
    ) : (
        // Si no hay salarios, mostramos un mensaje indicando que no hay salarios
        <p>No tienes salarios.</p>
        )}
    </div>
    );
};

// Exportamos el componente Salarios como el valor predeterminado del módulo
export default Salarios;