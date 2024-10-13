import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log("Token not found in local storage");
      return;
    }

    try {
      const response = await axios.get('http://localhost:8000/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-4 text-pink-500">User Profile</h1>
      {userData ? (
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold text-pink-500">Username:</span>
            <span>{userData.username}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-pink-500">Email:</span>
            <span>{userData.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-pink-500">Phone:</span>
            <span>{userData.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-pink-500">Role:</span>
            <span>{userData.role}</span>
          </div>
        </div>
      ) : (
        <p className="text-center">Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfile;
