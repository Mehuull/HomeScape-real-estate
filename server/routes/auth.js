import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import { createClient } from "@supabase/supabase-js";
import User from "../models/User.js";
import dotenv from "dotenv";
import https from "https";

dotenv.config();
const router = express.Router();
const agent = new https.Agent({ rejectUnauthorized: true });


//Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
  {
    global: { fetch: (url, options) => fetch(url, { ...options, agent }) },
  }
);

// Multer Storage (Memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

//  User Registration with Supabase Image Upload
router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    const { firstName, lastName, email, password, mobile } = req.body;

    //  Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({
          message: "User already exists! Please try a different email.",
        });
    }

    //  Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let profileImageUrl =
      "https://fmqtuifqoyvytggxxfli.supabase.co/storage/v1/object/public/HomeScape/profile-images/profileimg.png";

    //  Upload Image to Supabase (If Provided)
    if (req.file) {
      const { buffer, originalname, mimetype } = req.file;
      const filePath = `profile-images/${Date.now()}-${originalname}`;
      

      // Upload to Supabase
      const { data, error } = await supabase.storage
        .from("HomeScape") 
        .upload(filePath, buffer, { contentType: mimetype });

      if (error) {
        console.error("Error uploading to Supabase:", error.message);
        return res
          .status(500)
          .json({ message: "Image upload failed", error: error.message });
      }
     
      //get the publicurl of image to be store in mongodb
      const { data: publicUrlData } = supabase.storage
        .from("HomeScape")
        .getPublicUrl(filePath);

      profileImageUrl = publicUrlData.publicUrl;
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImagepath: profileImageUrl, 
      mobile,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully!", user: newUser });
  } catch (err) {
    console.error("Error registering user:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

//login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does't exists! please register.." });
    }

    //compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials!" });
    }

    //generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    delete user.password;


    res.status(200).json({ token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to login" });
  }
});

// Update user profile
router.put("/:_id/profile", async (req, res) => {
  try {
    const { _id } = req.params;
    const updateData = req.body; 
    console.log(updateData)

    //  restrict what fields are allowed to be updated 
    const allowedUpdates = ["firstName", "lastName", "email", "mobile"];
    const updates = Object.keys(updateData);
    const isValidOperation = updates.every((field) => allowedUpdates.includes(field));

    if (!isValidOperation) {
      return res.status(400).json({ message: "Invalid updates detected" });
    }

    // Find and update user
    const updatedUser = await User.findByIdAndUpdate(_id, updateData, {
      new: true, // Return the updated user object
      runValidators: true, // Run schema validations
    }).select("-password"); // Exclude password from response

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser); // Send updated user data
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE - Delete User Profile
router.delete('/:id/profile', async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete user from MongoDB
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found!' });
    }

    res.json({ message: 'User deleted successfully!', user: deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error!' });
  }
});


export default router;
