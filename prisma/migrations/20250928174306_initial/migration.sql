-- CreateTable
CREATE TABLE "public"."pokemons" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "sprites" JSONB NOT NULL,
    "types" JSONB NOT NULL,

    CONSTRAINT "pokemons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pokemon_details" (
    "id" INTEGER NOT NULL,
    "sprites" JSONB NOT NULL,
    "types" JSONB NOT NULL,
    "heigth" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "moves" JSONB NOT NULL,
    "order" INTEGER NOT NULL,
    "species" TEXT NOT NULL,
    "stats" JSONB NOT NULL,
    "abilities" JSONB NOT NULL,
    "form" TEXT NOT NULL,

    CONSTRAINT "pokemon_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."teams" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."team_pokemons" (
    "teamId" INTEGER NOT NULL,
    "pokemonId" INTEGER NOT NULL,

    CONSTRAINT "team_pokemons_pkey" PRIMARY KEY ("teamId","pokemonId")
);

-- AddForeignKey
ALTER TABLE "public"."pokemon_details" ADD CONSTRAINT "pokemon_details_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."pokemons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."team_pokemons" ADD CONSTRAINT "team_pokemons_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "public"."teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."team_pokemons" ADD CONSTRAINT "team_pokemons_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "public"."pokemons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
