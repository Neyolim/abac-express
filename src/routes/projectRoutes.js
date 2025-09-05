import express from "express";
import { verifyToken } from "../middleware/authentication.js";
import { viewProject, updateProject } from "../controller/projectController.js";

const router = express.Router();

// Route to view a project
router.get("/:id", verifyToken, viewProject);

// Route to update a project 
router.put("/:id", verifyToken, updateProject);

export default router;