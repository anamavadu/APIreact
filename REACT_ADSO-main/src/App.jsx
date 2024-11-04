// Importaciones
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import EmployeeList from './components/EmployeeList';
import PayrollMenu from './components/PayrollMenu';
import PayrollPage from './components/PayrollPage';
import PayrollReport from './components/PayrollReport';
import PaySlipForm from './components/PaySlipForm';
import PaySlipPDF from './components/PaySlipPDF';
import axios from 'axios';
import Register from './components/Register';
import Login from './components/Login';
import ManageEmployees from './components/ManageEmployees';
import Salarios from './components/Salarios';
import ManagePayrolls from './components/ManagePayrolls'; // Importar componente de gestión de nómina
import UpdateUser from './components/UpdateUser'; // Importar el componente de actualización de usuario

//Array de objetos con información inicial
const initialEmployees = [];

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

const mapEmployeeData = (employee) => {
    return {
        id: employee._id,
        name: employee.nombre, 
        position: employee.puesto,
        salary: employee.salarioPorHora,
        image: employee.imagen,
      // Agrega más mapeos según sea necesario
    };
};

//Definición del componente App
const App = () => {
const [employees, setEmployees] = useState(initialEmployees);
const [payrollData] = useState(initialPayrollData);
const [payrollItems, setPayrollItems] = useState([]);
const [showPayrollMenu, setShowPayrollMenu] = useState(false);
const [paymentInfo, setPaymentInfo] = useState({});
const navigate = useNavigate();
const location = useLocation();

//Funciones
useEffect(() => {
    const fetchEmployees = async () => {
        try {
        const response = await axios.get('http://localhost:5000/api/empleados');
        console.log('Empleados desde la API:', response.data);
        const mappedEmployees = response.data.map(mapEmployeeData);
        setEmployees(mappedEmployees);
    } catch (error) {
        console.error('Error al obtener los empleados', error);
    }
    };
    if (location.pathname === '/') {
        fetchEmployees();
    }
}, [location.pathname]);

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

const handleIncreaseQuantity = (employeeId) => {
    setPayrollItems(payrollItems.map(item =>
        item.employee.id === employeeId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
};

const handleClosePayrollMenu = () => {
    setShowPayrollMenu(false);
};

const handlePaymentInfo = (info) => {
    setPaymentInfo(info);
};

const PrivateRoute = ({ children }) => {
    const role = localStorage.getItem('role');
    return role === 'admin' ? children : <div>No tienes acceso a esta página</div>;
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
            onIncreaseQuantity={handleIncreaseQuantity}
        />}
        />
        
        <Route path="/payroll-report" element={<PayrollReport data={payrollData} />} />
        <Route path="/pay-slip" element={<PaySlipForm payrollItems={payrollItems} />} />
        <Route path="/pay-slip-pdf" element={<PaySlipPDF />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/manage-employees" element={<PrivateRoute><ManageEmployees /></PrivateRoute>} />
        <Route path="/salarios" element={<Salarios />} />
        <Route path="/manage-payrolls" element={<PrivateRoute><ManagePayrolls /></PrivateRoute>} /> 
        <Route path="/update-user" element={<UpdateUser />} /> 
        </Routes>

    {showPayrollMenu && (
        <PayrollMenu
        payrollItems={payrollItems}
        onClose={handleClosePayrollMenu}
        onAddToPayroll={handleAddToPayroll}
        onRemoveFromPayroll={handleRemoveFromPayroll}
        onReduceQuantity={handleReduceQuantity}
        onIncreaseQuantity={handleIncreaseQuantity}
        />
    )}

    </div>
);
};

export default App;