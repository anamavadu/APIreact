// Importaciones
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import EmployeeList from './components/EmployeeList';
import PayrollMenu from './components/PayrollMenu';
import PayrollPage from './components/PayrollPage';
import PayrollReport from './components/PayrollReport';
import PaySlipForm from './components/PaySlipForm';
import PaySlipPDF from './components/PaySlipPDF';

//Array de objetos con información inicial
const initialEmployees = [
    { id: 1, name: 'Juan Pérez', position: 'Supervisor', salary: 1.37, image: '/images/empleado1.jpg' },
    { id: 2, name: 'Marta Gómez', position: 'Vendedor', salary: 1.37, image: '/images/empleado2.jpg'  },
    { id: 3, name: 'Luis Martínez', position: 'Almacenista', salary: 1.37, image: '/images/empleado3.jpg'  },
    { id: 4, name: 'Jhon García', position: 'Repartidor', salary: 1.37, image: '/images/empleado4.jpg'  },
];

// Array que simula datos que podría recibir de una base de datos
const initialPayrollData = [
    { time: '2023-01-01', value: 75000 },
    { time: '2023-02-01', value: 81000 },
    { time: '2023-03-01', value: 76000 },
    { time: '2023-04-01', value: 72000 },
    { time: '2023-05-01', value: 71000 },
    { time: '2023-06-01', value: 73000 },
    { time: '2023-07-01', value: 82000 },
    { time: '2024-01-01', value: 79000 },
    { time: '2024-02-01', value: 72000 },
    { time: '2024-03-01', value: 77000 },
    { time: '2024-04-01', value: 77000 },
    { time: '2024-05-01', value: 89000 },
    { time: '2024-06-01', value: 71000 },
    { time: '2024-07-01', value: 75000 },
];

//Deficnición del componente App
const App = () => {
const [employees] = useState(initialEmployees);
const [payrollData] = useState(initialPayrollData);
const [payrollItems, setPayrollItems] = useState([]);
const [showPayrollMenu, setShowPayrollMenu] = useState(false);
const [paymentInfo, setPaymentInfo] = useState({});
const navigate = useNavigate();

//Funciones
const handleAddToPayroll = (employee, quantity) => {
    const existingItem = payrollItems.find(item => item.employee.id === employee.id);
    if (existingItem) {
    setPayrollItems(payrollItems.map(item =>
        item.employee.id === employee.id
        ? e="app">{ ...item, quantity: item.quantity + quantity }
        : item
    ));
    } else {
    setPayrollItems([...payrollItems, { employee, quantity }]);
    }
    setShowPayrollMenu(true);
};

const handleRemoveFromPayroll = (employeeId) => {
    setPayrollItems(payrollItems.filter(item => item.employee.id !== employeeId));
};

const handleReduceQuantity = (employeeId) => {
    const existingItem = payrollItems.find(item => item.employee.id === employeeId);
    if (existingItem.quantity > 1) {
    setPayrollItems(payrollItems.map(item =>
        item.employee.id === employeeId
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
    } else {
    handleRemoveFromPayroll(employeeId);
    }
};

const handleClosePayrollMenu = () => {
    setShowPayrollMenu(false);
};

const handlePaymentInfo = (info) => {
    setPaymentInfo(info);
};

//Renderizado del componente
return (
    <div className="app">

    <Header payrollCount={payrollItems.length} />

    <Routes>
        <Route
        path="/"
        element={<EmployeeList employees={employees} onAddToPayroll={handleAddToPayroll} />}
        />
    
        <Route
        path="/payroll-page"
        element={<PayrollPage
            payrollItems={payrollItems}
            onAddToPayroll={handleAddToPayroll}
            onRemoveFromPayroll={handleRemoveFromPayroll}
            onReduceQuantity={handleReduceQuantity}
        />}
        />
        
        <Route path="/payroll-report" element={<PayrollReport data={payrollData} />} />
        <Route path="/pay-slip" element={<PaySlipForm payrollItems={payrollItems} />} />
        <Route path="/pay-slip-pdf" element={<PaySlipPDF />} />
        
    </Routes>

    {showPayrollMenu && (
        <PayrollMenu
        payrollItems={payrollItems}
        onClose={handleClosePayrollMenu}
        onAddToPayroll={handleAddToPayroll}
        onRemoveFromPayroll={handleRemoveFromPayroll}
        onReduceQuantity={handleReduceQuantity}
        />
    )}

    </div>
);
};

export default App;