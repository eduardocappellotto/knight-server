import { Test, TestingModule } from '@nestjs/testing';
import { KnightController } from './knight.controller';
import { KnightService } from './services/knight.service';
import { IKnight } from './knight.interface';

// Mocking knightService for our tests
const mockKnightService = {
    findAllKnights: jest.fn(),
    findHeroes: jest.fn(),
    findKnightById: jest.fn(),
    createKnight: jest.fn(),
    updateKnight: jest.fn(),
    deleteKnight: jest.fn(),
};

describe('KnightController', () => {
    let controller: KnightController;
    let service: KnightService;

    const twoKnights = [{
        "_id": "64cb37ab86bbba3a42a30e0b",
        "name": "Gandalf the White",
        "nickname": "Bruxão",
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
        "deletedAt": "2023-08-04T07:06:07.320Z",
        "__v": 0
    },
    {
        "name": "Optimus Prime 2",
        "nickname": "Optimus",
        "birthday": "1979-06-06",
        "weapons": [
            {
                "name": "LS3 Rocket",
                "mod": 2,
                "attr": "constitution",
                "equipped": true,
                "_id": "64cd184382eec27213400701"
            },
            {
                "name": "NanoBlade",
                "mod": 1,
                "attr": "strength",
                "equipped": false,
                "_id": "64cd184382eec27213400702"
            }
        ],
        "attributes": {
            "strength": 67,
            "dexterity": 45,
            "constitution": 56,
            "intelligence": 34,
            "wisdom": 76,
            "charisma": 23
        },
        "keyAttribute": "wisdom",
        "deleted": false,
        "deletedAt": null,
        "_id": null,
        "__v": 0
    }]

    const twoHeroes = twoKnights.map(knight => knight.deleted = true)

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [KnightController],
            providers: [{ provide: KnightService, useValue: mockKnightService }],
        }).compile();

        controller = module.get<KnightController>(KnightController);
        service = module.get<KnightService>(KnightService)
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(service).toBeDefined();
    });

    it('should fetch all knights successfully, but the list is empty', async () => {
        mockKnightService.findAllKnights.mockReturnValue({});

        const result = await controller.findAllKnights();

        expect(await controller.findAllKnights()).toEqual({
            "count": 0,
            "data": {},
            "message": "Knights fetched successfully",
            "status": "success",
        });
    });

    it('should fetch all knights successfully, with two results', async () => {
        mockKnightService.findAllKnights.mockReturnValue(twoKnights);

        expect(await controller.findAllKnights()).toEqual({
            "count": twoKnights.length,
            "data": [twoKnights],
            "message": "Knights fetched successfully",
            "status": "success",
        });
    });

    it('should fetch all knights with an error, with no results', async () => {
        mockKnightService.findAllKnights.mockRejectedValue({});

        expect(await controller.findAllKnights()).toEqual({
            "data": null,
            "message": "Failed to fetch knights",
            "status": "error",
        });
    });

    it('should fetch all heroes with two results', async () => {
        mockKnightService.findHeroes.mockReturnValue(twoHeroes);
        expect(await controller.findAllKnights('heroes')).toEqual({
            "count": 2, "data": twoHeroes, "message": "Heroes fetched successfully", "status": "success"
        });
    });

    it('should fetch all heroes but with no results', async () => {
        mockKnightService.findHeroes.mockReturnValue([]);
        expect(await controller.findAllKnights('heroes')).toEqual({ "count": 0, "data": [], "message": "Heroes fetched successfully", "status": "success" });
    });

    it('should fetch a knight by id', async () => {
        mockKnightService.findKnightById.mockReturnValue({
            "_id": "64cc9696be92517258cadb5f",
            "name": "BTG X900",
            "nickname": "BTG(UN) ",
            "birthday": "1990-08-01",
            "weapons": [
                {
                    "name": "GlassCannon X800",
                    "mod": 2,
                    "attr": "strength",
                    "equipped": false,
                    "_id": "64cc9696be92517258cadb5c"
                },
                {
                    "name": "Rocket #R4C00N",
                    "mod": 1,
                    "attr": "strength",
                    "equipped": true,
                    "_id": "64cc9696be92517258cadb5d"
                }
            ],
            "attributes": {
                "strength": "78",
                "dexterity": "23",
                "constitution": "34",
                "intelligence": "65",
                "wisdom": "78",
                "charisma": "12"
            },
            "keyAttribute": "strength",
            "deleted": false,
            "deletedAt": null,
            "__v": 0
        });
        expect(await controller.findKnightById('some_id')).toEqual({
            "status": "success",
            "message": "Knight fetched successfully",
            "data": {
                "_id": "64cc9696be92517258cadb5f",
                "name": "BTG X900",
                "nickname": "BTG(UN) ",
                "birthday": "1990-08-01",
                "weapons": [
                    {
                        "name": "GlassCannon X800",
                        "mod": 2,
                        "attr": "strength",
                        "equipped": false,
                        "_id": "64cc9696be92517258cadb5c"
                    },
                    {
                        "name": "Rocket #R4C00N",
                        "mod": 1,
                        "attr": "strength",
                        "equipped": true,
                        "_id": "64cc9696be92517258cadb5d"
                    }
                ],
                "attributes": {
                    "strength": "78",
                    "dexterity": "23",
                    "constitution": "34",
                    "intelligence": "65",
                    "wisdom": "78",
                    "charisma": "12"
                },
                "keyAttribute": "strength",
                "deleted": false,
                "deletedAt": null,
                "__v": 0
            }
        });
    });

    it('should create a new knight', async () => {

        let createKnightPayload: IKnight = {
            "_id": null,
            "name": "Optimus Prime 2",
            "nickname": "Optimus",
            "birthday": "1979-06-06",
            "weapons": [
                {
                    "name": "LS3 Rocket",
                    "mod": 2,
                    "attr": "constitution",
                    "equipped": true
                },
                {
                    "name": "NanoBlade",
                    "mod": 2,
                    "attr": "strength",
                    "equipped": false
                }
            ],
            "attributes": {
                "strength": 67,
                "dexterity": 45,
                "constitution": 56,
                "intelligence": 34,
                "wisdom": 76,
                "charisma": 23
            },
            "keyAttribute": "strength",
            "deletedAt": null,
            "deleted": false,

        }

        mockKnightService.createKnight.mockReturnValue({
            ...createKnightPayload, _id: '64cd1a7482eec2721340070a'
        });

        expect(await controller.createKnight(createKnightPayload)).toEqual({
            "status": "success",
            "message": "Knight created successfully",
            "_id": "64cd1a7482eec2721340070a",
            "data": {
                "name": "Optimus Prime 2",
                "nickname": "Optimus",
                "birthday": "1979-06-06",
                "weapons": [
                    {
                        "name": "LS3 Rocket",
                        "mod": 2,
                        "attr": "constitution",
                        "equipped": true,
                        "_id": "64cd184382eec27213400701"
                    },
                    {
                        "name": "NanoBlade",
                        "mod": 2,
                        "attr": "strength",
                        "equipped": false,
                        "_id": "64cd184382eec27213400702"
                    }
                ],
                "attributes": {
                    "strength": 67,
                    "dexterity": 45,
                    "constitution": 56,
                    "intelligence": 34,
                    "wisdom": 76,
                    "charisma": 23,
                },
                "keyAttribute": "strength",
                "deleted": false,
                "deletedAt": null,
                "_id": '64cd1a7482eec2721340070a',
                "__v": 0
            }
        });
    });

    /*
 
    it('should update a knight', async () => {
        const knight = new Knight();
        const result = new Knight();
        mockKnightService.updateKnight.mockReturnValue(result);
        expect(await controller.updateKnight('some_id', knight)).toEqual(result);
    });
 
    it('should delete a knight', async () => {
        const result = new Knight();
        mockKnightService.deleteKnight.mockReturnValue(result);
        expect(await controller.deleteKnight('some_id')).toEqual(result);
    }); */
});