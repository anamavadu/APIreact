import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
const [formData, setFormData] = useState({ email: '', password: '' });
const [message, setMessage] = useState('');
const navigate = useNavigate();
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData);
        setMessage('Login exitoso');
        localStorage.setItem('token', response.data.token);

        localStorage.setItem('username', response.data.username);
        localStorage.setItem('role', response.data.role); // Guardar el rol del usuario
        localStorage.setItem('userId', response.data.userId); // Guardar el ID del usuario
        localStorage.setItem('email', response.data.email); // Almacena el email
        window.dispatchEvent(new Event('storage')); // Disparar evento de almacenamiento
        navigate('/');
    } catch (error) {
        setMessage(error.response?.data?.error || 'Error en el login');
    }
};
return (
    <div className="payment-form">
    <form onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>
        {message && <p>{message}</p>}
        <label>
            Correo electrónico:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
            Contraseña:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <button type="submit">Ingresar</button>
    </form>
    </div>
);
};
export default Login;