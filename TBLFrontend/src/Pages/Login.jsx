import React, { useState } from 'react';
import './login.css'; // Import the CSS file
import NavBar from '../Components/NavBar';
import { useNavigate } from 'react-router-dom'; // For navigation after login

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate inputs
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      // Send login request to the backend
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Parse the response
      const data = await response.text();
      // localStorage.setItem("token ",data);

      if (response.ok) {
        // Login successful
        localStorage.setItem("email", email);
        localStorage.setItem("token", data); 
        setError(''); // Clear any previous errors
        alert(data); // Show success message
        navigate('/dashboard'); // Redirect to home page or dashboard
      } else {
        // Login failed
        setError(data); // Set error message from the backend
      }
    } catch (err) {
      // Handle network or other errors
      setError('An error occurred. Please try again later.');
      console.error('Login error:', err);
    }
  };

  return (
    <>
      <NavBar />
      <div className="login-container">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h1>Welcome You Again!</h1>
          <h6>Don’t forget to LIVE!</h6>
        </div>

        {/* Login Form */}
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
            {error && <p className="error-message">{error}</p>} {/* Display error message */}
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