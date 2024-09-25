import { Request, Response } from "express";
import { createJob, getAllJobs, getJobById } from "../services/jobs.service";
import { getTicketById } from "../services/tickets.service";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

const handleCreateJob = async (req: Request, res: Response) => {
  const { ticketId, storageLocation, jobType } = req.body;

  if (!ticketId || !storageLocation || !jobType) {
    return res.status(400).json({ message: "Missing fields. The required are: ticketId, storageLocation, jobType" });
  }

  if (jobType !== "COLLECTION" && jobType !== "DELIVERY") {
    return res.status(400).json({ message: "Invalid job type. Valid types are 'COLLECTION' and 'DELIVERY'" });
  }

  try {
    const ticket = await getTicketById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    const job = await createJob({ ticketId, storageLocation, jobType });

    return res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleGetJobById = async (req: Request, res: Response) => {
  const jobId = req.params.id;

  try {
    const job = await getJobById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json(job);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleGetJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await getAllJobs();

    if (jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found" });
    }

    return res.status(200).json(jobs);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  handleCreateJob,
  handleGetJobById,
  handleGetJobs,
};
