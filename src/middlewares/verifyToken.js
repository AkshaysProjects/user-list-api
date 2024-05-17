import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

// Initialize dotenv to load environment variables from.env file
configDotenv();

const verifyToken = (req, res, next) => {
  // Accept the token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401); // 401 Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      return res.sendStatus(403); // 403 Forbidden
    }

    // If user does not exist return 404 Not Found
    if (!data) {
      // If no user exists with the given ID return 401 unauthorized
      return res.sendStatus(401); // 401 Unauthorized
    }

    if (!(data.user === "admin" && data.role === "admin")) {
      return res.sendStatus(403); // 403 Forbidden
    }

    next(); // Proceed to the next middleware or route handler
  });
};

export default verifyToken;
