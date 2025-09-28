import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { TeamsModule } from './teams/teams.module';
import { SearchModule } from './search/search.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PokemonModule, TeamsModule, SearchModule, PrismaModule]
})
export class AppModule {}
