import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css'; // Import the CSS file
import NavBar from '../Components/NavBar';
import axios from 'axios'; // For making HTTP requests

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); // For error messages
  const [success, setSuccess] = useState(''); // For success messages
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!email || !password || !confirmPassword) {
      setError('All fields are required!');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      // Send a POST request to the backend
      const response = await axios.post('http://localhost:8080/signup', {
        email,
        password,
      });

      // Handle success
      setSuccess('User registered successfully!');
      setError(''); // Clear any previous errors
      setTimeout(() => {
        navigate('/login'); // Redirect to login page after 2 seconds
      }, 2000);
    } catch (error) {
      // Handle errors
      if (error.response && error.response.data) {
        setError(error.response.data); // Display error message from backend
      } else {
        setError('An error occurred. Please try again.'); // Generic error message
      }
      setSuccess(''); // Clear any previous success messages
    }
  };

  return (
    <>
      <NavBar />
      <div className="signup-container">
        {/* Welcome Section (Left Side) */}
        <div className="welcome-section">
          <h1>Welcome to .....</h1>
          <p>Explore the world and Make It Simple</p>
        </div>

        {/* Sign-Up Form (Right Side) */}
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            {/* Display error message */}
            {error && <div className="error-message">{error}</div>}

            {/* Display success message */}
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