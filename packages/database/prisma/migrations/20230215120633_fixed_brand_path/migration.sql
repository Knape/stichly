/*
  Warnings:

  - You are about to drop the column `brandsPath` on the `Brand` table. All the data in the column will be lost.
  - Added the required column `path` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brandsPath` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Brand" DROP COLUMN "brandsPath",
ADD COLUMN     "path" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "brandsPath" TEXT NOT NULL;
