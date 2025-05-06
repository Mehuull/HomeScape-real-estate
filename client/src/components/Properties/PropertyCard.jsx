import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setListings } from "../../redux/state"; 
import { useSelector } from "react-redux";

const PropertyCard = ({
  images = [],
  propertyname,
  category,
  streetAddress,
  city,
  country,
  description,
  price,
  _id,
  showDeleteButton = false,
  // listings = [], 
}) => {
  const listings = useSelector((state) => state.user.listings);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fallbackImage =
    "https://fmqtuifqoyvytggxxfli.supabase.co/storage/v1/object/public/HomeScape/listings/houseplaceholder.jpg";
  
     // Handle property deletion
  const handleDeleteProperty = () => {
    if (window.confirm('Are you sure you want to delete this property? This action is irreversible.')) {
      axios
        .delete(`https://home-scape-real-estate.vercel.app/listing/${_id}/delete`)
        .then((res) => {
          alert('Property Deleted Successfully!');
          console.log(res.data);
          const updatedListings = listings.filter((item) => item._id !== _id);
          dispatch(setListings(updatedListings));
        })
        .catch((err) => console.error('Property delete failed:', err));
    }
  };

  return (
    <div className="property-card"   onClick={() => navigate(`/listing/${_id}`)}>
      {/* Image Slider */}
      {images.length > 0 ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{ clickable: true }}
          navigation
          modules={[Pagination, Navigation]}
          className="property-slider"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img} //Use direct image URL from Supabase
                alt={`Property ${index}`}
                className="property-image"
                onError={(e) => (e.target.src = fallbackImage)} 
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <img
          src={fallbackImage}
          alt="No Image Available"
          className="property-image"
        />
      )}

      {/* Property Details */}
      <div
        className="property-details"
      >
        <h3>{propertyname}</h3>
        <h4>{category}</h4>
        <p>
          <FaLocationDot /> {streetAddress}, {city}, {country}
        </p>
        <p>
          {description?.length > 100
            ? description.substring(0, 100) + "..."
            : description || "No description available"}
        </p>
        <span className="property-price">₹{price}</span>
        <div>
          {showDeleteButton && (
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation(); 
                handleDeleteProperty(_id, dispatch, navigate); 
              }}
            >
              Delete
            </button>
          )}
        </div>
        <div>
          <h6 onClick={() => navigate(`/listing/${_id}`)}>
            Learn more
          </h6>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
