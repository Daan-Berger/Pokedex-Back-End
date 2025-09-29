import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {TeamService} from "./teams.service";
import {CreateTeamDto} from "./dto/createTeam.dto";

@Controller("api/v1")
export class TeamsController {
    constructor(private teamService: TeamService) {
    }

    @Get("teams")
    getAllTeams() {

    }

    @Post("teams")
    createTeam(@Body() createTeamDto: CreateTeamDto){
        return this.teamService.createTeam(createTeamDto);
    }

    @Get("teams/:id")
    getTeamById(@Param('id') id: number) {

    }

    @Post("teams/:id")
    setPokemonsForTeam(@Param('id') id: number) {

    }

}