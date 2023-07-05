import {MeleeWeaponData} from "@/types/BrawlerData";

const meleeWeaponNames = [
    "Wooden Sword",
    "Iron Sword",
    "Fire Sword",
    "Gold Sword",
    "Diamond Sword",
]

export const getMeleeWeaponName = (
    meleeWeapon: MeleeWeaponData | undefined
): string => meleeWeapon?.type && meleeWeapon.type > 0
    ? meleeWeaponNames[meleeWeapon.type - 1]
    : "No Melee Weapon"