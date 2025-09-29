import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {CreateTeamDto} from "./dto/createTeam.dto";
import {TeamResponseDto} from "./dto/teamResponse.dto";

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

   async getTeamById(id: number) {

    }

    async setPokemonsForTeam(id: number) {

    }
}

