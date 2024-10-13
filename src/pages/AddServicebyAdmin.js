import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom'; // Use this if you're navigating within a React app with routing

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]); // State to hold categories
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage logged-in state
  const navigate = useNavigate(); // Use navigate to programmatically change routes

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // User is logged in
    }
  }, []);
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


  useEffect(() => {
    fetchServices();
    fetchCategories(); // Fetch categories when component mounts
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
      Swal.fire('Error!', 'Could not fetch services.', 'error');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/categories'); // Adjust the API endpoint accordingly
      setCategories(response.data); // Set the categories from the response
    } catch (error) {
      console.error('Error fetching categories:', error);
      Swal.fire('Error!', 'Could not fetch categories.', 'error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:8000/api/services/${currentServiceId}`, formData);
        Swal.fire('Updated!', 'Service has been updated.', 'success');
      } else {
        await axios.post('http://localhost:8000/api/services', formData);
        Swal.fire('Created!', 'Service has been created.', 'success');
      }
      fetchServices(); // Refresh the service list
      resetForm();
    } catch (error) {
      console.error('Error saving service:', error);
      Swal.fire('Error!', 'Could not save service. Please try again.', 'error');
    }
  };

  const handleEdit = (service) => {
    setFormData({
      name: service.name,
      category: service.category?._id || '', // Ensure to use the ID of the category
      description: service.description,
      price: service.price,
    });
    setIsEditing(true);
    setCurrentServiceId(service._id);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/api/services/${id}`);
        Swal.fire('Deleted!', 'Service has been deleted.', 'success');
        fetchServices(); // Refresh the service list
      } catch (error) {
        console.error('Error deleting service:', error);
        Swal.fire('Error!', 'Could not delete service.', 'error');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      description: '',
      price: '',
    });
    setIsEditing(false);
    setCurrentServiceId(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Navbar */}
      <nav className="bg-pink-500 text-white p-4 mb-6 flex justify-between items-center">
        <h1 className="text-lg font-bold">Admin Dashboard</h1>
        <div>
        <ul className="flex space-x-6">
          <Link to="/admin-categories" className="bg-white text-pink-500 py-2 px-4 rounded hover:bg-pink-600 hover:text-white transition duration-300">
            Manage Categories
          </Link>

          {isLoggedIn ? ( // Conditionally render Log Out link
            <li>
              <button onClick={handleLogout} className="bg-white text-pink-500 py-2 px-4 rounded hover:bg-pink-600 hover:text-white transition duration-300">
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

      <h2 className="text-2xl font-bold text-center mb-8 text-pink-500">Manage Services</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Service Name"
          required
          className="w-full mb-2 p-2 border rounded"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full mb-2 p-2 border rounded"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="w-full mb-2 p-2 border rounded"
        />
        <button type="submit" className="bg-pink-500 text-white py-2 px-4 rounded">
          {isEditing ? 'Update Service' : 'Add Service'}
        </button>
        {isEditing && (
          <button type="button" onClick={resetForm} className="bg-gray-300 text-gray-700 py-2 px-4 rounded ml-2">
            Cancel
          </button>
        )}
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service._id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold">{service.name}</h3>
            <p className="text-gray-700">Category: {service.category?.name || 'N/A'}</p>
            <p className="text-gray-700">Description: {service.description}</p>
            <p className="text-gray-700">Price: ${service.price}</p>
            <button
              className="bg-gray-500 text-white py-1 px-2 rounded mr-2"
              onClick={() => handleEdit(service)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white py-1 px-2 rounded"
              onClick={() => handleDelete(service._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminServices;