import {Controller, Get, Query} from "@nestjs/common";
import {PokemonService} from "./pokemon.service";

@Controller("api/v2")
export class PokemonV2Controller {
    constructor(private pokemonService: PokemonService) {
    }

    @Get("pokemons")
    getAllPokemonsPaginated(
        @Query('sort') sort?: string,
        @Query('limit') limit?: number,
        @Query('offset') offset?: number) {

        return this.pokemonService.getAllPokemonsPaginated(sort, limit, offset);
    }

}