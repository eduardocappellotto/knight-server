import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Attributes } from './attributes.schema';
import { Weapon, WeaponSchema } from './weapon.schema';
import { IsNotEmpty, IsString, IsArray, ArrayMinSize, ValidateNested, isNotEmpty, isString } from 'class-validator';

import { HasOneEquippedWeapon } from '../../utils/hasOneEquippedWeapon'; // Update the path as per your project structure

type KeyOfAttributes = keyof Attributes;

@Schema()
export class Knight {
    @Prop({ required: true })
    @IsNotEmpty()
    @IsString()
    name: string;

    @Prop({ required: true })
    @IsNotEmpty()
    @IsString()
    nickname: string;

    @Prop({ required: true })
    @IsNotEmpty()
    @IsString()
    birthday: string;

    @Prop({ type: [WeaponSchema], required: true })
    @HasOneEquippedWeapon({ message: 'Your knight has multiple active weapons, choose one.' })
    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    weapons: Weapon[];

    @Prop({ type: Object, ref: 'Attributes' })
    @IsNotEmpty()
    @ValidateNested()
    attributes: Attributes;

    @Prop({ required: true })
    @IsNotEmpty()
    @IsString()
    keyAttribute: KeyOfAttributes;

    @Prop({ default: false })
    deleted: boolean; // Add a new field to indicate if the knight is deleted

    @Prop({ default: null })
    deletedAt: Date; // Add a new field to store the timestamp when the knight was deleted
}

export const KnightSchema = SchemaFactory.createForClass(Knight);
