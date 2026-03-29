import {} from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'; 

function Navbard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/"); 
  };
  return (
    <nav className="navbar">
      <div className="left-links">
      <Link to="/dashboard">Dashboard</Link>
        <Link to="/places">Places</Link>
        <Link to="/plannings">Planning</Link>
        <Link to="/memories">Memories</Link>
      </div>
      <div className="right-links">
        <Link to="/saved">Saved</Link>
        <Link to="/" onClick={handleLogout}>Logout</Link>
        <Link to="/profile" className="profile-link">
          <FontAwesomeIcon icon={faUserCircle} className="profile-icon" />
        </Link>
      </div>
    </nav>
  );
}

export default Navbard;