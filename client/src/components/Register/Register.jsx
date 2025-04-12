import React, { useState, useContext } from "react"; 
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx"; 
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext); 

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profileImage: null,
    mobile: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(true); 
  // const [showPassword, setShowPassword] = useState(false); // Password visibility toggle

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "profileImage" ? files[0] : value,
    }));
  };

  const handleEmailValidation = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_START" }); // Correct usage of dispatch
    setError(null);
    setIsEmailValid(true);

    // Validate email format
    if (!isEmailValid) {
      setError("Please enter a valid email.");
      return;
    }

    try {
      const registerForm = new FormData();
      for (let key in formData) {
        registerForm.append(key, formData[key]);
      }

      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        body: registerForm,
      });

      const result = await response.json(); // Parsing the response

      if (!response.ok) {
        setError(result.message);
        dispatch({ type: "REGISTER_FAILURE", payload: result.message });
      } else {
        setSuccess("Registration successful!");
        dispatch({ type: "REGISTER_SUCCESS", payload: result });
        setTimeout(() => {
          navigate("/Signin");
        }, 1000);
        setFormData({ firstName: "", lastName: "", email: "", password: "", mobile: "", profileImage: null }); // Reset the form after success
      }
    } catch (error) {
      setError("An error occurred while registering. Please try again later.");
      dispatch({ type: "REGISTER_FAILURE", payload: error.message });
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
        {success && <p className="success-message">{success}</p>} {/* Display success message */}

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => {
            handleChange(e);
            handleEmailValidation(e.target.value); // Validate email on change
          }}
          required
        />
        {!isEmailValid && <p className="error-message">Please enter a valid email.</p>} {/* Show invalid email message */}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      
        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
        <div className="profile-image-input">
          <label htmlFor="profileImage">Upload Profile Image</label>
          <input
            type="file"
            name="profileImage"
            id="profileImage"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <button type="submit">Register</button>
        <p>
          Already have an account? <a href="/signin">Sign In</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
