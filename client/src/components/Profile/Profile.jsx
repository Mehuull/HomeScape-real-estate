import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import './Profile.css';
import { updateUser ,setLogout} from '../../redux/state.js'; // Action to update user in Redux

const Profile = () => {
  const { _id } = useParams();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false); // Manage Edit Mode
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    mobile: user.mobile || '',
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit (fix applied here)
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    axios
      .put(`https://home-scape-real-estate.vercel.app/auth/${_id}/profile`, formData)
      .then((res) => {
        alert('Profile Updated Successfully!');
        console.log(res.data);
        dispatch(updateUser(res.data)); // Optional: update Redux user data
        setIsEditing(false); // Exit edit mode
      })
      .catch((err) => console.error('Update failed:', err));
  };


   // ✅ Handle delete user (DELETE request)
   const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this account? This action is irreversible.')) {
      axios
        .delete(`http://localhost:8000/auth/${_id}/profile`)
        .then((res) => {
          alert('Account Deleted Successfully!');
          dispatch(setLogout());
          console.log(res.data);
          navigate('/login'); // Redirect to home or login page after deletion
        })
        .catch((err) => console.error('Delete failed:', err));
    }
  };

  return (
    <div className="profile-container">
      {!isEditing ? (
        <div className="profile-details">
          <h1>Profile Details:</h1>
          <hr />
          <h4>
            <span>Username: </span>
            {user.firstName}
          </h4>
          <h4>
            <span>Surname: </span>
            {user.lastName}
          </h4>
          <h4>
            <span>Email: </span>
            {user.email}
          </h4>
          <h4>
            <span>Mobile: </span>
            {user?.mobile}
          </h4>
          <button onClick={() => setIsEditing(true)} className="edit-btn">
            Edit
          </button>

          <div className='logout-delete'>
            <button className='sign-in-btn'><Link to="/signin" onClick={() => dispatch(setLogout())}> LOG OUT </Link></button> <button className='sign-in-btn' onClick={handleDelete} ><Link to="/signin" > Delete Account</Link></button>
          </div>
        </div>
      ) : (
        <form className="profile-update" onSubmit={handleSubmit}>
          <h1>Edit Profile:</h1>
          <hr />
          <label>Username:*</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <label>Surname:*</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <label>Email:*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Mobile number:*</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
          <div className="btn-group">
            <button type="submit" className="save-btn">
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
