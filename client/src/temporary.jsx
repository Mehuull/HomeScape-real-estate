import React, { useState } from "react";
import "./CreateListing.css";
import { categories, types } from "../../assets/data";

const CreateListing = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
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
    parking: "No",
    waterAvailability: "",
    electricityAvailability: "",
    description: "",
    images: [],
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrevious = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: files,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final Form Data:", formData);
  };

  return (
    <section className="add-property">
      <h2>Add a Property</h2>
      <form onSubmit={handleSubmit}>
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
                    placeholder="Apartment, Suite (Optional)"
                  />
                </div>
                <div className="details-box">
                  <label>City:</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
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
                    placeholder="Enter country name"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="section">
              <h3>provide some details of property?</h3>
              <div className="primary-details">
                <div className="details-box">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="propertyname"
                    value={formData.propertyname}
                    placeholder="Property name"
                    required
                  />
                </div>
                <div className="details-box">
                  <label>Listing Type:</label>
                  <select
                    name="listingtype"
                    value={formData.listingtype}
                    required
                  >
                    <option value="rent">Rent</option>
                    <option value="sale">Sale</option>
                  </select>
                </div>
                <div className="details-box">
                  <label>Staus:</label>
                  <select name="status" value={formData.status} required>
                    <option value="available">available</option>
                    <option value="unavailable">Unavailabel</option>
                  </select>
                </div>
                <div className="details-box">
                  <label>Area(sqft):</label>
                  <input
                    type="number"
                    name="area"
                    value={formData.area}
                    required
                  />
                </div>
                <div className="details-box">
                  <label>price:(in rupees)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    required
                  />
                </div>
              </div>
            </div>

            <button type="button" className="next-btn" onClick={handleNext}>
              Next →
            </button>
          </div>
        )}

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
                <option value="unfurnished">Unfurnished</option>
                <option value="semi-furnished">Semi-Furnished</option>
                <option value="fully-furnished">Fully-Furnished</option>
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
                <option value="north">North</option>
                <option value="south">South</option>
                <option value="east">East</option>
                <option value="west">West</option>
                <option value="northeast">Northeast</option>
                <option value="northwest">Northwest</option>
                <option value="southeast">Southeast</option>
                <option value="southwest">Southwest</option>
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
                  <option value="No">No Parking</option>
                  <option value="Yes">Parking Available</option>
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
                <option value="periodically">Periodically</option>
                <option value="limited">Limited</option>
                <option value="scarce">Scarce</option>
                <option value="mostly">Mostly</option>
                <option value="always">Always</option>
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
                <option value="periodically">Periodically</option>
                <option value="limited">Limited</option>
                <option value="scarce">Scarce</option>
                <option value="mostly">Mostly</option>
                <option value="always">Always</option>
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
            <div className="details-box">
              <label>Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                cols="50"
              ></textarea>
            </div>

            <div className="details-box">
              <label>Upload Images:</label>
              <input
                type="file"
                multiple
                onChange={(e) =>
                  setFormData({ ...formData, images: e.target.files })
                }
              />
            </div>

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




 {/* Step 3: Other Info */}
//  {step === 3 && (
//   <div className="step">
//     <h3>Other Information</h3>
//     <div className="details-box">
//       <label>Description:</label>
//       <textarea
//         name="description"
//         value={formData.description}
//         onChange={handleChange}
//         rows="4"
//         cols="50"
//       ></textarea>
//     </div>

//     <div className="details-box">
//       <label>Upload Images:</label>
//       <input type="file" multiple onChange={handleImageUpload} />
//     </div>

//     <div className="button-group">
//       <button
//         type="button"
//         className="prev-btn"
//         onClick={handlePrevious}
//       >
//         ← Previous
//       </button>
//       <button type="submit" className="submit-btn">
//         Submit Property
//       </button>
//     </div>
//   </div>
// )}





















//  <div className="properties">
//       <div className="properties-header">
//         <h2>Discover Our Newest Listings</h2>
//       </div>

//       <div className="property-filters">
//         {categories.map((item, index) => (
//           <div key={index} className="category-card">
//             <div
//               className="icon-circle"
//               style={{ backgroundColor: item.color }}
//             >
//               {item.icon}
//             </div>
//             <span className="category-label">{item.label}</span>
//           </div>
//         ))}
//       </div>

//       <div className="property-list">
//         {propertyData.map((property) => (
//           <div key={property.id} className="property-card">
//             <img
//               src={property.image} // Use the imported image directly
//               alt={property.title}
//               className="property-image"
//             />
//             <div className="property-details">
//               <h3>{property.title}</h3>
//               <h4>{property.category} </h4>
//               <p>{property.location}</p>
//               <span className="property-price">{property.price}</span>
//               <p>{property.description} </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>





//card

import {useNavigate } from "react-router-dom"; 

const PropertyCard = ({
  _id,
  category,
  type,
  streetAddress,
  aptSuite,
  city,
  country,
  propertyname,
  listingtype,
  status,
  area,
  price,
  propertyage,
  furnishing,
  facing,
  parking,
  waterAvailability,
  electricityAvailability,
  description,
  images, // Now handling as an array
}) => {
  const imageUrl =
  images && images.length > 0
    ? `http://localhost:8000/${images[0].replace(/\\/g, "/")}` // Convert \ to /
    : "http://localhost:8000/public/listimages/houseplaceholder.jpg"; // Corrected placeholder URL

  console.log("Image URL:", imageUrl); // Debugging

  const navigate = useNavigate();

  return (
    <div className="property-card" onClick={()=>navigate(`/listing/${_id}`)}>
      <img
        src={imageUrl}
        alt={propertyname || "Property Image"}
        className="property-image"
       
      />
      <div className="property-details">
        <h3>{propertyname}</h3>
        <h4>{category}</h4>
        <p>
          {streetAddress}, {city}, {country}
        </p>
        <p>{description ? (description.length > 100 ? description.substring(0, 200) + "..." : description) : "No description available"}</p>
        <span className="property-price">${price}</span>
      </div>
    </div>
  );
};

export default PropertyCard;







// Properties.jsx
import React, { useState, useEffect } from "react";
import "./Properties.css";
import { categories } from "../../assets/data";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../../redux/state.js";
import Loader from "../../utils/Loader.jsx";
import PropertyCard from "./PropertyCard"; // ✅ Ensure correct import

const Properties = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const listings = useSelector((state) => state.listings || []);

  console.log("Redux Listings State:", listings);

  const getQueryListings = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "All"
          ? `http://localhost:8000/listing?category=${selectedCategory}`
          : "http://localhost:8000/listing",
        { method: "GET" }
      );
      const data = await response.json();
      // listings.forEach((property) => console.log("Property Images:", property.images));
      dispatch(setListings(data.reverse())); 
      setLoading(false);
    } catch (err) {
      console.error("Error fetching listings:", err);
    }
  };

  useEffect(() => {
    getQueryListings();
  }, [selectedCategory]);

  return (
    <div className="properties">
      <div className="properties-header">
        <h2>Discover Our Newest Listings</h2>
      </div>

      {/* Category Filters */}
      <div className="property-filters">
        {categories.map((item, index) => (
          <div
            key={index}
            className="category-card"
            onClick={() => setSelectedCategory(item.label)}
          >
            <div className="icon-circle" style={{ backgroundColor: item.color }}>
              {item.icon}
            </div>
            <span className="category-label">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Property Listings */}
      {loading ? (
        <Loader />
      ) : listings.length > 0 ? (
        <div className="property-list">
          {listings.map((property) => (
            <PropertyCard key={property._id} {...property} />
          ))}
        </div>
      ) : (
        <p className="nothingfound">No properties found</p>
      )}
    </div>
  );
};

export default Properties;


//propertycard.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {useNavigate } from "react-router-dom"; 
import { FaLocationDot } from "react-icons/fa6";

const PropertyCard = ({ images = [], propertyname, category, streetAddress, city, country, description, price, _id,}) => {
 
const navigate = useNavigate(); 

  return (
    <div className="property-card" >
      
      {/* Image Slider */}
      {images.length > 0 ? (
        <Swiper slidesPerView={1} spaceBetween={10} pagination={{ clickable: true }} navigation modules={[Pagination, Navigation]} className="property-slider">
          {images.map((img, index) => {
            const formattedImg = `http://localhost:8000/${img.replace(/\\/g, "/")}`;
        
            return (
              <SwiperSlide key={index}>
                <img src={formattedImg} alt={`Property ${index}`} className="property-image" 
                  onError={(e) => e.target.src = "http://localhost:8000/public/listimages/houseplaceholder.jpg"} 
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <img src="http://localhost:8000/public/listimages/houseplaceholder.jpg" alt="No Image Available" className="property-image" />
      )}

      {/* Property Details */}
      <div className="property-details" onClick={() => navigate(`/listing/${_id}`)}>
        <h3>{propertyname}</h3>
        <h4>{category}</h4>
        <p><FaLocationDot /> {streetAddress}, {city}, {country}</p>
        <p>{description?.length > 100 ? description.substring(0, 100) + "..." : description || "No description available"}</p>
        <span className="property-price">${price}</span>
      </div>
      
    </div>
  );
};

export default PropertyCard;

