import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {PokemonDto} from "../pokemon/dto/pokemon.dto";

@Injectable()
export class SearchService {
    constructor(private prisma: PrismaService) {
    }

    async searchPokemons(query: string, limit?: number): Promise<PokemonDto[]> {
        const pokemon = await this.prisma.pokemon.findMany({
            take: limit,
            where: {
                OR: [
                    {
                        name: {
                            contains: query,
                            mode: 'insensitive'
                        }
                    },
                    {
                        types: {
                            array_contains: [{ type: { name: query }}],
                            mode: 'insensitive'
                        }
                    }
                ]
            }
        });

        return pokemon.map(p => ({
            id: p.id,
            name: p.name,
            sprites: p.sprites as { front_default: string },
            types: p.types as { type: { name: string}; slot: number}[]
        }))

    }
}