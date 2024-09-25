import express from "express";
import jobsController from "../controllers/jobs.controller";

const router = express.Router();

router.get("/", jobsController.handleGetJobs);
router.post("/", jobsController.handleCreateJob);
router.get("/:id", jobsController.handleGetJobById);

export default router;
