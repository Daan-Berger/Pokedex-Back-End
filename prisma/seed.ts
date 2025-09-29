import {PrismaClient} from '@prisma/client'
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
    const filePath = 'pokemons.json';
    const pokemonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    console.log('Starting to seed data');

    for (const pokemon of pokemonData) {
        await prisma.pokemon.upsert({
            where: { id: pokemon.id },
            update: {},
            create: {
                id: pokemon.id,
                name: pokemon.name,
                sprites: pokemon.sprites,
                types: pokemon.types,
                height: pokemon.height,
                weight: pokemon.weight,
                moves: pokemon.moves,
                order: pokemon.order,
                species: pokemon.species.name,
                stats: pokemon.stats,
                abilities: pokemon.abilities,
                form: pokemon.forms?.[0]?.name || pokemon.name
            }
        })
    }

    console.log(`Seeded ${pokemonData.length} Pokemon successfully!`)

}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })