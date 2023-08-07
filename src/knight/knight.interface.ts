export interface IKnight {
    _id?: string
    name: string
    nickname: string
    birthday: string
    weapons: IWeapon[]
    attributes: IAttributes
    deleted: boolean
    keyAttribute: keyof IAttributes
    deletedAt: Date | null
}

export interface IWeapon {
    name: string
    mod: number
    attr: string
    equipped: boolean
    _id?: string
}

export interface IAttributes {
    strength: number
    dexterity: number
    constitution: number
    intelligence: number
    wisdom: number
    charisma: number
}