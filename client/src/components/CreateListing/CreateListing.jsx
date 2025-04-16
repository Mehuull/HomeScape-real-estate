import React, { useState ,useEffect} from "react";
import "./CreateListing.css";
import { categories, types } from "../../assets/data";
import {useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState(""); 
const [success, setSuccess] = useState(""); 
const user = useSelector((state) => state.user.user); 
const creatorId = useSelector((state) => state.user?.user?._id);
const navigate = useNavigate();

useEffect(() => {
  if (!user) {
    navigate("/signin");
  }
}, [user, navigate]); 

  const [formData, setFormData] = useState({
    creator: creatorId || "", 
    category: "",
    type: "",
    streetAddress: "",
    aptSuite: "",
    city: "",
    country: "",
    propertyname: "",
    listingtype: "",
    status: "",
    area: "",
    price: "",
    propertyage: "",
    furnishing: "",
    facing: "",
    parking: "",
    waterAvailability: "",
    electricityAvailability: "",
    description:"",
    images:[],
  });
  console.log(formData);


  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrevious = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? Array.from(files) : value, // ✅ Handle both text and file inputs
    }));
  };
  

const handleSubmit = async (e) => {
  e.preventDefault();
  setError(""); 
  setSuccess(""); 

    // ✅ Required fields (except images)
    const requiredFields = [
      "category",
      "type",
      "streetAddress",
      "city",
      "country",
      "propertyname",
      "listingtype",
      "status",
      "area",
      "price",
      "propertyage",
      "furnishing",
      "facing",
      "parking",
      "waterAvailability",
      "electricityAvailability",
      "description",
    ];
  
    // ✅ Check if any required field is empty
    const emptyFields = requiredFields.filter((field) => !formData[field]);
  
    if (emptyFields.length > 0) {
      setError("All fields are required! Please fill in all details.");
      return;
    }
    if (formData.description.length > 12 ){
      setError("Please describe property into Atleast 1 or 2 line.. ")
    }

  try {
    const formDataToSend = new FormData();

    // ✅ Append all form fields (Avoid empty values)
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "images" && value) { // ✅ Only add non-empty fields
        formDataToSend.append(key, value);
      }
    });

    // ✅ Append all selected images
    if (formData.images.length > 0) {
      formData.images.forEach((file) => {
        formDataToSend.append("images", file);
      });
    }

     // ✅ Debug: Log FormData before sending
     console.log("FormData before sending:");
     for (let pair of formDataToSend.entries()) {
       console.log(`${pair[0]}:`, pair[1]); // Should log File objects, not "fakepath"
     }

    // ✅ Send everything in one request
    const response = await fetch("https://home-scape-real-estate.vercel.app/listing/createlisting", {
      method: "POST",
      body: formDataToSend, // ✅ Send as FormData
    });

    const result = await response.json();
    console.log(result);

    if (response.ok) {
      setSuccess("Property listed successfully!");
      setFormData({
        creator: creatorId,
        category: "",
        type: "",
        streetAddress: "",
        aptSuite: "",
        city: "",
        country: "",
        propertyname: "",
        listingtype: "",
        status: "",
        area: "",
        price: "",
        propertyage: "",
        furnishing: "",
        facing: "",
        parking: "",
        waterAvailability: "",
        electricityAvailability: "",
        description:"",
        images: [],
      });
      navigate("/properties")
    } else {
      alert(result.message || "Something went wrong. Please try again.");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Network error. Please check your connection and try again.");
  }
};





  return (
    <section className="add-property">
      <h2>Add a Property</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Step 1: Basic Details */}
        {step === 1 && (
          <div className="step">
            <h3>Primary Details</h3>
            <div className="categories-container">
              {categories.map((item, index) => (
                <div
                  key={index}
                  className={`category-card ${
                    formData.category === item.label ? "selected" : ""
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, category: item.label })
                  }
                >
                  <div
                    className="icon-circle"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.icon}
                  </div>
                  <span className="category-label">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="types-container">
              {types.map((item, index) => (
                <div
                  key={index}
                  className={`type-card ${
                    formData.type === item.name ? "selected" : ""
                  }`}
                  onClick={() => setFormData({ ...formData, type: item.name })}
                >
                  <div className="type-info">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="type-icon">{item.icon}</div>
                </div>
              ))}
            </div>

            {/* Address Section */}
            <div className="section">
              <h3>What's the address of your place?</h3>
              <div className="place-details">
                <div className="details-box">
                  <label>Street Address:</label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleChange}
                    placeholder="Enter street name"
                    required
                  />
                </div>
                <div className="details-box">
                  <label>Apartment, Suite (Optional):</label>
                  <input
                    type="text"
                    name="aptSuite"
                    value={formData.aptSuite}
                    onChange={handleChange}
                    placeholder="Apartment, Suite (Optional)"
                  />
                </div>
                <div className="details-box">
                  <label>City:</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city name"
                    required
                  />
                </div>
                <div className="details-box">
                  <label>Country:</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Enter country name"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="section">
              <h3>Provide some details of property</h3>
              <div className="primary-details">
                <div className="details-box">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="propertyname"
                    value={formData.propertyname}
                    onChange={handleChange}
                    placeholder="Property name"
                    required
                  />
                </div>
                <div className="details-box">
                  <label>Listing Type:</label>
                  <select
                    name="listingtype"
                    value={formData.listingtype}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Listing Type</option>
                    <option value="rent">Rent</option>
                    <option value="sale">Sale</option>
                  </select>
                </div>
                <div className="details-box">
                  <label>Status:</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
                </div>
                <div className="details-box">
                  <label>Area (sqft):</label>
                  <input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    required
                  />
                </div>
                {formData.listingtype === "rent" ? (
                  <div className="details-box">
                    <label>Price /month (in rupees):</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ) : (
                  <div className="details-box">
                    <label>Price (in rupees):</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}
              </div>
            </div>

            <button type="button" className="next-btn" onClick={handleNext}>
              Next →
            </button>
          </div>
        )}

        {/* Step 2 and Step 3 remain unchanged but now properly handle `onChange` events */}
        {/* Step 2: Secondary Info */}
        {step === 2 && (
          <div className="secondary-details">
            <h3>Secondary Details</h3>

            <div className="details-box">
              <label>Property Age (in years):</label>
              <input
                type="number"
                name="propertyage"
                value={formData.propertyage}
                onChange={handleChange}
              />
            </div>

            <div className="details-box">
              <label>Furnishing:</label>
              <select
                name="furnishing"
                value={formData.furnishing}
                onChange={handleChange}
              >
                <option value="">Select Furnishing</option>
                <option value="Unfurnished">Unfurnished</option>
                <option value="Semi-furnished">Semi-Furnished</option>
                <option value="Fully-furnished">Fully-Furnished</option>
              </select>
            </div>

            <div className="details-box">
              <label>Facing Direction:</label>
              <select
                name="facing"
                value={formData.facing}
                onChange={handleChange}
              >
                <option value="">Select Direction</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="East">East</option>
                <option value="West">West</option>
                <option value="Northeast">Northeast</option>
                <option value="Northwest">Northwest</option>
                <option value="Southeast">Southeast</option>
                <option value="Southwest">Southwest</option>
              </select>
            </div>

            <div className="details-box">
              <label>
                Parking Availability:
                <select
                  name="parking"
                  value={formData.parking}
                  onChange={handleChange}
                >
                  <option>select</option>
                  <option value="Available">No Parking</option>
                  <option value="Unavailable">Available</option>
                </select>
              </label>
            </div>

            <div className="details-box">
              <label>Water Availability:</label>
              <select
                name="waterAvailability"
                value={formData.waterAvailability}
                onChange={handleChange}
              >
                <option value="">Select Water Availability</option>
                <option value="Periodically">Periodically</option>
                <option value="Limited">Limited</option>
                <option value="Scarce">Scarce</option>
                <option value="Mostly">Mostly</option>
                <option value="Always">Always</option>
              </select>
            </div>

            <div className="details-box">
              <label>Electricity Availability:</label>
              <select
                name="electricityAvailability"
                value={formData.electricityAvailability}
                onChange={handleChange}
              >
                <option value="">Select Electricity Availability</option>
                <option value="Periodically">Periodically</option>
                <option value="Limited">Limited</option>
                <option value="Scarce">Scarce</option>
                <option value="Mostly">Mostly</option>
                <option value="Always">Always</option>
              </select>
            </div>

            <div className="button-group">
              <button
                type="button"
                className="prev-btn"
                onClick={handlePrevious}
              >
                ← Previous
              </button>
              <button type="button" className="next-btn" onClick={handleNext}>
                Next →
              </button>
            </div>
          </div>
        )}


        {/* Step 3: Other Info */}
  {step === 3 && (
  <div className="step">
    <h3>Other Information</h3>
    { <div className="details-box">
      <label>Description:</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows="4"
        cols="50"
      ></textarea>
    </div> }

    <div className="details-box">
      <label>Upload Images:</label>
      <input type="file" accept="image/*" name="images" onChange={handleChange} multiple />
    </div>

      {/* Display Error Message */}
    {error && <div className="error">{error}</div>}
    
    {/* Display Success Message */}
    {success && <div className="success">{success}</div>}

    <div className="button-group">
      <button
        type="button"
        className="prev-btn"
        onClick={handlePrevious}
      >
        ← Previous
      </button>
      <button type="submit" className="submit-btn">
        Submit Property
      </button>
    </div>
  </div>
 )} 

      </form>
    </section>
  );
};

export default CreateListing;
