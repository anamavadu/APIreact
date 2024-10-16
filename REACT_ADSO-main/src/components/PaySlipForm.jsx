// Importaciones necesarias desde React y react-router-dom para la navegación
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
const handleSubmit = (e) => {
    e.preventDefault();
    const paymentCode = Math.floor(Math.random() * 1000000); // Genera un código de pago aleatorio
    console.log(payrollItems);
    navigate('/pay-slip-pdf', { state: { ...formData, payrollItems, paymentCode } }); // Navega a la página de PDF con los datos del formulario y de la nómina
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