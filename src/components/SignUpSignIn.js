import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const customJwtDecode = (token) => {
  if (!token) return null;
  const payload = token.split('.')[1];
  const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
  return decodedPayload;
};

const SignupSignin = () => {
  // States for form data
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isSignIn, setIsSignIn] = useState(true); // Toggle between Sign-In and Sign-Up

  // Handle sign-up
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/users/signup", {
        username,
        email,
        password,
        phone,
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.data.message,
      });
      // Optionally redirect to sign in page
      setIsSignIn(true); // Switch to sign-in mode after successful sign-up
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "An error occurred during sign-up",
      });
      console.log(error);
    }
  };

  // Handle sign-in
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/users/signin", {
        email,
        password,
      });
      
      Swal.fire({
        icon: "success",
        title: "Welcome",
        text: "Successfully signed in!",
      });
      
      const decodedToken = customJwtDecode(response.data.token);
      const userRole = decodedToken ? decodedToken.role : null;
      console.log('User Role:', userRole);

      // Store JWT token in localStorage
      localStorage.setItem("token", response.data.token);
      console.log("full response", response.data);

      if(userRole === "admin") {
        // Redirect to Admin Services page
        window.location.href = "/admin-services";
        console.log('Admin Services Page');
      }
      else {
      // Redirect to Home page or user profile
      window.location.href = "/Home";
      console.log('Home Page');
      }
      
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Invalid email or password",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4 text-pink-500">
        {isSignIn ? "Sign In" : "Sign Up"}
      </h2>
      <form onSubmit={isSignIn ? handleSignIn : handleSignUp}>
        {/* Sign Up Form */}
        {!isSignIn && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
          </>
        )}

        {/* Common Email and Password Fields for Sign Up & Sign In */}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition duration-300"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
      </form>

      <p className="text-center mt-4">
        {isSignIn ? "Don't have an account?" : "Already have an account?"}
        <button
          onClick={() => setIsSignIn(!isSignIn)}
          className="text-pink-500"
        >
          {isSignIn ? "Sign Up" : "Sign In"}
        </button>
      </p>
    </div>
  );
};

export default SignupSignin;
