import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      email_address: email,
      password,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/user/login`,
        loginData
      );
      if (response.data && response.data.output) {
        console.log(response);
        localStorage.setItem("user_uid", response.data.output.user_uid);
        localStorage.setItem("user_type", response.data.output.user_type);
        localStorage.setItem(
          "customer_name",
          response.data.output.customer_name
        );
        alert("User Login Successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login-container">
      <div className="login-header">
        <h3 className="title">Help-Desk App </h3>
        <h2>Welcome Back</h2>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-btn">
          Log in
        </button>
        <div className="signup">
          <p>
            Don't have a account<Link to={"/signup"}>Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
