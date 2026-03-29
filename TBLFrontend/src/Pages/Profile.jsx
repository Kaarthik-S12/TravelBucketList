import { useState,useEffect } from "react";
import Navbard from "../Components/Navbard";
import Speedometer from "react-d3-speedometer";
import { useNavigate } from "react-router-dom";


import "./profile.css";

function Profile() {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gender: "",
    email:localStorage.getItem("email"),
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture,setProfilePicture]=useState('');
  const navigate = useNavigate();
  const [completedDestinations, setCompletedDestinations] = useState([]);
  const [maxValue, setMaxValue] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
 

  const handlePictureUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
  
      
      const formData = new FormData();
      formData.append("file", file);
  
      try {
        const email = localStorage.getItem("email");
        const response = await fetch(`http://localhost:8080/profile/${email}/uploadPicture`, {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          alert("Profile picture uploaded successfully");
        } else {
          alert("Failed to upload profile picture");
        }
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    }
  };
  
useEffect(() => {
  console.log("Updated maxValue:", maxValue);
}, [maxValue]); 

useEffect(() => {
  console.log("Updated currentValue:", currentValue);
}, [currentValue]); 

useEffect(() => {
  const email = localStorage.getItem("email"); 
  
 
  if (email) {
    
    const fetchData = () => {
      fetchProfileData(email);
      fetchCompletedDestinations(email);
    };

  
    fetchData();

    
    const intervalId = setInterval(fetchData, 1000);

    
    return () => clearInterval(intervalId);
  }
}, []);
  const fetchProfileData = async (email) => {
    try {
      const response = await fetch(`http://localhost:8080/profile/${email}`);
      const data = await response.json();
      if (data) {
        setProfileData(data);
        if (data.profilePicture) {
          setProfilePicture(`data:image/jpeg;base64,${data.profilePicture}`);
        }
      } else {
        setProfileData({
          firstName: "Enter First Name",
          lastName: "Enter Last Name",
          phoneNumber: "Enter Phone Number",
          gender: "Enter Gender",
          email: "Enter Your Email",
        });
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };
  const fetchCompletedDestinations = async (email) => {
    try {
      const response = await fetch(`http://localhost:8080/saved?email=${email}`);
      const completedList = await response.json();
      console.log(completedList);
      const newMaxValue = completedList.length;
    const newCurrentValue = completedList.filter(item => item.completed).length;
    

    setMaxValue(newMaxValue);
    setCurrentValue(newCurrentValue);
      setCompletedDestinations(completedList);
  console.log(maxValue);
  console.log(currentValue);

    } catch (err) {
      console.error("Error fetching completed destinations:", err);
    }
  };
  const handleSaveChanges = async () => {
    try {
      const response = await fetch("http://localhost:8080/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        alert("Profile updated successfully");
      } else {
        const errorData = await response.json();
        alert("Error: " + errorData.message);
      }
    } catch (err) {
      console.error("Error saving profile data", err);
      alert("An error occurred while saving profile data");
    }
  };
  const handlePasswordChange = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    const email = localStorage.getItem("email");  // Get the logged-in user's email
  
    try {
      const response = await fetch(`http://localhost:8080/profile/${email}/changePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });
  
      if (response.ok) {
        alert("Password updated successfully");
        setIsPopupOpen(false); // Close the password change popup
      } else {
        const errorData = await response.json();
        alert("Error: " + errorData.message);
      }
    } catch (err) {
      console.error("Error changing password", err);
      alert("An error occurred while changing the password");
    }
  };
  
  return (
    <>
      <Navbard />
      <div className="profile-container">
        {/* Left Section: Profile Picture, Name, and Change Password Button */}
        <div className="left-section">
  <div className="profile-picture-wrapper">
    <img
      src={profilePicture || "https://via.placeholder.com/150"}
      alt="Profile"
      className="profile-picture"
    />
    <label htmlFor="profile-picture-upload" className="upload-icon">
      📷
    </label>
    <input
      type="file"
      id="profile-picture-upload"
      accept="image/*"
      onChange={handlePictureUpload}
      style={{ display: "none" }}
    />
  </div>
  <h2>UserName</h2>
  <button
    className="change-password-button"
    onClick={() => setIsPopupOpen(true)}
  >
    Change Password
  </button>

  {/* Speedometer Section */}
  <div className="activity-section">
    <h2>Activity</h2>
    <div className="speedometer-container">
    <Speedometer
  maxValue={completedDestinations.length}
  value={completedDestinations.length}
  needleColor="black"
  startColor="purple"
  endColor="white"
  segments={10}
  currentValueText={`${currentValue}%`} // Corrected here
  width={200} // Set a fixed width for the speedometer
  height={150} // Set a fixed height for the speedometer
/>
    </div>
  </div>
</div>{/* <-- Closing left-section properly */}

        {/* Right Section: Account Details */}
        <div className="rights-section">
          <h1>Account</h1>
          <div className="form-group">
            <label>First Name:</label>
            <input type="text" 
              placeholder={profileData.firstName || "Enter First Name"}
              value={profileData.firstName || ""}
              onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input type="text" 
            placeholder={profileData.lastName || "Enter Last Name"}
              value={profileData.lastName || ""}
              onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
               />
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input type="number" 
            placeholder={profileData.phoneNumber || "Enter Phone Number"}
              value={profileData.phoneNumber || ""}
              onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
               />
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <input type="text" 
            placeholder={profileData.gender || "Enter Gender"}
              value={profileData.gender || ""}
              onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
               />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" 
              placeholder={profileData.email || "Enter Your Email"}
              value={profileData.email || ""}
             // onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
             readOnly
            />
          </div>
          <button className="save-changes-button" onClick={handleSaveChanges}>Make Changes</button>
        </div>
      </div> {/* <-- Closing profile-container properly */}

      {/* Password Change Popup */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Change Password</h2>
            <div className="form-group">
              <label>New Password:</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="popup-buttons">
              <button className="save-button" onClick={handlePasswordChange}>Save</button>
              <button
                className="close-button"
                onClick={() => setIsPopupOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
