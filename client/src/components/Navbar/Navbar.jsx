import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../redux/state.js";
import { PiSignInBold } from "react-icons/pi";
import "./navbar.css";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const user = useSelector((state) => state.user.user);

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState("");

  useEffect(() => {
    if (user) {
      setProfileImageUrl(user.profileImagepath);
    }
  }, [user]);

  const handleMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest(".dropdown-menu") && !event.target.closest(".user-avatar")) {
        setDropdownMenu(false);
      }
    };

    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="HomeScape Logo" className="logo" />
        <span>HomeScape</span>
      </div>

      <ul className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={closeMenu}>Home</Link>
        </li>
        <li>
          <Link to="/about" onClick={closeMenu}>About</Link>
        </li>
        <li>
          <Link to="/properties" onClick={closeMenu}>Properties</Link>
        </li>
      </ul>

      <div className="navbar-actions">
        {!user ? (
          <button className="sign-in-btn">
            <Link to="/signin">
              <PiSignInBold />
              Sign In
            </Link>
          </button>
        ) : (
          <div className="dropdown">
            <img
              src={profileImageUrl}
              alt="Profile"
              className="user-avatar"
              onClick={() => setDropdownMenu(!dropdownMenu)}
            />
            {dropdownMenu && (
              <div className="dropdown-menu">
                <Link to="/createListing">Add a property</Link>
                <Link to={`/${user._id}/mylisting`}>Property List</Link>
                <Link to={`/${user._id}/profile`}>Profile</Link>
                <Link to="/signin" onClick={() => dispatch(setLogout())}>Logout</Link>
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <div className="menu-toggle" onClick={handleMenuToggle}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
