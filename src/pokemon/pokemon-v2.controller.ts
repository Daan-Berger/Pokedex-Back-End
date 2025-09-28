import {Controller, Get} from "@nestjs/common";
import {PokemonService} from "./pokemon.service";

@Controller("api/v2")
export class PokemonV2Controller {
    constructor(private pokemonService: PokemonService) {
    }

    @Get("pokemons")
    getAllPokemonsPaginated() {

    }

}