import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Login/Login.css";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const initialState = {
    first_name: "",
    last_name: "",
    email_address: "",
    mobile_number: "",
    password: "",
    user_type: "User",
  };
  const [usersData, setUsersData] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsersData({ ...usersData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adminKey = "@jlfhjlglguGL#";
    const headers = {};

    if (usersData.user_type === "Admin") {
      headers.admin_key = adminKey;
    }

    console.log("Submitting user data:", usersData);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/user/create`,
        usersData,
        { headers }
      );

      console.log("Response from backend:", response);
      if (
        response.data &&
        response.data.message === "User created successfully"
      ) {
        alert("User Created Successfully");
        setUsersData(initialState);
        navigate("/");
      }
    } catch (error) {
      console.log("Error in form submission:");
      if (error.response) {
        console.log("Error Response Data:", error.response.data);
        console.log("Error Response Status:", error.response.status);
        console.log("Error Response Headers:", error.response.headers);

        setErrorMessage(error.response.data.message || "Something went wrong.");
      } else if (error.request) {
        console.log("No response received:", error.request);
        setErrorMessage(
          "No response received from the server. Please try again later."
        );
      } else {
        console.log("Error Message:", error.message);
        setErrorMessage(`Request error: ${error.message}`);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Create an Account</h1>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          name="first_name"
          placeholder="Enter your first name"
          value={usersData.first_name}
          onChange={handleChange}
          required
        />

        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          name="last_name"
          placeholder="Enter your last name"
          value={usersData.last_name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email_address">Email Address</label>
        <input
          type="email"
          name="email_address"
          placeholder="Enter your email address"
          value={usersData.email_address}
          onChange={handleChange}
          required
        />

        <label htmlFor="mobile_number">Mobile Number</label>
        <input
          type="text"
          name="mobile_number"
          placeholder="Enter your mobile number"
          value={usersData.mobile_number}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={usersData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="user_type">User Type</label>
        <select
          className="user-type"
          name="user_type"
          value={usersData.user_type}
          onChange={handleChange}
        >
          <option>User</option>
          <option>Agent</option>
          <option>Admin</option>
        </select>

        <button type="submit" className="login-btn">
          Sign Up
        </button>
        <div className="login">
          <p>
            Already have an Account? <Link to={"/"}>Login</Link>
          </p>
        </div>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default Signup;
