import { Test, TestingModule } from '@nestjs/testing';
import { KnightService } from './knight.service';
import { KnightRepository } from '../repositories/knight.repository';
import { Knight } from '../schemas/knight.schema';

describe('KnightService', () => {
    let knightService: KnightService;
    let mockKnightRepo: jest.Mocked<KnightRepository>;

    beforeEach(async () => {
        const mockRepoProvider = {
            provide: KnightRepository,
            useFactory: () => ({
                findAllKnights: jest.fn(),
                findKnightById: jest.fn(),
                createKnight: jest.fn(),
                updateKnight: jest.fn(),
                deleteKnight: jest.fn(),
                findHeroes: jest.fn(),
            }),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [KnightService, mockRepoProvider],
        }).compile();

        knightService = module.get<KnightService>(KnightService);
        mockKnightRepo = module.get(KnightRepository);
    });

    it('should be defined', () => {
        expect(knightService).toBeDefined();
    });

    it('should retrieve all knights', async () => {
        const mockKnights: Knight[] = [
            {
                "_id": "64cb37ab86bbba3a42a30e0b",
                "name": "Gandalf the White",
                "nickname": "Bruxão 2",
                "birthday": "1000-01-01",
                "weapons": [
                    {
                        "name": "Staff of Power",
                        "mod": 5,
                        "attr": "intelligence",
                        "equipped": true,
                        "_id": "64cb37ab86bbba3a42a30e0c"
                    },
                    {
                        "name": "Elven Sword",
                        "mod": 3,
                        "attr": "strength",
                        "equipped": false,
                        "_id": "64cb37ab86bbba3a42a30e0d"
                    }
                ],
                "attributes": {
                    "strength": 10,
                    "dexterity": 20,
                    "constitution": 20,
                    "intelligence": 30,
                    "wisdom": 30,
                    "charisma": 25
                },
                "keyAttribute": "intelligence",
                "deleted": true,
                "deletedAt": new Date("2023-08-04T07:06:07.320Z"),

            },
            {
                "_id": "64cb37b886bbba3a42a30e12",
                "name": "Aragorn II Elessar",
                "nickname": "Strider",
                "birthday": "2001-03-01",
                "weapons": [
                    {
                        "name": "Anduril",
                        "mod": 6,
                        "attr": "strength",
                        "equipped": true,
                        "_id": "64cb37b886bbba3a42a30e13"
                    },
                    {
                        "name": "Hunting Knife",
                        "mod": 2,
                        "attr": "dexterity",
                        "equipped": false,
                        "_id": "64cb37b886bbba3a42a30e14"
                    }
                ],
                "attributes": {
                    "strength": 30,
                    "dexterity": 25,
                    "constitution": 30,
                    "intelligence": 20,
                    "wisdom": 25,
                    "charisma": 30
                },
                "keyAttribute": "strength",
                "deleted": true,
                "deletedAt": new Date("2023-08-04T07:06:05.514Z"),

            },
        ];

        mockKnightRepo.findAllKnights.mockResolvedValue(mockKnights);

        const page = 1;
        const pageSize = 999;
        const skip = (page - 1) * pageSize;
        const result = await knightService.findAllKnights(page, pageSize);

        expect(mockKnightRepo.findAllKnights).toHaveBeenCalledWith(pageSize, skip);
        expect(result).toEqual(mockKnights);
    });
    it('should retrieve just heroes', async () => {
        const mockHeroes: Knight[] = [
            {
                "_id": "64cb37ab86bbba3a42a30e0b",
                "name": "Gandalf the White",
                "nickname": "Bruxão 2",
                "birthday": "1000-01-01",
                "weapons": [
                    {
                        "name": "Staff of Power",
                        "mod": 5,
                        "attr": "intelligence",
                        "equipped": true,
                        "_id": "64cb37ab86bbba3a42a30e0c"
                    },
                    {
                        "name": "Elven Sword",
                        "mod": 3,
                        "attr": "strength",
                        "equipped": false,
                        "_id": "64cb37ab86bbba3a42a30e0d"
                    }
                ],
                "attributes": {
                    "strength": 10,
                    "dexterity": 20,
                    "constitution": 20,
                    "intelligence": 30,
                    "wisdom": 30,
                    "charisma": 25
                },
                "keyAttribute": "intelligence",
                "deleted": true,
                "deletedAt": new Date("2023-08-04T07:06:07.320Z"),

            },
            {
                "_id": "64cb37b886bbba3a42a30e12",
                "name": "Aragorn II Elessar",
                "nickname": "Strider",
                "birthday": "2001-03-01",
                "weapons": [
                    {
                        "name": "Anduril",
                        "mod": 6,
                        "attr": "strength",
                        "equipped": true,
                        "_id": "64cb37b886bbba3a42a30e13"
                    },
                    {
                        "name": "Hunting Knife",
                        "mod": 2,
                        "attr": "dexterity",
                        "equipped": false,
                        "_id": "64cb37b886bbba3a42a30e14"
                    }
                ],
                "attributes": {
                    "strength": 30,
                    "dexterity": 25,
                    "constitution": 30,
                    "intelligence": 20,
                    "wisdom": 25,
                    "charisma": 30
                },
                "keyAttribute": "strength",
                "deleted": true,
                "deletedAt": new Date("2023-08-04T07:06:05.514Z"),

            },
        ];

        mockKnightRepo.findAllKnights.mockResolvedValue(mockHeroes);

        const page = 1;
        const pageSize = 999;
        const skip = (page - 1) * pageSize;
        const result = await knightService.findAllKnights(page, pageSize);

        expect(mockKnightRepo.findAllKnights).toHaveBeenCalledWith(pageSize, skip);
        expect(result).toEqual(mockHeroes);
    });

    it('should return a knight by ID', async () => {
        const result: Knight = {
            "_id": "64cb37ab86bbba3a42a30e0b",
            "name": "Gandalf the White",
            "nickname": "Bruxão 2",
            "birthday": "1000-01-01",
            "weapons": [
                {
                    "name": "Staff of Power",
                    "mod": 5,
                    "attr": "intelligence",
                    "equipped": true,
                    "_id": "64cb37ab86bbba3a42a30e0c"
                },
                {
                    "name": "Elven Sword",
                    "mod": 3,
                    "attr": "strength",
                    "equipped": false,
                    "_id": "64cb37ab86bbba3a42a30e0d"
                }
            ],
            "attributes": {
                "strength": 10,
                "dexterity": 20,
                "constitution": 20,
                "intelligence": 30,
                "wisdom": 30,
                "charisma": 25
            },
            "keyAttribute": "intelligence",
            "deleted": true,
            "deletedAt": new Date("2023-08-04T07:06:07.320Z")
        };
        mockKnightRepo.findKnightById.mockResolvedValue(result);
        expect(await knightService.findKnightById(result._id)).toEqual(result);
    });


});



    // ... and so on for each method ...


