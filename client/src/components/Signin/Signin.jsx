import React, { useState } from "react";
import { useDispatch } from "react-redux"; 
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { setLogin } from "../../redux/state.js"; 
import "./Signin.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 
    setSuccess(null);

    try {
      const response = await fetch("https://home-scape-real-estate.vercel.app/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result.message || "Login failed!");
        return;
      }

      const result = await response.json();
      setSuccess("Login successful!");

      dispatch(setLogin({ user: result.user, token: result.token }));

     
      localStorage.setItem("token", result.token);

     
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Login Error:", error);
      setError("An error occurred while logging in. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange}
          required
        />

        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <p>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
