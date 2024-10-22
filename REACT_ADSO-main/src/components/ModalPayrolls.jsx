import React, { useState } from 'react';
import axios from 'axios';

const ModalPayrolls = ({ payroll, setSelectedPayroll, setPayrolls, setFilteredPayrolls, payrolls, filteredPayrolls }) => {
    const [payrollToDelete, setPayrollToDelete] = useState(null);

const handleUpdatePayroll = async (updatedPayroll) => {
    try {
    const response = await axios.put(`http://localhost:5000/api/salarios/${updatedPayroll._id}`, updatedPayroll);
    setPayrolls(payrolls.map(o => (o._id === updatedPayroll._id ? response.data : o)));
    setFilteredPayrolls(filteredPayrolls.map(o => (o._id === updatedPayroll._id ? response.data : o)));
    setSelectedPayroll(null);
    } catch (error) {
    console.error('Error al actualizar la nómina', error);
    }
};

const confirmDeletePayroll = () => {
    setPayrollToDelete(payroll._id);
};

const handleDeletePayroll = async () => {
    try {
    await axios.delete(`http://localhost:5000/api/salarios/${payrollToDelete}`);
    setPayrolls(payrolls.filter(o => o._id !== payrollToDelete));
    setFilteredPayrolls(filteredPayrolls.filter(o => o._id !== payrollToDelete));
    setPayrollToDelete(null);
    setSelectedPayroll(null);
    } catch (error) {
    console.error('Error al eliminar la nómina', error);
    }
};

const handleCloseConfirmation = () => {
    setPayrollToDelete(null);
};

return (
    <div className="modal">
    <div className="modal-contenido">
        <button className="cerrar-boton" onClick={() => setSelectedPayroll(null)}>×</button>
        <h3>Actualizar Nómina</h3>
        <div className="form-fila">
        <label>
            Estado:
            <select
            value={payroll.estado}
            onChange={(e) => setSelectedPayroll({ ...payroll, estado: e.target.value })}
            className="estado-select"
            >
                <option value="PENDIENTE">Pendiente</option>
                <option value="PAGADO">Pagado</option>
                </select>
                </label>
                </div>
                
        <div className="form-fila">
        <div className="form-columna">
            <label>
                Nombre de Nómina:
                <input
                type="text"
                value={payroll.nombrePago}
                onChange={(e) => setSelectedPayroll({ ...payroll, nombrePago: e.target.value })}
                />
            </label>
            </div>
                    <div className="form-columna">
                        <label>
                            Total de Salarios:
                            <input
                                type="number"
                                value={payroll.totalSalarios}
                                readOnly
                            />
                        </label>
                    </div>
                    <div className="form-columna">
                        <label>
                            Fecha de Pago:
                            <input
                                type="date"
                                value={payroll.fechaPago}
                                onChange={(e) => setSelectedPayroll({ ...payroll, fechaPago: e.target.value })}
                            />
                        </label>
                    </div>
                </div>
        <div className="boton-fila">
            <button onClick={() => handleUpdatePayroll({...payroll})}>Actualizar</button>
            <button onClick={confirmDeletePayroll}>Eliminar</button>
        </div>
        {payrollToDelete && (
        <div className="modal-confirmacion">
            <div className="modal-contenido-confirmacion">
                <div className="confirmacion-logo">⚠️</div>
                <div className="confirmacion-mensaje">¿Está seguro de que desea eliminar esta nómina?</div>
                <div className="boton-confirmacion-fila">
                    <button className="confirmar" onClick={handleDeletePayroll}>Eliminar</button>
                <button className="cancelar" onClick={handleCloseConfirmation}>Cancelar</button>
            </div>
            </div>
        </div>
        )}
    </div>
    </div>
);
};
export default ModalPayrolls;