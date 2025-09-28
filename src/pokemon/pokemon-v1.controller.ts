import {Controller, Get, Param} from "@nestjs/common";
import {PokemonService} from "./pokemon.service";

@Controller("api/v1")
export class PokemonV1Controller {
    constructor(private pokemonService: PokemonService) {
    }

    @Get("pokemons")
    getAllPokemons() {
    }

    @Get("pokemons/:id")
    getPokemonById(@Param('id') id: number) {

    }
}