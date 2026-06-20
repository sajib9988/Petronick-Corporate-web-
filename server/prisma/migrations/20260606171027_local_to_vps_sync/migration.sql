-- CreateEnum
CREATE TYPE "FocusType" AS ENUM ('B2B', 'B2C', 'BOTH');

-- AlterTable
ALTER TABLE "promotion_agent" ADD COLUMN     "focusType" "FocusType";
