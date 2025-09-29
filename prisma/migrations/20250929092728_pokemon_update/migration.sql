/*
  Warnings:

  - You are about to drop the `pokemon_details` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `abilities` to the `pokemons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `form` to the `pokemons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `pokemons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moves` to the `pokemons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `pokemons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `species` to the `pokemons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stats` to the `pokemons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `pokemons` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."pokemon_details" DROP CONSTRAINT "pokemon_details_id_fkey";

-- AlterTable
ALTER TABLE "public"."pokemons" ADD COLUMN     "abilities" JSONB NOT NULL,
ADD COLUMN     "form" TEXT NOT NULL,
ADD COLUMN     "height" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "moves" JSONB NOT NULL,
ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "species" TEXT NOT NULL,
ADD COLUMN     "stats" JSONB NOT NULL,
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "public"."pokemon_details";
