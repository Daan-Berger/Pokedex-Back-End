import {Body, Controller, Get, Param, ParseIntPipe, Post} from "@nestjs/common";
import {TeamService} from "./teams.service";
import {CreateTeamDto} from "./dto/createTeam.dto";
import {SetPokemonIdForTeamDto} from "./dto/setPokemonIdForTeam.dto";

@Controller("api/v1")
export class TeamsController {
    constructor(private teamService: TeamService) {
    }

    @Get("teams")
    getAllTeams() {
        return this.teamService.getAllTeams();
    }

    @Post("teams")
    createTeam(@Body() createTeamDto: CreateTeamDto){
        return this.teamService.createTeam(createTeamDto);
    }

    @Get("teams/:id")
    getTeamById(@Param('id', ParseIntPipe) id: number) {
        return this.teamService.getTeamById(id);
    }

    @Post("teams/:id")
    setPokemonsForTeam(@Param('id', ParseIntPipe) id: number,
                       @Body() setPokemonIdForTeam: SetPokemonIdForTeamDto) {
        return this.teamService.setPokemonsForTeam(id, setPokemonIdForTeam);
    }

}