import {Controller, Get, Param, Query} from "@nestjs/common";
import {PokemonService} from "./pokemon.service";

@Controller("api/v1")
export class PokemonV1Controller {
    constructor(private pokemonService: PokemonService) {
    }

    @Get("pokemons")
    getAllPokemons(@Query('sort') sort?: string) {
        return this.pokemonService.getAllPokemons(sort);
    }

    @Get("pokemons/:id")
    getPokemonById(@Param('id') id: number) {
        return this.pokemonService.getPokemonsWithId(id);
    }
}