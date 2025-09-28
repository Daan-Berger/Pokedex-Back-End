import { Module } from '@nestjs/common';
import {PokemonService} from "./pokemon.service";
import {PokemonV1Controller} from "./pokemon-v1.controller";
import {PokemonV2Controller} from "./pokemon-v2.controller";

@Module({
    controllers: [PokemonV1Controller, PokemonV2Controller],
    providers: [PokemonService]
})
export class PokemonModule {}
