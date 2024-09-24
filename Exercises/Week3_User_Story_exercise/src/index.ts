import { PrismaClient } from "@prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import express, { Request, Response } from "express";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World!" });
});

app.post("/create-ticket", async (req: Request, res: Response) => {
  const { driverName, companyName, chemical } = req.body;

  try {
    const ticket = await prisma.ticket.create({
      data: {
        driverName,
        companyName,
        chemical,
      },
    });

    return res.status(201).json(ticket);
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/validate-ticket", async (req: Request, res: Response) => {
  const { ticketId, driverName, companyName, chemical } = req.body;

  console.log(ticketId, driverName, companyName, chemical);

  try {
    const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    if (ticket.driverName === driverName && ticket.companyName === companyName && ticket.chemical === chemical) {
      await prisma.ticket.update({
        where: { id: ticketId },
        data: { valid: "APPROVED" },
      });

      return res.status(200).json({ message: "Ticket is valid" });
    }

    return res.status(400).json({ message: "Ticket details are invalid" });
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/create-job", async (req: Request, res: Response) => {
  const { ticketId, storageLocation, jobType } = req.body;

  if (!ticketId || !storageLocation || !jobType) {
    return res.status(400).json({ message: "Ticket ID, storage location and job type are required" });
  }

  if (jobType !== "COLLECTION" && jobType !== "DELIVERY") {
    return res.status(400).json({ message: "Invalid job type. Valid types are 'COLLECTION' and 'DELIVERY'" });
  }

  try {
    const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    const job = await prisma.job.create({
      data: {
        ticketId,
        storageLocation,
        jobType,
        jobStatus: "PENDING",
      },
    });

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
});

app.get("/get-job", async (req: Request, res: Response) => {
  const jobId = req.query.id as string;

  if (!jobId) {
    return res.status(400).json({ message: "Job ID is required" });
  }

  try {
    const job = await prisma.job.findUnique({ where: { id: jobId } });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json(job);
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
