/*
  Warnings:

  - Added the required column `userPhoto` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Conversation` ADD COLUMN `userPhoto` VARCHAR(191) NOT NULL;
