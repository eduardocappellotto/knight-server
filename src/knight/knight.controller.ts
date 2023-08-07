import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { Knight } from './schemas/knight.schema';
import { KnightService } from './services/knight.service';
import { ApiResponse } from '../common/interfaces/response.interface';

@Controller('knights')
export class KnightController {
    constructor(private readonly knightService: KnightService) { }

    @Get()
    async findAllKnights(@Query('filter') filter?: string): Promise<ApiResponse<Knight[]>> {
        try {
            if (filter === 'heroes') {
                const heroes = await this.knightService.findHeroes();
                console.log(heroes)

                return { status: 'success', message: 'Heroes fetched successfully', data: heroes, count: heroes.length ? heroes.length : 0 };
            } else {
                const knights = await this.knightService.findAllKnights();
                console.log(knights)
                return { status: 'success', message: 'Knights fetched successfully', data: knights, count: knights.length ? knights.length : 0 };
            }
        } catch (error) {
            return { status: 'error', message: 'Failed to fetch knights', data: null };
        }
    }

    @Get(':id')
    async findKnightById(@Param('id') id: string): Promise<ApiResponse<Knight>> {
        try {
            const knight = await this.knightService.findKnightById(id);
            if (!knight) {
                return { status: 'error', message: 'Knight not found', data: null };
            }
            return { status: 'success', message: 'Knight fetched successfully', data: knight };
        } catch (error) {
            return { status: 'error', message: 'Failed to fetch knight', data: null };
        }
    }

    @Post()
    async createKnight(@Body() knight: Knight): Promise<ApiResponse<Knight>> {
        try {
            const newKnight = await this.knightService.createKnight(knight);
            return { status: 'success', message: 'Knight created successfully', data: newKnight };
        } catch (error) {
            return { status: 'error', message: `Failed to create knight: ${error}`, data: null };
        }
    }

    @Put(':id')
    async updateKnight(@Param('id') id: string, @Body() knight: Knight): Promise<ApiResponse<Knight>> {
        try {
            const updatedKnight = await this.knightService.updateKnight(id, knight);
            return { status: 'success', message: 'Knight updated successfully', data: updatedKnight };
        } catch (error) {
            return { status: 'error', message: `Failed to update knight : ${error}`, data: null };
        }
    }

    @Delete(':id')
    async deleteKnight(@Param('id') id: string): Promise<ApiResponse<Knight>> {
        try {
            const deletedKnight = await this.knightService.deleteKnight(id);
            return { status: 'success', message: 'Knight "killed" successfully', data: deletedKnight };
        } catch (error) {
            return { status: 'error', message: `Failed to delete knight: ${error}`, data: null };
        }
    }
}
