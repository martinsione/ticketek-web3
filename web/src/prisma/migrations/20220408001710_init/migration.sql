/*
  Warnings:

  - The primary key for the `Contract` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Contract` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contract" DROP CONSTRAINT "Contract_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Contract_pkey" PRIMARY KEY ("address");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ALTER COLUMN "name" SET DEFAULT E'Unknown',
ALTER COLUMN "image" SET DEFAULT E'https://i1.sndcdn.com/avatars-000437232558-yuo0mv-t500x500.jpg',
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("walletAddress");
