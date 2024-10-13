import React from "react";
import logoo from '../assets/images/logoo.png';


const Footer = () => {
  return (
    <footer className="bg-pink-500 text-white p-4 shadow-md">
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-2">
      <img src={logoo} alt="Wedding Bookings Logo" className="h-12 w-12" />
                <div className="text-2xl font-bold">Wedding Services Bookings</div>
      </div>


        {/* Center Section: Links */}
        <ul className="flex space-x-6 mt-4 md:mt-0">
          <li>
            <a href="#privacy" className="text-white hover:text-pink-300">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#terms" className="text-white hover:text-pink-300">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="#faq" className="text-white hover:text-pink-300">
              FAQ
            </a>
          </li>
        </ul>

        {/* Right Section: Copyright */}
        <div className="text-sm mt-4 md:mt-0">
          &copy; {new Date().getFullYear()} Wedding Bookings. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
