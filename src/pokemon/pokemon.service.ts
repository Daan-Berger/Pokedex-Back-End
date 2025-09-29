import {Injectable, NotFoundException} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {PokemonDto} from "./dto/pokemon.dto";
import {PokemonDetailsDto} from "./dto/pokemonDetails.dto";
import {PaginatedPokemonDto} from "./dto/pokemonPaginated.dto";
import {PokemonSortOption} from "./enums/pokemon-sort-option.enum";

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
            orderBy: orderBy
        });

        return pokemons as PokemonDto[];
    }

    async getPokemonsWithId(id: number): Promise<PokemonDetailsDto> {
        const pokemon = await this.prisma.pokemon.findUnique({
            where: {
                id: id
            }
        });

        if (!pokemon) {
            throw new NotFoundException(`Pokemon with id ${id} not found`);
        }

        return pokemon as PokemonDetailsDto;

    }

    async getAllPokemonsPaginated(sort?: string, limit?: number, offset?: number): Promise<PaginatedPokemonDto> {
        const orderBy = this.getSortOrder(sort);

        const take = limit || 20;
        const skip = offset || 0;

        const pokemons = await this.prisma.pokemon.findMany({
            select: {
                id: true,
                name: true,
                sprites: true,
                types: true
            },
            take: take,
            skip: skip,
            orderBy: orderBy
        });

        const total = await this.prisma.pokemon.count();

        const pages = Math.ceil(total / take);
        const page = Math.floor(skip / take) + 1;

        const baseUrl = 'http://localhost:3000/api/v2/pokemons';
        const nextOffset = skip + take;
        const previousOffset = skip - take;

        const next = nextOffset < total ? `${baseUrl}?${sort ? `sort=${sort}` : ''}&limit=${take}&offset=${nextOffset}` : null;

        const previous = skip > 0 ? `${baseUrl}?${sort ? `sort=${sort}` : ''}&limit=${take}&offset=${previousOffset}` : null;


        return {
            data: pokemons as PokemonDto[],
            metadata: {next, previous, total, pages, page}
        };
    }

    private getSortOrder(sort?: string) {
        switch (sort) {
            case PokemonSortOption.NAME_ASC:
                return { name: 'asc' as const };
            case PokemonSortOption.NAME_DESC:
                return { name: 'desc' as const };
            case PokemonSortOption.ID_ASC:
                return { id: 'asc' as const };
            case PokemonSortOption.ID_DESC:
                return { id: 'desc' as const };
            default:
                return { id: 'asc' as const };
        }
    }
}