import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();

const secretKey = process.env.JWT_SECRET;
const payload = { user: "admin", role: "admin" };

const options = {
  expiresIn: "30d",
};

const token = jwt.sign(payload, secretKey, options);
console.log("Generated Token:", token);
