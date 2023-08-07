import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Weapon {
    @Prop({ required: true })
    name: string;

    @Prop({ default: null })
    _id: string;

    @Prop({ required: true })
    mod: number;

    @Prop({ required: true })
    attr: string;

    @Prop({ required: true, default: false })
    equipped: boolean;
}

export const WeaponSchema = SchemaFactory.createForClass(Weapon);
