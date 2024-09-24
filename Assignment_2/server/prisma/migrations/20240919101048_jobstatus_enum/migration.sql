-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "jobStatus" "JobStatus" NOT NULL DEFAULT 'PENDING';
