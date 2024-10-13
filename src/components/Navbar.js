import React, { useState, useEffect } from "react"; // Import useState and useEffect
import logoo from '../assets/images/logoo.png';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2 for notifications

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage logged-in state
  const navigate = useNavigate(); // Use navigate to programmatically change routes

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // User is logged in
    }
  }, []);

  // Function to handle My Profile click
  const handleMyProfileClick = () => {
    if (!isLoggedIn) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'You must be logged in to access your profile.',
      });
    } else {
      navigate('/profile'); // Navigate to My Profile page
    }
  };

  // Function to handle My Bookings click
  const handleMyBookingsClick = () => {
    if (!isLoggedIn) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'You must be logged in to access your bookings.',
      });
    } else {
      navigate('/user-bookings'); // Navigate to My Bookings page
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from localStorage
    setIsLoggedIn(false); // Update the state to logged out
    Swal.fire({
      icon: 'success',
      title: 'Logged Out',
      text: 'You have successfully logged out.',
    });
    navigate('/Home'); // Redirect to the sign-in page
  };

  return (
    <nav className="bg-pink-500 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src={logoo} alt="Wedding Bookings Logo" className="h-12 w-12" />
          <div className="text-2xl font-bold">Wedding Services Bookings</div>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <Link to="/Home" className="text-white hover:text-pink-300"> {/* Link to Services page */}
              Home
            </Link>
          </li>
          <li>
            <button 
              onClick={handleMyBookingsClick} 
              className="text-white hover:text-pink-300 focus:outline-none"
            >
              My Bookings
            </button>
          </li>
          <li>
            <button 
              onClick={handleMyProfileClick} 
              className="text-white hover:text-pink-300 focus:outline-none"
            >
              My Profile
            </button>
          </li>
          <li>
          <Link to="/about" className="text-white hover:text-pink-300">
                About
              </Link>
          </li>
          <li>
          <Link to="/contact" className="text-white hover:text-pink-300">
                Contact
              </Link>
          </li>
          {isLoggedIn ? ( // Conditionally render Log Out link
            <li>
              <button onClick={handleLogout} className="text-white hover:text-pink-300">
                Log Out
              </button>
            </li>
          ) : (
            <li>
              <Link to="/" className="text-white hover:text-pink-300">
                Sign Up / Sign In
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
