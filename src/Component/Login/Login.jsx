import React, { useState } from 'react';
import logo from "../../assets/image/skurelabs_logo.jpg";
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword,setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(name,value)
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

const validate = () => {
  const newErrors = {};

  if (!formData.email.trim()) {
    newErrors.email = 'Email or username is required.';
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
    newErrors.email = 'Please enter a valid email address.';
  }

  if (!formData.password.trim()) {
    newErrors.password = 'Password is required.';
  } else if (formData.password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters.';
  }

  return newErrors;
};

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('Login submitted:', formData);
      // Add real login logic here
    }, 1500);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form" aria-label="Login Form">
        <img src={logo} alt="Company Logo" className="logo" />
        <h2>Login to Your Account</h2>

        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Enter your email or username"
          value={formData.email}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.email}
        />
        {errors.email && <span className="error-msg" role="alert">{errors.email}</span>}

        <label htmlFor="password">Password</label>
        <input
          type= {showPassword?"text":"password"}
          id="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.password}
        />
        <button onClick={()=>setShowPassword(!showPassword)}>{showPassword?"hide":"show"}</button>
        {errors.password && <span className="error-msg" role="alert">{errors.password}</span>}

        <div className="login-options">
          <label className="remember-me">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            /> <span>Remember Me</span>
          </label>
          <a href="/forgot-password" className="link">Forgot Password?</a>
        </div>

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? <span className="spinner"></span> : 'Login'}
        </button>

        <div className="signup-link">
          Don’t have an account? <a href="/signup" className="link">Sign up</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
