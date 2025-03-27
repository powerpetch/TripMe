// config/cloudinary.js
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with your API keys (you can also use environment variables)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Using environment variable for better security
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
