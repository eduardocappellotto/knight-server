import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KnightController } from './knight.controller';
import { Knight, KnightSchema } from './schemas/knight.schema';
import { KnightRepository } from './repositories/knight.repository';
import { KnightService } from './services/knight.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Knight.name, schema: KnightSchema }])],
    controllers: [KnightController],
    providers: [KnightRepository, KnightService],
})
export class KnightModule { }
