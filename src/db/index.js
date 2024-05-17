import mongoose from "mongoose";
import { configDotenv } from "dotenv";

// Load environment variables
configDotenv();

// Fetch MONGODB_URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/user-list";

// Connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export { connect };
