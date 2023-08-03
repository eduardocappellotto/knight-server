// src/knight/repositories/knight.repository.ts

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Knight } from '../schemas/knight.schema';

@Injectable()
export class KnightRepository {
    constructor(@InjectModel(Knight.name) private readonly knightModel: Model<Knight>) { }

    async findAllKnights(pageSize: number, skip: number): Promise<Knight[]> {
        return this.knightModel.find().limit(pageSize).skip(skip).exec();
    }
    async findHeroes(): Promise<Knight[]> {
        return this.knightModel.find({ deleted: true }).exec();
    }


    async findKnightById(id: string): Promise<Knight> {
        return this.knightModel.findById(id).exec();
    }

    async createKnight(knight: Knight): Promise<Knight> {
        const newKnight = new this.knightModel(knight);
        return newKnight.save();
    }

    async updateKnight(id: string, knight: Knight): Promise<Knight> {
        return this.knightModel.findByIdAndUpdate(id, knight, { new: true }).exec();
    }

    async deleteKnight(id: string): Promise<Knight> {
        const knight = await this.knightModel.findById(id).exec();
        if (!knight) {
            return null;
        }

        knight.deleted = true;
        knight.deletedAt = new Date();
        return knight.save();
    }


}
