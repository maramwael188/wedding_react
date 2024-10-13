import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';



const customJwtDecode = (token) => {
  if (!token) return null;
  const payload = token.split('.')[1];
  const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
  return decodedPayload;
};

const BeautyCenters = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [services, setServices] = useState([]);
  const [eventDate, setEventDate] = useState('');
  const [address, setAddress] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [cardNumber, setCardNumber] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const decodedToken = customJwtDecode(token);
      const userId = decodedToken ? decodedToken.id : null;
      console.log('User ID:', userId);
    }
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/services/category/670aaa54e32baa37c47f45f7');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
      Swal.fire('Error!', 'Could not fetch services. Please try again later.', 'error');
    }
  };

  const handleBooking = (service) => {
    if (!isLoggedIn) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'You must be logged in to book a service.',
      });
      return;
    }
    setSelectedService(service);
    setShowCheckout(true);
  };

  const proceedToCheckout = async () => {
    if (!eventDate || !address) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please enter both the event date and address.',
      });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const decodedToken = customJwtDecode(token);
      const userId = decodedToken ? decodedToken.id : null;
      console.log('User ID:', userId);

      const response = await axios.post('http://localhost:8000/api/bookings', {
        serviceId: selectedService._id,
        eventDate,
        address,
        amount: selectedService.price,
        paymentMethod,
        cardNumber: paymentMethod === 'credit' ? cardNumber : null,
        userId: userId, // Add userId to the booking data
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        icon: 'success',
        title: 'Booking Confirmed',
        text: response.data.message,
      });

      setShowCheckout(false);
      setEventDate('');
      setAddress('');
      setCardNumber('');
      setSelectedService(null);
    } catch (error) {
      console.error('Error creating booking:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Could not complete booking. Please try again later.',
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-8 text-pink-500">Beauty Centers</h2>

      {!showCheckout ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {services.map((option) => (
            <div key={option._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={option.images[0]} alt={option.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-pink-500">{option.name}</h3>
                <p className="text-gray-700">${option.price}</p>
                <button
                  className="bg-pink-500 text-white px-4 py-2 rounded mt-4"
                  onClick={() => handleBooking(option)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-pink-500">Proceed to Checkout</h3>
          <p className="text-gray-700">Service: {selectedService.name}</p>
          <p className="text-gray-700">Amount: ${selectedService.price}</p>

          <div className="mb-4">
            <label className="block text-gray-700">Event Date</label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter your address"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="cash">Cash</option>
              <option value="credit">Credit Card</option>
            </select>
          </div>

          {paymentMethod === 'credit' && (
            <div className="mb-4">
              <label className="block text-gray-700">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Enter your card number"
                required
              />
            </div>
          )}

          <button
            className="bg-pink-500 text-white px-4 py-2 rounded mt-4"
            onClick={proceedToCheckout}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default BeautyCenters;
