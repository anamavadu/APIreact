// Importaciones necesarias desde React y lightweight-charts para crear gráficos
import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

// Definición del componente 'PayrollReport'
const PayrollReport = ({ data }) => {
const chartContainerRef = useRef();

useEffect(() => {
// Creación del gráfico con configuración personalizada
    const chart = createChart(chartContainerRef.current, {
    width: chartContainerRef.current.clientWidth,
    height: 300,
    layout: {
    textColor: 'black',
    backgroundColor: 'white',
    },
    });

// Serie de datos para la nómina
    const payrollSeries = chart.addAreaSeries({
    lineColor: '#2962FF',
    topColor: 'rgba(41, 98, 255, 0.5)',
    bottomColor: 'rgba(41, 98, 255, 0.1)',
    });

// Establecer los datos en la serie
    payrollSeries.setData(data);

// Limpieza del gráfico al desmontar el componente
    return () => chart.remove();
}, [data]);

return (
    <div className="payroll-report">
    <h1>Reporte de Nómina</h1>
{/* Contenedor para el gráfico */}
    <div ref={chartContainerRef} />
    </div>
);
};

// Exportación del componente 'PayrollReport' para su uso en otros archivos
export default PayrollReport;