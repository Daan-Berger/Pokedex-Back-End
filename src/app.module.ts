import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { TeamsModule } from './teams/teams.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [PokemonModule, TeamsModule, SearchModule]
})
export class AppModule {}
