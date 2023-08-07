import { HasOneEquippedWeapon } from './hasOneEquippedWeapon';
import { validateSync } from 'class-validator';

class TestClass {
    @HasOneEquippedWeapon()
    weapons: any[];
}

describe('HasOneEquippedWeapon', () => {
    it('should return true when there is only one equipped weapon', () => {
        const testObject = new TestClass();
        testObject.weapons = [
            { name: 'Sword', equipped: false },
            { name: 'Axe', equipped: true },
            { name: 'Bow', equipped: false },
        ];

        const errors = validateSync(testObject);
        expect(errors.length).toBe(0);
    });

    it('should return false when there are no equipped weapons', () => {
        const testObject = new TestClass();
        testObject.weapons = [
            { name: 'Sword', equipped: false },
            { name: 'Axe', equipped: false },
            { name: 'Bow', equipped: false },
        ];

        const errors = validateSync(testObject);
        expect(errors.length).toBe(1);
        expect(errors[0].constraints.hasOneEquippedWeapon).toBeDefined();
    });

    it('should return false when there are multiple equipped weapons', () => {
        const testObject = new TestClass();
        testObject.weapons = [
            { name: 'Sword', equipped: true },
            { name: 'Axe', equipped: true },
            { name: 'Bow', equipped: false },
        ];

        const errors = validateSync(testObject);
        expect(errors.length).toBe(1);
        expect(errors[0].constraints.hasOneEquippedWeapon).toBeDefined();
    });

    it('should return false when the weapons array is not provided', () => {
        const testObject = new TestClass();

        const errors = validateSync(testObject);
        expect(errors.length).toBe(1);
        expect(errors[0].constraints.hasOneEquippedWeapon).toBeDefined();
    });
});
