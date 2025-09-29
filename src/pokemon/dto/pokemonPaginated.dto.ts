import {PokemonDto} from "./pokemon.dto";

export class PaginatedPokemonDto {
    data: PokemonDto[];
    metadata: {
        next: string | null;
        previous: string | null;
        total: number;
        pages: number;
        page: number;
    };
}
