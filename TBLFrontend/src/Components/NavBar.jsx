import {} from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; 

function NavBar() {
  return (
    <nav>
      <div className="left-links">
        <Link to="/">Home</Link>
        <Link to="/plannings">Planning</Link>
      </div>
      <div className="right-links">
        <Link to="/signUp">Sign Up</Link>
        <Link to="/login">LogIn</Link>
      </div>
    </nav>
  );
}

export default NavBar;