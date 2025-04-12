import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    creator: { type: mongoose.Schema.Types.ObjectId, ref:"User",required: true }, 
    category: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    streetAddress: { type: String, required: true },
    aptSuite: { type: String },
    city: { type: String, required: true },
    country: { type: String, required: true },
    propertyname: { type: String, required: true }, // Consider renaming if needed
    listingtype: { 
      type: String,
      enum:["rent","sale"],
      required: true 
    },
    status: { type: String, required: true },
    area: { type: Number, required: true },
    price: { type: Number, required: true },
    propertyage: { type: Number, required: true },
    furnishing: {
      type: String,
      enum: ["Unfurnished", "Semi-furnished", "Fully-furnished"],
      required: true,
    },
    facing: {
      type: String,
      enum: ["North", "South", "East", "West","Northeast","Northwest","Southeast","Southwest"],
      required: true,
    },
    parking: { 
      type: String,
      enum:["Available","Unavailable"],
      required: true 
    },
      waterAvailability: {
      type: String,
      enum: ["Periodically", "Limited", "Scarce", "Mostly", "Always"],
      required: true,
    },
    electricityAvailability: {
      type: String,
      enum: ["Periodically", "Limited", "Scarce", "Mostly", "Always"],
      required: true,
    },
    description:{
      type: String,
      required: true 
    },
    images: {
      type: [String],
      required:false,
    },
    
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);
export default Listing;
