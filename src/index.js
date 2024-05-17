import express from "express";
import dotenv from "dotenv";
import apiRouter from "./routes/index.js";
import { connect } from "./db/index.js";

// Create a new express application instance
const app = express();

dotenv.config();

// Connect to MongoDB
connect();

// Use global api prefix
app.use("/api", apiRouter);

// Set up the port
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
