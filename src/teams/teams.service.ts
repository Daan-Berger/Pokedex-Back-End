import {Injectable, NotFoundException} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {CreateTeamDto} from "./dto/createTeam.dto";
import {TeamResponseDto} from "./dto/teamResponse.dto";
import {SetPokemonIdForTeamDto} from "./dto/setPokemonIdForTeam.dto";

@Injectable()
export class TeamService {
    constructor(private prisma: PrismaService) {
    }

    async getAllTeams(): Promise<TeamResponseDto[]> {
        const teams = await this.prisma.team.findMany({
            include: {
                pokemons: {
                    select: {
                        pokemonId: true
                    }
                }
            }
        });

        return teams.map(team => ({
            id: team.id,
            name: team.name,
            pokemons: team.pokemons.map(tp => tp.pokemonId)
        }));
    }

    async createTeam(createTeamDto: CreateTeamDto): Promise<TeamResponseDto> {
        const team = await this.prisma.team.create({
            data: {
                name: createTeamDto.name,
            }
        });

        return {
            id: team.id,
            name: team.name,
            pokemons: []
        };
    }

   async getTeamById(id: number): Promise<TeamResponseDto> {
        const team = await this.prisma.team.findUnique({
            where: {
                id: id
            },
            include: {
                pokemons: {
                    select: {
                        pokemonId: true
                    }
                }
            }

        });

        if (!team) {
            throw new NotFoundException(`Team with id ${id} not found`);
        }

       return {
            id: team.id,
           name: team.name,
           pokemons: team.pokemons.map(tp => tp.pokemonId)
       };
    }

    async setPokemonsForTeam(id: number, setPokemonIdForTeam: SetPokemonIdForTeamDto): Promise<TeamResponseDto> {
        const existingTeam = await this.prisma.team.findUnique({
            where: { id }
        });


        if (!existingTeam) {
            throw new NotFoundException(`Team with id ${id} not found`);
        }

        const team = await this.prisma.team.update({
            where: {
                id: id
            },
            data: {
                pokemons: {
                    deleteMany: {},
                    create: setPokemonIdForTeam.pokemons.map(pokemonId => ({
                        pokemonId: pokemonId
                    }))
                }
            },
            include: {
                pokemons: {
                    select: {
                        pokemonId: true
                    }
                }
            }
        });

        return {
            id: team.id,
            name: team.name,
            pokemons: team.pokemons.map(tp => tp.pokemonId)
        };

    }
}

