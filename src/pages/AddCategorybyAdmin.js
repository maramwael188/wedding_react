import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom'; // Use this if you're navigating within a React app with routing

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);

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
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/categories');
      setCategories(response.data);
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
        await axios.put(`http://localhost:8000/api/categories/${currentCategoryId}`, formData);
        Swal.fire('Updated!', 'Category has been updated.', 'success');
      } else {
        await axios.post('http://localhost:8000/api/categories', formData);
        Swal.fire('Created!', 'Category has been created.', 'success');
      }
      fetchCategories(); // Refresh the category list
      resetForm();
    } catch (error) {
      console.error('Error saving category:', error);
      Swal.fire('Error!', 'Could not save category. Please try again.', 'error');
    }
  };

  const handleEdit = (category) => {
    setFormData({
      name: category.name,
      description: category.description,
    });
    setIsEditing(true);
    setCurrentCategoryId(category._id);
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
        await axios.delete(`http://localhost:8000/api/categories/${id}`);
        Swal.fire('Deleted!', 'Category has been deleted.', 'success');
        fetchCategories(); // Refresh the category list
      } catch (error) {
        console.error('Error deleting category:', error);
        Swal.fire('Error!', 'Could not delete category.', 'error');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
    });
    setIsEditing(false);
    setCurrentCategoryId(null);
  };

  return ( 
    <div className="max-w-7xl mx-auto p-4">
      {/* Navbar */}
      <nav className="bg-pink-500 text-white p-4 mb-6 flex justify-between items-center">
        <h1 className="text-lg font-bold">Admin Dashboard</h1>
        <div>
        <ul className="flex space-x-6">
          <Link to="/admin-services" className="bg-white text-pink-500 py-2 px-4 rounded hover:bg-pink-600 hover:text-white transition duration-300">
            Manage Services
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

      <h2 className="text-2xl font-bold text-center mb-8 text-pink-500">Manage Categories</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Category Name"
          required
          className="w-full mb-2 p-2 border rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full mb-2 p-2 border rounded"
        />
        <button type="submit" className="bg-pink-500 text-white py-2 px-4 rounded">
          {isEditing ? 'Update Category' : 'Add Category'}
        </button>
        {isEditing && (
          <button type="button" onClick={resetForm} className="bg-gray-300 text-gray-700 py-2 px-4 rounded ml-2">
            Cancel
          </button>
        )}
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category._id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold">{category.name}</h3>
            <p className="text-gray-700">Description: {category.description}</p>
            <button
              className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
              onClick={() => handleEdit(category)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white py-1 px-2 rounded"
              onClick={() => handleDelete(category._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCategories;
