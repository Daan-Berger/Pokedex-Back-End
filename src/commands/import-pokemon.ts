// src/commands/import-pokemon.ts
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

async function importPokemon(idOrName: string) {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
        const pokemon = response.data;

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
        });

        console.log(`Successfully imported ${pokemon.name}!`);
    } catch (error) {
        console.error(`Failed to import Pokemon: ${error.message}`);
    }
}

// The two commas ",," "skip the first two array elements and assign the third element to idOrName.
// process.argv[0] = path to Node.js executable (e.g., /usr/bin/node)
// process.argv[1] = path to the script file (e.g., /path/to/import-pokemon.ts)

const [,, idOrName] = process.argv;
if (!idOrName) {
    console.error('Please provide a Pokemon ID or name');
    process.exit(1);
}

importPokemon(idOrName).then(() => process.exit(0));
