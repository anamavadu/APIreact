// Importaciones necesarias desde React y react-router-dom para la navegación
import React from 'react';
import { Link } from 'react-router-dom';

// Definición del componente 'PayrollMenu'
const PayrollMenu = ({ payrollItems, onClose, onAddToPayroll, onRemoveFromPayroll, onReduceQuantity }) => {
// Cálculo del total de la nómina sumando el salario por la cantidad de horas trabajadas para cada empleado
    const total = payrollItems.reduce((sum, item) => sum + item.employee.salary * item.quantity, 0).toFixed(2);

// Renderizado del componente
return (
    <div className="payroll-menu">
{/* Botón para cerrar el menú */}
    <button className="close-button" onClick={onClose}>X</button>
    <h2>Nómina</h2>

{/* Condicional para mostrar mensaje si no hay empleados en la nómina */}
    {payrollItems.length === 0 ? (
        <p>No hay empleados en la nómina.</p>
    ) : (
        <ul>
{/* Iteración sobre los items de la nómina para renderizar cada empleado */}
        {payrollItems.map(item => (
            <li key={item.employee.id}>
            <div className="payroll-item">
{/* Muestra el nombre del empleado y las horas trabajadas */}
                <span className="payroll-item-name">{item.employee.name} x {item.quantity} horas trabajadas</span>
                <div className="quantity-controls">
{/* Botones para reducir o aumentar la cantidad de horas trabajadas */}
                <button onClick={() => onReduceQuantity(item.employee.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => onAddToPayroll(item.employee, 1)}>+</button>
{/* Botón para eliminar al empleado de la nómina */}
                <button className="remove-button" onClick={() => onRemoveFromPayroll(item.employee.id)}>Eliminar</button>
                </div>
            </div>
            </li>
        ))}
        </ul>
    )}

{/* Muestra el total calculado */}
    <div className="payroll-total">
        <strong>Total: ${total}</strong>
    </div>
{/* Opciones para cerrar el menú, ver la nómina actual, o proceder al pago */}
    <div className="payroll-menu-actions">
        <button onClick={onClose}>Volver</button>
        <Link to="/payroll-page" onClick={onClose}>Ver Nómina Actual</Link>
        <Link to="/pay-slip" onClick={onClose}>Pagar</Link>
    </div>
    </div>
);
};

// Exportación del componente 'PayrollMenu' para su uso en otros archivos
export default PayrollMenu;