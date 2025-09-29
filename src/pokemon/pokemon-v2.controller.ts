import {Controller, Get, ParseIntPipe, Query} from "@nestjs/common";
import {PokemonService} from "./pokemon.service";

@Controller("api/v2")
export class PokemonV2Controller {
    constructor(private pokemonService: PokemonService) {
    }

    @Get("pokemons")
    getAllPokemonsPaginated(
        @Query('sort') sort?: string,
        @Query('limit', new ParseIntPipe( {optional: true })) limit?: number,
        @Query('offset', new ParseIntPipe( {optional: true })) offset?: number) {

        return this.pokemonService.getAllPokemonsPaginated(sort, limit, offset);
    }

}