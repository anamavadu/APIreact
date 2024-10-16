// Importaciones necesarias desde React, react-router-dom para la navegación y jsPDF para generar PDFs
import React from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Definición del componente 'PaySlipPDF'
const PaySlipPDF = () => {
// Uso de la ubicación actual para acceder a los datos pasados desde la página anterior
const location = useLocation();
const { period, paydate, employeespaid, payrollItems, paymentCode } = location.state;

// Calcular el total de salarios
const total = payrollItems.reduce((sum, item) => sum + item.employee.salary * item.quantity, 0);

// Función para generar y descargar el PDF del recibo de nómina
const generatePDF = () => {
    const doc = new jsPDF('p', 'mm', 'letter');

// Añadir logo
    const logo = '/images/logo.png';
    doc.addImage(logo, 'PNG', 10, 5, 40, 40);

// Encabezado
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.setFont('helvetica', 'bold');
    doc.text('Factura', 105, 20, null, null, 'center');

// Información de la empresa
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.setFont('helvetica', 'normal');
    doc.text('Nombre de la Empresa', 105, 30, null, null, 'center');
    doc.text('Dirección de la Empresa', 105, 35, null, null, 'center');
    doc.text('Teléfono: 123-456-7890', 105, 40, null, null, 'center');
    doc.text('Correo: empresa@correo.com', 105, 45, null, null, 'center');

// Información del recibo de nómina
    doc.setFontSize(12);
    let yOffset = 60;
    const lineSpacing = 10;
    const labelX = 14;
    const valueX = 60;

    doc.setTextColor(0, 0, 0);

    doc.setFont('helvetica', 'bold');
    doc.text('Período:', labelX, yOffset);
    doc.setFont('helvetica', 'normal');
    doc.text(period, valueX, yOffset);

    yOffset += lineSpacing;
    doc.setFont('helvetica', 'bold');
    doc.text('Fecha de Pago:', labelX, yOffset);
    doc.setFont('helvetica', 'normal');
    doc.text(paydate, valueX, yOffset);

    yOffset += lineSpacing;
    doc.setFont('helvetica', 'bold');
    doc.text('Empleados Pagados:', labelX, yOffset);
    doc.setFont('helvetica', 'normal');
    doc.text(employeespaid.toString(), valueX, yOffset);

    yOffset += lineSpacing;
    doc.setFont('helvetica', 'bold');
    doc.text('Código de Pago:', labelX, yOffset);
    doc.setFont('helvetica', 'normal');
    doc.text(paymentCode.toString(), valueX, yOffset);

    yOffset += lineSpacing + 10;

// Tabla de empleados
const tableColumn = ["Empleados", "Precio hora", "Días Trabajados", "Pago Total"];
const tableRows = [];

    payrollItems.forEach(item => {
    const employeeData = [
        item.employee.name,
        `$${item.employee.salary.toFixed(2)}`,
        item.quantity.toString(),
        `$${(item.employee.salary * item.quantity).toFixed(2)}`,
    ];
    tableRows.push(employeeData);
    });

    doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: yOffset,
    theme: 'striped',
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: [240, 240, 240] }
    });

// Total
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Nómina Total: $${total.toFixed(2)} USD`, labelX, finalY);

// Pie de página
    doc.setFontSize(12);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(0, 128, 0);
    doc.text('Gracias por su trabajo', 105, finalY + 20, null, null, 'center');
    doc.text('Por favor, conserve este recibo para sus registros', 105, finalY + 30, null, null, 'center');

// Guardar el PDF
    doc.save('recibo.pdf');
};

//Renderizado del componente
return (
    <div className="payslip-form">
    <h1>Recibo de Nómina</h1>
{/* Muestra la información del recibo de nómina */}
    <p>Período: {period}</p>
    <p>Fecha de Pago: {paydate}</p>
    <p>Número de Empleados Pagados: {employeespaid}</p>
    <p>Código de Pago: {paymentCode}</p>
    <h2>Detalles de los Empleados:</h2>
    {payrollItems.map(item => (
        <div key={item.employee.id}>
            <span>{item.employee.name} - ({item.quantity} días trabajados)</span>
          <span>{item.employee.salary * item.quantity.toFixed(2)} USD</span>
        </div>
    ))}
    <h2>Total: {total} USD</h2>
{/* Botón para descargar el recibo en PDF */}
    <button onClick={generatePDF}>Descargar Recibo en PDF</button>
{/* Botón para proceder al pago */}
    <button onClick={() => alert('Proceder al pago PSE o en efectivo')}>Proceder al Pago</button>
    </div>
);
};

// Exportación del componente 'PaySlipPDF' para su uso en otros archivos
export default PaySlipPDF;