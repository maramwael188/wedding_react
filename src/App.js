import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Services from './components/Services';
import Footer from './components/Footer';
import DressPage from './pages/DressPage';
import MakeupPage from './pages/MakeupPage';
import BeautyCenterPage from './pages/BeautyCenterPage';
import PhotographerPage from './pages/PhotographerPage';
import CarsPage from './pages/CarsPage';
import TripsPage from './pages/TripsPage';
import UserBookings from './pages/UserBookings';
import SignUpSignIn from './components/SignUpSignIn'; // Import SignUpSignIn component
import UserProfile from './pages/UserProfile'; // Import UserProfile component
import AdminServices from './pages/AddServicebyAdmin';
import AdminCategories from './pages/AddCategorybyAdmin';
import AboutPage from './pages/About';
import ContactPage from './pages/ContactPage';


const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <ConditionalLayout /> {/* Use the conditional layout component */}
      </div>
    </Router>
  );
};

// Component to conditionally render the Navbar and Footer
const ConditionalLayout = () => {
  const location = useLocation();

  // Define which paths should not show the Navbar and Footer
  const noNavbarFooterPaths = ['/', '/signup-signin','/admin-services', "/admin-categories" ]; // Adjust paths as needed

  return (
    <>
      {!noNavbarFooterPaths.includes(location.pathname) && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<SignUpSignIn />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/admin-services" element={<AdminServices />} />
          <Route path="/admin-categories" element={<AdminCategories />} />
          <Route path="/Home" element={<Services />} /> 
          <Route path="/user-bookings" element={<UserBookings />} />
          <Route path="/dress" element={<DressPage />} />
          <Route path="/makeup" element={<MakeupPage />} />
          <Route path="/beauty-center" element={<BeautyCenterPage />} />
          <Route path="/photographer" element={<PhotographerPage />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/trips" element={<TripsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      {!noNavbarFooterPaths.includes(location.pathname) && <Footer />}
    </>
  );
};

export default App;
