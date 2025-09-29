import {PokemonService} from "./pokemon.service";
import {Test, TestingModule} from "@nestjs/testing";
import {PrismaService} from "../prisma/prisma.service";

describe('PokemonService', () => {
    let pokemonService: PokemonService;

    const mockPokemons = [
        {id: 25, name: 'Pikachu', sprites: {}, types: []},
        {id: 1, name: 'Bulbasaur', sprites: {}, types: []}
    ];

    const mockPokemonDetails = {
        id: 25,
        name: 'Pikachu',
        sprites: {
            front_default: 'https://example.com/pikachu-front.png'
        },
        types: [
            {type: 'electric', slot: 1}
        ],
        height: 4,
        weight: 60,
        moves: [],
        order: 35,
        species: 'Mouse Pokémon',
        stats: [
            {stat: 'hp', base_stat: 35, effort: 0}
        ],
        abilities: [
            {ability: 'static', is_hidden: false, slot: 1}
        ],
        form: 'pikachu'
    };

    const mockPrismaService = {
        pokemon: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
            count: jest.fn()
        }
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PokemonService,
                {
                    provide: PrismaService,
                    useValue: mockPrismaService,
                },
            ],
        }).compile();

        pokemonService = module.get<PokemonService>(PokemonService);
    });

    describe('getAllPokemons', () => {
        it('should return all pokemons', async () => {
            mockPrismaService.pokemon.findMany.mockResolvedValue(mockPokemons);

            const result = await pokemonService.getAllPokemons('name-asc');

            expect(result).toEqual(mockPokemons);
            expect(mockPrismaService.pokemon.findMany).toHaveBeenCalledWith({
                select: {
                    id: true,
                    name: true,
                    sprites: true,
                    types: true
                },
                orderBy: {name: 'asc'}
            });
        });

        it('should return all pokemons sorted by id desc', async () => {

            mockPrismaService.pokemon.findMany.mockResolvedValue(mockPokemons);

            const result = await pokemonService.getAllPokemons('id-desc');

            expect(result).toEqual(mockPokemons);
            expect(mockPrismaService.pokemon.findMany).toHaveBeenCalledWith({
                select: {
                    id: true,
                    name: true,
                    sprites: true,
                    types: true
                },
                orderBy: {id: 'desc'}
            });
        });
    });

    describe('getPokemonsWithId', () => {
        it('should return pokemons by id', async () => {
            const id = 25;

            mockPrismaService.pokemon.findUnique.mockResolvedValue(mockPokemonDetails);

            const result = await pokemonService.getPokemonsWithId(id);

            expect(result).toEqual(mockPokemonDetails);
            expect(mockPrismaService.pokemon.findUnique).toHaveBeenCalledWith({
                where: {id: id}
            });
        });

        it('should throw NotFoundException when pokemon not found', async () => {
            const id = 321;

            mockPrismaService.pokemon.findUnique.mockResolvedValue(null);

            await expect(pokemonService.getPokemonsWithId(id)).rejects.toThrow('Pokemon with id 321 not found')
            expect(mockPrismaService.pokemon.findUnique).toHaveBeenCalledWith({
                where: {id: id}
            });
        });
    });






});



