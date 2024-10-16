// Importaciones necesarias desde React y Link de react-router-dom para la navegación
import React from 'react';
import { Link } from 'react-router-dom';

// Definición del componente 'Header'
const Header = ({ payrollCount }) => (
<header className="header">
{/* Título principal de la aplicación */}
    <h1>Aplicación de Cálculo de Salarios</h1>
{/* Barra de navegación */}
    <nav>
{/* Enlace a la página de inicio */}
    <Link to="/">Inicio</Link>
{/* Enlace a la página de nómina, mostrando el conteo de empleados en la nómina */}
    <Link to="/payroll-page">Nómina ({payrollCount})</Link>
{/* Enlace a la página de reporte de nómina */}
    <Link to="/payroll-report">Reporte de Nómina</Link>
    </nav>
</header>
);

// Exportación del componente 'Header' para su uso en otros archivos
export default Header;