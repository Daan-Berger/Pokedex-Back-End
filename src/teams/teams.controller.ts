import {Controller, Get, Param, Post} from "@nestjs/common";
import {TeamService} from "./teams.service";

@Controller("api/v1")
export class TeamsController {
    constructor(private teamService: TeamService) {
    }

    @Get("teams")
    getAllTeams() {

    }

    @Post("teams")
    createTeam(){

    }

    @Get("teams/:id")
    getTeamById(@Param('id') id: number) {

    }

    @Post("teams/:id")
    setPokemonsForTeam(@Param('id') id: number) {

    }

}