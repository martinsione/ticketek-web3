-- CreateTable
CREATE TABLE "User" (
    "walletAddress" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT DEFAULT E'Unknown',
    "image" TEXT DEFAULT E'https://i1.sndcdn.com/avatars-000437232558-yuo0mv-t500x500.jpg',

    CONSTRAINT "User_pkey" PRIMARY KEY ("walletAddress")
);

-- CreateTable
CREATE TABLE "Contract" (
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("address")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_walletAddress_key" ON "User"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Contract_address_key" ON "Contract"("address");
