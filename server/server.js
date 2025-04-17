import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import listingRoutes from "./routes/listing.js"

dotenv.config();

const app = express();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(express.static(path.resolve('./public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cors({
  origin: 'https://homescape-real-estate.netlify.app',
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
// app.use("/public", express.static(path.join(__dirname, "public")));

//Routes
app.use("/auth", authRoutes);
app.use("/listing",listingRoutes);


const PORT = process.env.PORT || 8000;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
    });
    console.log("Database connected...");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};

connectDB();

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server started at port: ${PORT}`);
  } else {
    console.log("Error:", err);
  }
});
