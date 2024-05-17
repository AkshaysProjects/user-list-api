import { Router } from "express";
import multer from "multer";
import { addUsers, getUsers, getUserById } from "../controllers/listUser.js";

// Create a new express router instance
const router = Router({ mergeParams: true });

// Upload a CSV file
const upload = multer({ dest: "uploads/" });

// Add Users to a List
router.post("/", upload.single("file"), addUsers);

// Get all users in a list
router.get("/", getUsers);

// Get a user by ID
router.get("/:userId", getUserById);

export default router;
