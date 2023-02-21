/*
  Warnings:

  - Made the column `discount` on table `priceHistory` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "isRetailer" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "priceHistory" ALTER COLUMN "discount" SET NOT NULL;
