import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Loader from "../../utils/Loader";
import { FaLocationDot } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./ListingDetails.css";
import { RiInformation2Fill } from "react-icons/ri";
import { BiSolidArea } from "react-icons/bi";
import { IoPricetags } from "react-icons/io5";
import { GiSofa } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";
import { FaHome } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { GoQuestion } from "react-icons/go";
import { FaCrown } from "react-icons/fa";
import { useSelector } from "react-redux";

const ListingDetails = () => {
  const [loading, setLoading] = useState(true);
  const { _id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const user = useSelector((state) => state.user.user);

  const [showOwnerDetails, setShowOwnerDetails] = useState(false);

  const handleOpen = () => setShowOwnerDetails(true);
  const handleClose = () => setShowOwnerDetails(false);

  const fallbackImage =
    "https://fmqtuifqoyvytggxxfli.supabase.co/storage/v1/object/public/HomeScape/listings/houseplaceholder.jpg";

  const getListingDetails = async () => {
    try {
      const response = await fetch(`https://home-scape-real-estate.vercel.app/listing/${_id}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch listing details");
      }

      const data = await response.json();
      setListing(data);
    } catch (error) {
      console.log("Fetch Details Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (_id) {
      getListingDetails();
    }
  }, [_id]);

  if (loading) return <Loader />;
  if (!listing) return <p>No listing found.</p>;

  return (
    <div className="listing-details-wrapper">
      <div className="listing-slider">
        {listing.images && listing.images.length > 0 ? (
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{ clickable: true }}
            navigation
            modules={[Pagination, Navigation]}
            className="listing-swiper"
          >
            {listing.images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`Listing ${index}`}
                  className="listing-image"
                  onError={(e) => (e.target.src = fallbackImage)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <img
            src={fallbackImage}
            alt="No Image Available"
            className="listing-image"
          />
        )}
      </div>

      <div className="listing-info">
        <h3>{listing.propertyname}</h3>
        <p>
          <FaLocationDot /> {listing.streetAddress}, {listing.city},{" "}
          {listing.country}
        </p>

        <hr />

        <div className="span-container">
          <h6>
            <FaHome />
            <span> Property Category:-</span> {listing.category}
          </h6>
          <h6>
            <FaClipboardList />
            <span> Listed For:-</span> {listing.listingtype}
          </h6>
          <h6>
            <RiInformation2Fill />
            <span> Availability:-</span> {listing.status}
          </h6>
          <h6>
            <SlCalender /> <span>Posted On:- </span>
            {new Date(listing.createdAt).toLocaleDateString("en-GB")}
          </h6>
          <h6>
            <GiSofa />
            <span> Furnishing:-</span> {listing.furnishing}
          </h6>
          <h6>
            <BiSolidArea />
            <span> Carpet Area:-</span> {listing.area} sq. ft.
          </h6>
        </div>
        <hr />

    
        <div className="owner-info">
  {!user ? (
    <div>
      <span><FaCrown /> Owner Details:- </span>
      <button className="sign-in-btn">
        <Link to="/signin">Sign In to See Owner Info</Link>
      </button>
    </div>
  ) : (
    <div>
      <span><FaCrown /> Owner Details:- </span>
      {listing.creator ? (
        <>
          <button className="sign-in-btn" onClick={handleOpen}>
            See Details
          </button>
          {showOwnerDetails && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h3>Owner Details</h3>
                <p><strong>Fullname:</strong> {listing.creator.firstName} {listing.creator.lastName}</p>
                <p><strong>Email:</strong> {listing.creator.email}</p>
                <p><strong>Mobile Number:</strong> {listing.creator?.mobile}</p>
                <button className="close-btn" onClick={handleClose}>Close</button>
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="owner-deleted-msg">
          The user who uploaded this property has deleted their account.
        </p>
      )}
    </div>
  )}
</div>

      </div>

      <div className="listing-description">
        <span>More Details:- </span>
        <p>{listing.description || "No description available"}</p>
        <hr />
        <div className="span-container">
          <h6>
            <GoQuestion />
            <span> Property Type:-</span> {listing.type}
          </h6>
          <h6>
            <GoQuestion />
            <span> Property Age:-</span> {listing.propertyage}
          </h6>
          <h6>
            <GoQuestion />
            <span> Facing:-</span> {listing.facing}
          </h6>
          <h6>
            <GoQuestion />
            <span> Parking Facility:-</span> {listing.parking}
          </h6>
          <h6>
            <GoQuestion />
            <span> Water Availability:-</span> {listing.waterAvailability}
          </h6>
          <h6>
            <GoQuestion />
            <span> Electricity Availability:-</span>{" "}
            {listing.electricityAvailability}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
