import {Controller, Get, Query} from "@nestjs/common";
import {SearchService} from "./search.service";

@Controller("api/v1")
export class SearchController {
    constructor(private searchService: SearchService) {
    }

    @Get("search")
    searchPokemons(
        @Query('query') query: string,
        @Query('limit')limit: number) {

        return this.searchService.searchPokemons(query, limit)

    }
}