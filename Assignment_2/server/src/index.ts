import createServer from "./utils/createServer";
import prisma from "../prisma/client";

export const app = createServer();

const port = 8080;

async function main() {
  app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
  });
}

main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });



// app.post("/create-job", async (req: Request, res: Response) => {
//   const { ticketId, storageLocation, jobType } = req.body;

//   if (!ticketId || !storageLocation || !jobType) {
//     return res.status(400).json({ message: "Ticket ID, storage location and job type are required" });
//   }

//   if (jobType !== "COLLECTION" && jobType !== "DELIVERY") {
//     return res.status(400).json({ message: "Invalid job type. Valid types are 'COLLECTION' and 'DELIVERY'" });
//   }

//   try {
//     const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });

//     if (!ticket) {
//       return res.status(404).json({ message: "Ticket not found" });
//     }

//     const job = await prisma.job.create({
//       data: {
//         ticketId,
//         storageLocation,
//         jobType,
//         jobStatus: "PENDING",
//       },
//     });

//     return res.status(201).json({
//       message: "Job created successfully",
//       job,
//     });
//   } catch (error) {
//     if (error instanceof PrismaClientValidationError) {
//       return res.status(400).json({ message: error.message });
//     }

//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

// app.get("/get-job", async (req: Request, res: Response) => {
//   const jobId = req.query.id as string;

//   if (!jobId) {
//     return res.status(400).json({ message: "Job ID is required" });
//   }

//   try {
//     const job = await prisma.job.findUnique({ where: { id: jobId } });

//     if (!job) {
//       return res.status(404).json({ message: "Job not found" });
//     }

//     return res.status(200).json(job);
//   } catch (error) {
//     if (error instanceof PrismaClientValidationError) {
//       return res.status(400).json({ message: error.message });
//     }

//     return res.status(500).json({ message: "Internal server error" });
//   }
// });
