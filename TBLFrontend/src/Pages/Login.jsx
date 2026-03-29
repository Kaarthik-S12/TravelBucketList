import React, { useState } from 'react';
import './login.css'; 
import NavBar from '../Components/NavBar';
import { useNavigate } from 'react-router-dom'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

     
      const data = await response.text();
      

      if (response.ok) {
        
        localStorage.setItem("email", email);
        localStorage.setItem("token", data); 
        setError('');
        alert(data);
        navigate('/dashboard'); 
      } else {
        setError(data); 
      }
    } catch (err) {
  
      setError('An error occurred. Please try again later.');
      console.error('Login error:', err);
    }
  };

  return (
    <>
      <NavBar />
      <div className="login-container">
    
        <div className="welcome-section">
          <h1>Welcome You Again!</h1>
          <h6>Don’t forget to LIVE!</h6>
        </div>

        
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            <label>Email :</label>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label>Password :</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            {error && <p className="error-message">{error}</p>} 
            <button type="submit">Log In</button>
            <p>
              Don't have an account? <a href="/signup">Sign Up</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;