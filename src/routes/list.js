import { Router } from "express";
import {
  createList,
  deleteList,
  getAllLists,
  getListById,
  updateList,
} from "../controllers/list.js";

// Create a new express router instance
const router = Router();

// Create a list
router.post("/", createList);

// Get all lists
router.get("/", getAllLists);

// Get a list by id
router.get("/:id", getListById);

// Update a list by id
router.put("/:id", updateList);

// Delete a list by id
router.delete("/:id", deleteList);

export default router;
