import { Test, TestingModule } from '@nestjs/testing';
import { KnightRepository } from './knight.repository';
import { getModelToken } from '@nestjs/mongoose';

describe('KnightRepository', () => {
    let repository: KnightRepository;
    let mockModel;

    const exampleKnight = {
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
            "charisma": 23,
        },
        "keyAttribute": "strength",
        "deleted": false,
        "deletedAt": null,
    };

    beforeEach(async () => {
        mockModel = {
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            save: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                KnightRepository,
                {
                    provide: getModelToken('Knight'),
                    useValue: mockModel,
                },
            ],
        }).compile();

        repository = module.get<KnightRepository>(KnightRepository);
    });

    it('should find all knights', async () => {
        mockModel.find.mockResolvedValue([exampleKnight]);
        const result = await repository.findAllKnights(10, 0);
        expect(mockModel.find).toHaveBeenCalled();
        expect(result).toEqual([exampleKnight]);
    });

    it('should find heroes', async () => {
        mockModel.find.mockResolvedValue([exampleKnight]);
        const result = await repository.findHeroes();
        expect(mockModel.find).toHaveBeenCalledWith({ deleted: true });
        expect(result).toEqual([exampleKnight]);
    });

    it('should find knight by id', async () => {
        const id = 'someId';
        mockModel.findById.mockResolvedValue(exampleKnight);
        const result = await repository.findKnightById(id);
        expect(mockModel.findById).toHaveBeenCalledWith(id);
        expect(result).toEqual(exampleKnight);
    });

    it('should create a knight', async () => {
        mockModel.mockReturnValueOnce({
            save: jest.fn().mockResolvedValueOnce(exampleKnight)
        });
        const result = await repository.createKnight(exampleKnight);
        expect(result).toEqual(exampleKnight);
    });

    it('should update a knight', async () => {
        const id = 'someId';
        mockModel.findByIdAndUpdate.mockResolvedValue(exampleKnight);
        const result = await repository.updateKnight(id, exampleKnight);
        expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(id, exampleKnight, { new: true });
        expect(result).toEqual(exampleKnight);
    });

    it('should soft delete a knight', async () => {
        const id = 'someId';
        const knightData = { ...exampleKnight, save: jest.fn() };
        mockModel.findById.mockResolvedValue(knightData);
        await repository.deleteKnight(id);
        expect(knightData.deleted).toBe(true);
        expect(knightData.deletedAt).toBeDefined();
        expect(knightData.save).toHaveBeenCalled();
    });

    it('should return null if knight not found during delete', async () => {
        const id = 'someId';
        mockModel.findById.mockResolvedValue(null);
        const result = await repository.deleteKnight(id);
        expect(result).toBe(null);
    });

});
