/*
  Warnings:

  - You are about to drop the column `heigth` on the `pokemon_details` table. All the data in the column will be lost.
  - Added the required column `height` to the `pokemon_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."pokemon_details" DROP COLUMN "heigth",
ADD COLUMN     "height" DOUBLE PRECISION NOT NULL;
