import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalPayrolls from './ModalPayrolls.jsx';
// Define el componente ManagePayroll
const ManagePayrolls = () => {
    // Declara los estados del componente
    const [payrolls, setPayrolls] = useState([]); // Estado para almacenar todas las nóminas
    const [filteredPayrolls, setFilteredPayrolls] = useState([]); // Estado para almacenar los salarios filtrados
    const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el término de búsqueda
    const [selectedPayroll, setSelectedPayroll] = useState(null); // Estado para almacenar la nómina seleccionada

    // useEffect para obtener los salarios al montar el componente
    useEffect(() => {
    const fetchPayrolls = async () => {
                try {
        // Realiza una solicitud GET a la API para obtener los salarios
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/salarios`);
        // Ordena los salarios por fecha de creación en orden descendente
        const sortedPayrolls = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPayrolls(sortedPayrolls); // Actualiza el estado de los salarios
        setFilteredPayrolls(sortedPayrolls); // Actualiza el estado de los salarios filtrados
            } catch (error) {
        console.error('Error al obtener los salarios', error); // Maneja los errores de la solicitud
        }
    };
    fetchPayrolls(); // Llama a la función para obtener los salarios
  }, []); // Dependencia vacía para ejecutar el efecto solo una vez

  // Maneja la búsqueda de nóminas
const handleSearch = (event) => {
    const term = event.target.value.toLowerCase(); // Obtiene el término de búsqueda en minúsculas
    setSearchTerm(term); // Actualiza el estado del término de búsqueda
    // Filtra los salarios según el nombre del gestor o el estado
    const filtered = payrolls.filter(payroll => 
        payroll.gestor.username.toLowerCase().includes(term) || 
        payroll.estado.toLowerCase().includes(term)
    );
    setFilteredPayrolls(filtered); // Actualiza el estado de los salarios filtrados
    };
  // Renderiza el componente
return (
<div className="gestionar-salarios-contenedor">
    <h2>Gestionar Nóminas</h2>
    {/* Campo de entrada para buscar nóminas */}
    <input
    type="text"
    placeholder="Buscar por nombre de gestor o estado"
    value={searchTerm}
    onChange={handleSearch}
    className="buscar-input"
    />
    <div className="salarios-lista">
        {/* Mapea las nóminas filtradas para mostrarlas */}
        {filteredPayrolls.map(payroll => (
            <div key={payroll._id} className={`salario-tarjeta`} onClick={() => setSelectedPayroll(payroll)}>
            <p><strong>ID de la nómina:</strong> {payroll._id}</p>
            <p><strong>gestor:</strong> {payroll.gestor.username}</p>
            <p><strong>Estado:</strong> <span className={`estado estado-${payroll.estado.toLowerCase()}`}>{payroll.estado}</span></p>
            <p><strong>Código de Pago:</strong> {payroll.paymentCode}</p>
            <p><strong>Total:</strong> ${payroll.totalSalarios.toFixed(2)}</p>
            </div>
        ))}
        </div>
      {/* Muestra el modal si hay una nómina seleccionada */}
    {selectedPayroll && (
        <ModalPayrolls 
        payroll={selectedPayroll} 
        setSelectedPayroll={setSelectedPayroll} 
        setPayrolls={setPayrolls} 
        setFilteredPayrolls={setFilteredPayrolls} 
        payrolls={payrolls} 
        filteredPayrolls={filteredPayrolls} 
        />
    )}
    </div>
);
};
export default ManagePayrolls;