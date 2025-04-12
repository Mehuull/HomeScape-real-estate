import express from "express";
import Listing from "../models/Listing.js";
import multer from "multer";

const router = express.Router();

// ✅ Multer Storage (Temporary Local Uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/listimages/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ Upload Images Route
// router.post("/upload-images", upload.array("Listimage", 5), async (req, res) => {
//   try {
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ message: "No images uploaded" });
//     }

//     console.log("Request Files:", req.files); // Debugging step

//     res.status(201).json({ message: "Images uploaded successfully!", imageUrls });
//   } catch (error) {
//     console.error("Error uploading images:", error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// });

// ✅ Create Listing Route (Using Local Storage)
router.post("/createlisting", upload.array("images", 5), async (req, res) => {
  try {
    console.log("Received Files:", req.files); // Debugging

   

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

       // ✅ Ensure images were uploaded 
       let imageUrls = [];
       if (req.files && req.files.length > 0) {
         imageUrls = req.files.map((file) => file.path);
       }
    

    // ✅ Create new listing with local image URLs
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

    res.status(201).json({ message: "Property listed successfully!", listing: newListing });
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Fetch Listings (With Optional Filtering)
router.get("/", async (req, res) => {
  const qCategory = req.query.category;
  try {
    let listing;
    if (qCategory) {
      listing = await Listing.find({ category: qCategory }).populate("creator");
    } else {
      listing = await Listing.find().populate("creator");
    }
    res.status(200).json(listing);
  } catch (err) {
    res.status(404).json({ message: "Failed to fetch Listings", error: err.message });
    console.log(err);
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

export default router;


//auth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import { createClient } from "@supabase/supabase-js";
import User from "../models/User.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// User registration endpoint
router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    const { firstName, lastName, email, password, mobile } = req.body;
    // const profileImage = req.file ? req.file.path.replace("public/", "") : "uploads/profileimg.png";
    const profileImage = req.file ? req.file.path.replace("public\\", "").replace("public/", "") : "uploads/profileimg.png"; 

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists! please try different email.." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImagepath: profileImage,
      mobile,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!", user: newUser });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

//login user
router.post("/login",async(req,res)=>{
try {
  const {email,password} = req.body;
  //check if user exists
  const user = await User.findOne({ email });
  if(!user){
    return res.status(400).json({ message: "User does't exists! please register.." });
  }

  //compare password
  const isMatch = await bcrypt.compare(password,user.password);
  if(!isMatch){
    return res.status(401).json({message:"Invalid Credentials!"});
  }

  //generate JWT token
  const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{ expiresIn: '1d' });
  delete user.password;
  // console.log(token);

  res.status(200).json({token,user})
} catch (error) {
  console.log(error);
  res.status(500).json({message: 'Failed to login'});
}
});
export default router;
