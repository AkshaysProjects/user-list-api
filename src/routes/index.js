import { Router } from "express";
import listRoutes from "./list.js";

// Create a new express application instance
const router = Router();

// Use the list routes
router.use("/lists", listRoutes);

export default router;
