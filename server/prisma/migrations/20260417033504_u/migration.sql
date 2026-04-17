-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "SectionType" ADD VALUE 'WHO_WE_ARE';
ALTER TYPE "SectionType" ADD VALUE 'ECOSYSTEM';
ALTER TYPE "SectionType" ADD VALUE 'REVENUE';
ALTER TYPE "SectionType" ADD VALUE 'CLOSING';
