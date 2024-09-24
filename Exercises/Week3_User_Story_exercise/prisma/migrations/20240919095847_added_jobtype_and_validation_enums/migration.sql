/*
  Warnings:

  - The `valid` column on the `Ticket` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `jobType` on the `Job` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "validation" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('COLLECTION', 'DELIVERY');

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "jobType",
ADD COLUMN     "jobType" "JobType" NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "valid",
ADD COLUMN     "valid" "validation" NOT NULL DEFAULT 'PENDING';
