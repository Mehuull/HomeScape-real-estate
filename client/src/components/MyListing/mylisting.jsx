import React from "react";
import { useSelector } from "react-redux";
import PropertyCard from "../Properties/PropertyCard";

const MyListings = () => {
  const user = useSelector((state) => state.user.user); // Get current user
  const listings = useSelector((state) => state.user.listings) || []; // Safe fallback

  // Correctly filter user-specific listings
  const myListings = React.useMemo(() => {
    if (!user || !Array.isArray(listings)) return [];
    
    return listings.filter((property) => {
      const creatorId = property?.creator?._id || property?.creator;
      return creatorId?.toString() === user._id?.toString();
    });
  }, [user, listings]);

  // User not logged in
  if (!user) {
    return <p>Please log in to view your uploaded properties.</p>;
  }

  return (
    <div className="my-listings">
      <h2 style={{ margin: "1rem", fontFamily: "var(--font-family-4)" }}>
        Properties uploaded by {user.firstName}:
      </h2>
      {myListings.length > 0 ? (
        <div className="property-list">
          {myListings.map((property) => (
            <PropertyCard
              key={property._id}
              {...property}
              showDeleteButton={true}
            />
          ))}
        </div>
      ) : (
        <p
          style={{
            margin: "1rem",
            fontFamily: "var(--font-family-4)",
            textAlign: "center",
          }}
        >
          You have not uploaded any properties yet.
        </p>
      )}
    </div>
  );
};

export default MyListings;
