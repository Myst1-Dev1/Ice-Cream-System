-- CreateEnum
CREATE TYPE "SaleType" AS ENUM ('venda', 'entrada');

-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "flavor" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" "SaleType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);
