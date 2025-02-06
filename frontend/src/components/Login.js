import React, { useState } from 'react';
import { sendDataToBackend } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import '../asset/css/login.css';

const Login = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendDataToBackend(formData);
      console.log('Response from backend:', response);
      alert('Data sent successfully!');
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to send data');
      alert('Failed to send data');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="input-container">
        <form onSubmit={handleSubmit}>
          <p className="title">Login </p>
          <div className="detail-container">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label className="label">Enter Email</label>
            <div className="underline"></div>
          </div>

          <div className="detail-container">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label className="label">Enter Password</label>
            <div className="underline"></div>
          </div>
          <Link to="#" style={{ textDecoration: 'none' }} class="forget">Forgot password</Link>
          <button type="submit"><span>Login</span></button>
          <p>Don't have an account? <Link to="/" style={{ textDecoration: 'none' }}>Sign in</Link> </p>
        </form>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
      <button class="btnback" onClick={handleBack} style={{ marginTop: '10px' }}><span> Back </span></button>
    </>
  );
};

export default Login;
