export class PokemonDto {
    id: number;
    name: string;
    sprites: {
        front_default: string;
    };
    types: {
        type: string;
        slot: number;
    }[];
}
