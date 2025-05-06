// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import express from "express";
import multer from "multer";
import { createClient } from "@supabase/supabase-js";
import Listing from "../models/Listing.js";
import Property  from "../models/Listing.js";
import dotenv from "dotenv";
import https from "https";


import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const agent = new https.Agent({ rejectUnauthorized: true });
const router = express.Router();
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
  {
    global: { fetch: (url, options) => fetch(url, { ...options, agent }) },
  }
);

//  Multer Storage 
const storage = multer.memoryStorage();
const upload = multer({ storage });

//  Upload Images to Supabase and Create Listing
router.post("/createlisting", upload.array("images", 5), async (req, res) => {
  try {
    console.log("Received Files:", req.files); // Debugging

    // Extract Listing Data from Request Body
    const {
      creator,
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
    } = req.body;

    //  Upload Each Image to Supabase
    let imageUrls = [];
    for (const file of req.files) {
      const { buffer, originalname, mimetype } = file;
      const filePath = `listings/${Date.now()}-${originalname}`; // Unique File Name

      //  Upload to Supabase
      const { data, error } = await supabase.storage
        .from("HomeScape") //Supabase Storage Bucket
        .upload(filePath, buffer, { contentType: mimetype });

      if (error) {
        console.error("Error uploading to Supabase:", error.message);
        return res
          .status(500)
          .json({ message: "Upload failed", error: error.message });
      }

      // Generate Public URL
      const { data: publicUrlData } = supabase.storage
        .from("HomeScape")
        .getPublicUrl(filePath);
      const publicURL = publicUrlData.publicUrl; // Extract only the string URL
      imageUrls.push(publicURL);
    }

    // Save Listing to MongoDB
    const newListing = new Listing({
      creator,
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
      images: imageUrls,
    });

    await newListing.save();

    res
      .status(201)
      .json({ message: "Property listed successfully!", listing: newListing });
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});



// Fetch Listings (With Optional Filtering)
// Route to Fetch Listings Based on Category and/or City
router.get("/", async (req, res) => {
  const qCategory = req.query.category;
  const { city, listingType, priceRange } = req.query;

  try {
    // Dynamically create filter object
    let filter = {};

    // If category filter is applied
    if (qCategory) {
      filter.category = qCategory;
    }

       // Filter by city (case-insensitive)
       if (city) {
        filter.city = { $regex: new RegExp(city, "i") };
      }
  
      // Filter by listing type
      if (listingType) {
        filter.listingtype = listingType; 
      }
  
      // Filter by price range
      if (priceRange) {
        switch (priceRange) {
          case "below10k":
            filter.price = { $lt: 10000 };
            break;
          case "10k-20k":
            filter.price = { $gte: 10000, $lte: 20000 };
            break;
          case "20k-50k":
            filter.price = { $gte: 20000, $lte: 50000 };
            break;
          case "above50k":
            filter.price = { $gt: 50000 };
            break;
          case "above1lakh":
            filter.price = { $gte: 100000 };
            break;
          case "above10lakh":
            filter.price = { $gte: 1000000 };
            break;
          case "above1cr":
            filter.price = { $gte: 10000000 };
            break;

          default:
            break;
        }
      }
  
    // Fetch listings based on dynamic filter and populate creator
    const listing = await Listing.find(filter).populate("creator");

    res.status(200).json(listing);
  } catch (err) {
    console.error("Error fetching listings:", err);
    res.status(404).json({ message: "Failed to fetch Listings", error: err.message });
  }
});



// Listing details route
router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const listing = await Listing.findById(_id).populate("creator");

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// Get current user's listings
router.get("/:_id/mylistings", async (req, res) => {
  try {
    const { _id } = req.params;
    const listings = await Listing.find({ creator: _id });
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE - Delete a property listing by ID
router.delete('/:id/delete', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find and delete the property from MongoDB
    const deletedProperty = await Property.findByIdAndDelete(id);

    if (!deletedProperty) {
      return res.status(404).json({ message: 'Property not found!' });
    }

    res.json({ message: 'Property deleted successfully!', property: deletedProperty });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ message: 'Server error!' });
  }
});


router.post("/generate-description", async (req, res) => {
  try {
    const {
      creator,
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
    } = req.body;

    const addressParts = [streetAddress, aptSuite, city, country].filter(Boolean);
    const address = addressParts.join(", ");

    let prompt = `Generate 2 informative paragraphs describing a real estate property using the following details:\n`;

    if (propertyname) prompt += `Property Name: ${propertyname}\n`;
    if (address) prompt += `Address: ${address}\n`;
    if (category) prompt += `Category: ${category}\n`;
    if (type) prompt += `Type: ${type}\n`;
    if (listingtype) prompt += `Listing Type: ${listingtype}\n`;
    if (status) prompt += `Status: ${status}\n`;
    if (area) prompt += `Area (in Sqft): ${area}\n`;
    if (price) prompt += `Price: ${price}\n`;
    if (propertyage) prompt += `Property Age: ${propertyage} years\n`;
    if (furnishing) prompt += `Furnishing: ${furnishing}\n`;
    if (facing) prompt += `Facing: ${facing}\n`;
    if (parking) prompt += `Parking: ${parking}\n`;
    if (waterAvailability) prompt += `Water Availability: ${waterAvailability}\n`;
    if (electricityAvailability) prompt += `Electricity Availability: ${electricityAvailability}\n`;
    if (description) prompt += `Additional Description: ${description}\n`;

    prompt += `\nIgnore any undefined or missing values. Use the given information to generate realistic and engaging content.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedText = response.text();
    console.log(generatedText);

    res.status(200).json({ description: generatedText });
  } catch (error) {
    console.error("AI generation error:", error);
    res.status(500).json({ error: "Failed to generate description" });
  }
});


export default router;