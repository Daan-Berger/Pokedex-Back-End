import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {PokemonDto} from "./dto/pokemon.dto";
import {PokemonDetailsDto} from "./dto/pokemonDetails.dto";

@Injectable()
export class PokemonService {
    constructor(private prisma: PrismaService) {
    }
    async getAllPokemons(sort?: string): Promise<PokemonDto[]> {
        const orderBy = this.getSortOrder(sort);

        const pokemons = await this.prisma.pokemon.findMany({
            select: {
                id: true,
                name: true,
                sprites: true,
                types: true
            },
            orderBy
        });

        return pokemons as PokemonDto[];
    }

    async getPokemonsWithId(id: number): Promise<PokemonDetailsDto> {
        const pokemon = await this.prisma.pokemon.findUnique({
            where: {
                id: id
            }
        });

        return pokemon as PokemonDetailsDto;

    }

    async getAllPokemonsPaginated(sort?: string, limit?: number, offset?: number): Promise<PokemonDto[]> {
        const orderBy = this.getSortOrder(sort);

        const pokemons = await this.prisma.pokemon.findMany({
            select: {
                id: true,
                name: true,
                sprites: true,
                types: true
            },
            take: limit,
            skip: offset,
            orderBy
        });

        return pokemons as PokemonDto[];
    }

    private getSortOrder(sort?: string) {
        switch (sort) {
            case 'name-asc':
                return { name: 'asc' as const };
            case 'name-desc':
                return { name: 'desc' as const };
            case 'id-asc':
                return { id: 'asc' as const };
            case 'id-desc':
                return { id: 'desc' as const };
            default:
                return { id: 'asc' as const };
        }
    }
}