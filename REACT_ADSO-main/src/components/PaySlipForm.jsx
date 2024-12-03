// Importaciones necesarias desde React y react-router-dom para la navegación
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Definición del componente 'PaySlipForm'
const PaySlipForm = ({ payrollItems }) => {
// Estado local para los datos del formulario
    const [formData, setFormData] = useState({ period: '', paydate: '', employeespaid: '' });
    const navigate = useNavigate();

// Maneja los cambios en los campos del formulario
const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

// Maneja el envío del formulario
const handleSubmit = async (e) => {
    e.preventDefault();
    const paymentCode = Math.floor(Math.random() * 1000000); // Genera un código de pago aleatorio

    const salario = {
        gestor: localStorage.getItem('userId'), 
        salario: payrollItems.map(item => ({
        empleado: item.employee.id,
        horasTrabajadas: item.quantity
        })),
        totalSalarios: payrollItems.reduce((sum, item) => sum + item.employee.salary * item.quantity, 0), 
        fechaPago: formData.paydate, 
        nombrePago: 'Pago de Nómina',
        codigoPago: paymentCode,
    };
    
      console.log(salario); // Añadir esta línea para verificar el objeto salario
    
    try {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/salarios/nuevo`, salario);
        navigate('/pay-slip-pdf', { state: { ...formData, payrollItems, paymentCode } });
    } catch (error) {
        console.error('Error al enviar la nómina', error);
    }
    };

//Renderizado del componente
return (
    <div className="payslip-form">
    <h1>Reporte de Nómina Consolidado</h1>
{/* Formulario para ingresar detalles del recibo de nómina */}
    <form onSubmit={handleSubmit}>
                <div>
                    <label>Inicio del periodo de pago</label>
                    <input type="date" name="periodStart" value={formData.periodStart} onChange={handleChange} required />
                </div>
                <div>
                    <label>Fin del periodo de pago</label>
                    <input type="date" name="periodEnd" value={formData.periodEnd} onChange={handleChange} required />
                </div>
                <div>
                    <label>Fecha de Pago</label>
                    <input type="date" name="paydate" value={formData.paydate} onChange={handleChange} required />
                </div>
                <div>
                    <label>Número de empleados pagados</label>
                    <input type="text" name="employeespaid" value={formData.employeespaid} onChange={handleChange} required />
                </div>
{/* Botón para generar el recibo de nómina */}
                <button type="submit">Generar Recibo</button>
            </form>
    </div>
);
};

// Exportación del componente 'PaySlipForm' para su uso en otros archivos
export default PaySlipForm;