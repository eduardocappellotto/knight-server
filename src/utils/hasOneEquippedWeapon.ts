// src/common/hasOneEquippedWeapon.ts

import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function HasOneEquippedWeapon(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'hasOneEquippedWeapon',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    // Value will be the weapons array
                    if (!Array.isArray(value)) {
                        return false;
                    }


                    const equippedWeapons = value.filter((weapon) => weapon.equipped === true);

                    return equippedWeapons.length === 1;
                },
            },
        });
    };
}
