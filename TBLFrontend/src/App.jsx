import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import DashBoard from "./Pages/DashBoard";
import Profile from "./Pages/Profile";
import Planning from "./Pages/Planning";
import Places from "./Pages/Places";
import Saved from "./Pages/Saved";
import Memories from "./Pages/Memories";
import { jwtDecode } from "jwt-decode"; 


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      checkStorage();
    }, 1000); 

    return () => clearInterval(intervalId);
  }, []);

  const checkStorage = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; 
        if (decodedToken.exp > currentTime) {
          setIsAuthenticated(true);
        }
         
        else {
          localStorage.removeItem("token"); 
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signUp"
          element={!isAuthenticated ? <SignUp /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route path="/dashboard" element={<DashBoard />} />
        
        {isAuthenticated ? (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/plannings" element={<Planning />} />
            <Route path="/places" element={<Places />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/memories" element={<Memories />} />
            
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
