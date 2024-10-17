// Importaciones necesarias desde React
import React, { useState } from 'react';

// Definición del componente 'Employee'
const Employee = ({ employee, onAddToPayroll }) => {
// Estado local 'quantity' con su función de actualización 'setQuantity', inicializado en 1
const [quantity, setQuantity] = useState(1);

const imageURL = `http://localhost:5000/uploads/${employee.imagen}`;

// Renderizado del componente
return (
    <div className="employee">
{/* Muestra la imagen del empleado */}
    <img src={imageURL} alt={employee.name} />

{/* Muestra el nombre del empleado */}
    <h2>{employee.name}</h2>
{/* Muestra el salario del empleado, formateado a dos decimales */}
    <p>${employee.salary.toFixed(2)} por hora</p>
    
{/* Controles para ajustar la cantidad (de horas trabajadas)*/}
    <div className="quantity-controls">
{/* Botón para disminuir la cantidad, sin permitir menos de 1 */}
        <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
{/* Muestra la cantidad actual */}
        <span>{quantity}</span>
{/* Botón para aumentar la cantidad */}
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
    </div>
{/* Botón para añadir el empleado a la nómina con la cantidad de horas seleccionadas */}
    <button onClick={() => onAddToPayroll(employee, quantity)}>Añadir a Nómina</button>
    </div>
);
};

// Exportación del componente 'Employee' para su uso en otros archivos
export default Employee;