import React, { useState, useEffect } from "react";
import "./Properties.css";
import { categories } from "../../assets/data";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../../redux/state.js";
import Loader from "../../utils/Loader.jsx";
import PropertyCard from "./PropertyCard";

const Properties = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [searchInputs, setSearchInputs] = useState({
    location: "",
    listingType: "",
    priceRange: "",
  });

  const listings = useSelector((state) => state.user.listings || []);

  // ✅ Update search input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Fetch listings from backend
  const getQueryListings = async () => {
    try {
      setLoading(true);
      let url = "http://localhost:8000/listing";
      const params = new URLSearchParams();

      if (selectedCategory !== "All") params.append("category", selectedCategory);
      if (searchInputs.location.trim() !== "") params.append("city", searchInputs.location.trim());
      if (searchInputs.listingType) params.append("listingType", searchInputs.listingType);
      if (searchInputs.priceRange) params.append("priceRange", searchInputs.priceRange);

      if (params.toString()) url += `?${params.toString()}`;

      const response = await fetch(url);
      const data = await response.json();
      dispatch(setListings(data.reverse()));
    } catch (err) {
      console.error("Error fetching listings:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Auto fetch on category change
  useEffect(() => {
    getQueryListings();
  }, [selectedCategory]);

  // ✅ Manual fetch on search button click
  const handleSearch = () => {
    getQueryListings();
  };
 
    // ✅ Clear all filter fields
    const clearFields = () => {
      setSearchInputs({
        location: "",
        listingType: "",
        priceRange: "",
      });
      setSelectedCategory("All");
      getQueryListings(); 
    };

  return (
    <div className="properties">
      <div className="properties-header">
        <h2>Discover Our Newest Listings</h2>
      </div>

      {/* 🔍 Search Bar */}
      <div className="search-bar">
        <div className="input-group">
          <i className="fas fa-city"></i>
          <input
            type="text"
            placeholder="Enter city name..."
            name="location"
            value={searchInputs.location}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <i className="fas fa-list"></i>
          <select name="listingType" value={searchInputs.listingType} onChange={handleInputChange}>
            <option value="">Listing Type</option>
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
          </select>
        </div>

        <div className="input-group">
          <i className="fas fa-money-bill-wave"></i>
          <select name="priceRange" value={searchInputs.priceRange} onChange={handleInputChange}>
            <option value="">Price Range</option>
            <option value="below10k">Below ₹10,000</option>
            <option value="10k-20k">₹10,000 - ₹20,000</option>
            <option value="20k-50k">₹20,000 - ₹50,000</option>
            <option value="above50k">Above ₹50,000</option>
            <option value="above1lakh">Above ₹100,000</option>
            <option value="above10lakh">Above ₹10Lakh</option>
            <option value="above1cr">Above 1Cr</option>
          </select>
        </div>

        <button onClick={handleSearch} className="searchButton">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
          >
            <g clip-path="url(#clip0_2_17)">
              <g filter="url(#filter0_d_2_17)">
                <path
                  d="M23.7953 23.9182L19.0585 19.1814M19.0585 19.1814C19.8188 18.4211 20.4219 17.5185 20.8333 16.5251C21.2448 15.5318 21.4566 14.4671 21.4566 13.3919C21.4566 12.3167 21.2448 11.252 20.8333 10.2587C20.4219 9.2653 19.8188 8.36271 19.0585 7.60242C18.2982 6.84214 17.3956 6.23905 16.4022 5.82759C15.4089 5.41612 14.3442 5.20435 13.269 5.20435C12.1938 5.20435 11.1291 5.41612 10.1358 5.82759C9.1424 6.23905 8.23981 6.84214 7.47953 7.60242C5.94407 9.13789 5.08145 11.2204 5.08145 13.3919C5.08145 15.5634 5.94407 17.6459 7.47953 19.1814C9.01499 20.7168 11.0975 21.5794 13.269 21.5794C15.4405 21.5794 17.523 20.7168 19.0585 19.1814Z"
                  stroke="white"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  shape-rendering="crispEdges"
                ></path>
              </g>
            </g>
            <defs>
              <filter
                id="filter0_d_2_17"
                x="-0.418549"
                y="3.70435"
                width="29.7139"
                height="29.7139"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood
                  flood-opacity="0"
                  result="BackgroundImageFix"
                ></feFlood>
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                ></feColorMatrix>
                <feOffset dy="4"></feOffset>
                <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                <feComposite in2="hardAlpha" operator="out"></feComposite>
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                ></feColorMatrix>
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_2_17"
                ></feBlend>
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_2_17"
                  result="shape"
                ></feBlend>
              </filter>
              <clipPath id="clip0_2_17">
                <rect
                  width="28.0702"
                  height="28.0702"
                  fill="white"
                  transform="translate(0.403503 0.526367)"
                ></rect>
              </clipPath>
            </defs>
          </svg>
        </button>{" "}
        
        <button className="clear-btn" onClick={clearFields}>
          clear
        </button>
      </div>

      {/* 🏠 Category Filter */}
      <div className="property-filters">
        {categories.map((item, index) => (
          <div
            key={index}
            className={`category-card ${selectedCategory === item.label ? "active" : ""}`}
            onClick={() => setSelectedCategory(item.label)}
          >
            <div className="icon-circle" style={{ backgroundColor: item.color }}>
              {item.icon}
            </div>
            <span className="category-label">{item.label}</span>
          </div>
        ))}
      </div>

      {/* 🏘️ Listings */}
      {loading ? (
        <Loader />
      ) : listings.length > 0 ? (
        <div className="property-list">
          {listings.map((property) => (
            <PropertyCard key={property._id} {...property} />
          ))}
        </div>
      ) : (
        <p className="nothingfound">
          No properties found for:
          <br />
          City: <strong>{searchInputs.location || "Any"}</strong>,
          Type: <strong>{searchInputs.listingType || "Any"}</strong>,
          Price: <strong>{searchInputs.priceRange || "Any"}</strong>,
          Category: <strong>{selectedCategory}</strong>
        </p>
      )}
    </div>
  );
};

export default Properties;
