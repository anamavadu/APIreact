import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Header = ({ payrollCount }) => {
const [user, setUser] = useState({
    username: localStorage.getItem('username'),
    role: localStorage.getItem('role')
});
const navigate = useNavigate();
const handleLogout = () => {
    ['username', 'token', 'role', 'userId'].forEach(item => localStorage.removeItem(item));
    setUser({ username: null, role: null });
    navigate('/');
};
useEffect(() => {
    const handleStorageChange = () => {
    setUser({
        username: localStorage.getItem('username'),
        role: localStorage.getItem('role')
    });
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
    window.removeEventListener('storage', handleStorageChange);
    };
}, []);
return (
    <header className="header">
    <h1>PayLogic</h1>
    <nav>
{/* Enlace a la página de nómina, mostrando el conteo de empleados en la nómina */}
        <Link to="/">Inicio</Link>
{/* Enlace a la página de nómina, mostrando el conteo de empleados en la nómina */}
        <Link to="/payroll-page">Nómina ({payrollCount})</Link>
{/* Enlace a la página de reporte de nómina */}
        <Link to="/payroll-report">Reporte de Nómina</Link>
        {user.role === 'admin' && <Link to="/manage-employees">G.Empleados</Link>}
        {user.role === 'admin' && <Link to="/manage-payroll">G. Nómina</Link>} {/* Enlace a la gestión de pedidos */}
        {user.username ? (
        <>
        <Link to="/salarios">Mi Nómina</Link> {/* Enlace a los salarios */}
            <span>Bienvenido, {user.username} ({user.role})</span>
            <Link to="/" onClick={handleLogout}>Cerrar S.</Link>
        </>
        ) : (
        <>
            <Link to="/register">Registro</Link>
            <Link to="/login">Ingresar</Link>
        </>
        )}
    </nav>
    </header>
);
};

// Exportación del componente 'Header' para su uso en otros archivos
export default Header;