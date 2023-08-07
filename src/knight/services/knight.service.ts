import { Injectable } from '@nestjs/common';
import { Knight } from '../schemas/knight.schema';
import { KnightRepository } from '../repositories/knight.repository';

@Injectable()
export class KnightService {
    constructor(private readonly knightRepository: KnightRepository) { }

    async findAllKnights(page: number = 1, pageSize: number = 999): Promise<Knight[]> {
        const skip = (page - 1) * pageSize;
        return this.knightRepository.findAllKnights(pageSize, skip);
    }

    async findKnightById(id: string): Promise<Knight> {
        return this.knightRepository.findKnightById(id);
    }

    async createKnight(knight: Knight): Promise<Knight> {
        return this.knightRepository.createKnight(knight);
    }

    async updateKnight(id: string, knight: Knight): Promise<Knight> {
        return this.knightRepository.updateKnight(id, knight);
    }

    async deleteKnight(id: string): Promise<Knight> {
        return this.knightRepository.deleteKnight(id);
    }

    async findHeroes(): Promise<Knight[]> {
        return this.knightRepository.findHeroes();
    }
}
