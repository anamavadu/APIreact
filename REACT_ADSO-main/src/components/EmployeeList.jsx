// Importaciones necesarias desde React y el componente 'Employee'
import React from 'react';
import Employee from './Employee';

// Definición del componente 'EmployeeList'
const EmployeeList = ({ employees, onAddToPayroll }) => (
<div className="employee-list">
{/* Mapea el array de 'employees' para renderizar un componente 'Employee' por cada empleado */}
    {employees.map(employee => (
// Renderiza el componente 'Employee', pasando la propiedad única 'key', el objeto 'employee', y la función 'onAddToPayroll'
    <Employee key={employee.id} employee={employee} onAddToPayroll={onAddToPayroll} />
    ))}
</div>
);

// Exportación del componente 'EmployeeList' para su uso en otros archivos
export default EmployeeList;