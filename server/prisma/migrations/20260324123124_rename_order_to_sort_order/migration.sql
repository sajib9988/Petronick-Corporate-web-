/*
  Warnings:

  - You are about to drop the column `type` on the `section` table. All the data in the column will be lost.
  - Added the required column `sectionType` to the `section` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "section" DROP COLUMN "type",
ADD COLUMN     "sectionType" "SectionType" NOT NULL;
