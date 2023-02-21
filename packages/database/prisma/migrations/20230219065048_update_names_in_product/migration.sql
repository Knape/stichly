/*
  Warnings:

  - You are about to drop the `ProductPrice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductPrice" DROP CONSTRAINT "ProductPrice_productId_fkey";

-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "category" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "details" TEXT,
ADD COLUMN     "discount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "salePrice" INTEGER;

-- DropTable
DROP TABLE "ProductPrice";

-- CreateTable
CREATE TABLE "priceHistory" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "salePrice" INTEGER,
    "price" INTEGER NOT NULL,
    "discount" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isoDate" TEXT NOT NULL,

    CONSTRAINT "priceHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "priceHistory" ADD CONSTRAINT "priceHistory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
