/*
  Warnings:

  - You are about to drop the column `budget` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `interests` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `style` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `travelers` on the `Trip` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "budget",
DROP COLUMN "interests",
DROP COLUMN "style",
DROP COLUMN "travelers",
ADD COLUMN     "stay" TEXT NOT NULL DEFAULT 'this is default hotel name';
