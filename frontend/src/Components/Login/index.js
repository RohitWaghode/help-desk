import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

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
      const response = await fetch(
        `https://help-desk-flax-omega.vercel.app/help-desk/v1/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      if (data && data.output) {
        console.log(response);
        localStorage.setItem("user_uid", data.output.user_uid);
        localStorage.setItem("user_type", data.output.user_type);
        localStorage.setItem("customer_name", data.output.customer_name);
        alert("User Login Successfully");
        navigate("/dashboard");
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.log("Error in login:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h3 className="title">Help-Desk App</h3>
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
            Don't have an account? <Link to={"/signup"}>Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
