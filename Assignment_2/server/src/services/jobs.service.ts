import prisma from "../../prisma/client";

export const createJob = async (data: {
  ticketId: string;
  storageLocation: string;
  jobType: "COLLECTION" | "DELIVERY";
}) => {
  return await prisma.job.create({
    data: {
      ticketId: data.ticketId,
      storageLocation: data.storageLocation,
      jobType: data.jobType,
      jobStatus: "PENDING",
    },
  });
};

export const getJobById = async (jobId: string) => {
  return await prisma.job.findUnique({ where: { id: jobId } });
};

export const getAllJobs = async () => {
  return await prisma.job.findMany();
};
