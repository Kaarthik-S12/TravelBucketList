import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css'; 
import NavBar from '../Components/NavBar';
import axios from 'axios'; 

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); 
  const [success, setSuccess] = useState(''); 
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (!email || !password || !confirmPassword) {
      setError('All fields are required!');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/signup', {
        email,
        password,
      });

      setSuccess('User registered successfully!');
      setError('');
      setTimeout(() => {
        navigate('/login'); 
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data); 
      } else {
        setError('An error occurred. Please try again.');
      }
      setSuccess(''); 
    }
  };

  return (
    <>
      <NavBar />
      <div className="signup-container">
        <div className="welcome-section">
          <h1>Welcome to .....</h1>
          <p>Explore the world and Make It Simple</p>
        </div>

        <div className="form-section">
          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}

            {success && <div className="success-message">{success}</div>}

            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Enter the password again"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <br />
            <button type="submit">Sign Up</button>
            <p>
              Already have an Account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;