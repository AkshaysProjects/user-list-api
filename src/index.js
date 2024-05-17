import express from "express";
import dotenv from "dotenv";

// Create a new express application instance
const app = express();

dotenv.config();

// Root path
app.get("/", (_req, res) => {
  res.send("Hello world!");
});

// Set up the port
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
