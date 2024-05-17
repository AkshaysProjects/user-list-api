import { Router } from "express";
import listRoutes from "./list.js";
import listUserRoutes from "./listUser.js";

// Create a new express application instance
const router = Router();

// Use the list routes
router.use("/lists", listRoutes);

// Use the list user routes
router.use("/lists/:listId/users", listUserRoutes);

export default router;
