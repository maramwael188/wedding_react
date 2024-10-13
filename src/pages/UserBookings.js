import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token'); // Fetch the token from localStorage

        if (!token) {
          setError("You must be logged in to view your bookings.");
          return;
        }

        const response = await axios.get("http://localhost:8000/api/bookings/me/bookings", {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        });

        setBookings(response.data); // Set bookings data
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Error fetching bookings."); // Set error message
      }
    };

    fetchBookings();
  }, []); // Fetch bookings when the component mounts

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-pink-500">Your Booking History</h2>
      
      {error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : bookings.length === 0 ? (
        <p className="text-center">You have no bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div key={booking._id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-xl font-semibold text-pink-500">{`Booking ID: ${booking._id}`}</h3>
            <p className="text-gray-700">
              Service: {booking.serviceId ? booking.serviceId.name : 'Unknown Service'}
            </p>
            <p className="text-gray-700">
              Event Date: {booking.eventDate ? new Date(booking.eventDate).toLocaleDateString() : 'N/A'}
            </p>
            <p className="text-gray-700">Status: {booking.status}</p>
            <p className="text-gray-700">Amount: ${booking.amount.toFixed(2)}</p>
            <p className="text-gray-500">
              Booking Date: {new Date(booking.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>      
      )}
    </div>
  );
};

export default UserBookings;
