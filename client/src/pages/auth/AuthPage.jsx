import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import logo from '../../assets/logo.png'; // Update path to your logo

const AuthPage = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsLoginForm(!isLoginForm);
        setErrors({});
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        // Registration specific validations
        if (!isLoginForm) {
            if (!formData.username) {
                newErrors.username = 'Username is required';
            }

            if (!formData.confirmPassword) {
                newErrors.confirmPassword = 'Please confirm your password';
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Simulate API call
            setTimeout(() => {
                console.log('Form submitted:', formData);
                // Redirect to home page on successful login/register
                navigate('/home');
            }, 1500);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <img src={logo} alt="Connect-Sphere Logo" className="auth-logo" />
                    <h1 className="auth-title">Connect-Sphere</h1>
                </div>

                <div className="forms-container">
                    <div className={`slider-container ${isLoginForm ? 'login-form' : 'register-form'}`}>
                        {/* Login Form */}
                        <div className="form-section login">
                            <h2>Welcome Back</h2>
                            <p>Sign in to continue to your account</p>

                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <div className="input-icon-wrapper">
                                        <FaEnvelope className="input-icon" />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={errors.email ? 'error' : ''}
                                        />
                                    </div>
                                    {errors.email && <span className="error-message">{errors.email}</span>}
                                </div>

                                <div className="form-group">
                                    <div className="input-icon-wrapper">
                                        <FaLock className="input-icon" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className={errors.password ? 'error' : ''}
                                        />
                                        <button
                                            type="button"
                                            className="password-toggle"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                    {errors.password && <span className="error-message">{errors.password}</span>}
                                </div>

                                <div className="forgot-password">
                                    <a href="/forgot-password">Forgot Password?</a>
                                </div>

                                <button type="submit" className="submit-btn">Sign In</button>
                            </form>

                            <div className="form-switch">
                                <p>Don't have an account? <button onClick={toggleForm}>Sign Up</button></p>
                            </div>
                        </div>

                        {/* Register Form */}
                        <div className="form-section register">
                            <h2>Create Account</h2>
                            <p>Join our community today</p>

                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <div className="input-icon-wrapper">
                                        <FaUser className="input-icon" />
                                        <input
                                            type="text"
                                            name="username"
                                            placeholder="Username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className={errors.username ? 'error' : ''}
                                        />
                                    </div>
                                    {errors.username && <span className="error-message">{errors.username}</span>}
                                </div>

                                <div className="form-group">
                                    <div className="input-icon-wrapper">
                                        <FaEnvelope className="input-icon" />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={errors.email ? 'error' : ''}
                                        />
                                    </div>
                                    {errors.email && <span className="error-message">{errors.email}</span>}
                                </div>

                                <div className="form-group">
                                    <div className="input-icon-wrapper">
                                        <FaLock className="input-icon" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className={errors.password ? 'error' : ''}
                                        />
                                        <button
                                            type="button"
                                            className="password-toggle"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                    {errors.password && <span className="error-message">{errors.password}</span>}
                                </div>

                                <div className="form-group">
                                    <div className="input-icon-wrapper">
                                        <FaLock className="input-icon" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="confirmPassword"
                                            placeholder="Confirm Password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className={errors.confirmPassword ? 'error' : ''}
                                        />
                                    </div>
                                    {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                                </div>

                                <button type="submit" className="submit-btn">Create Account</button>
                            </form>

                            <div className="form-switch">
                                <p>Already have an account? <button onClick={toggleForm}>Sign In</button></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;