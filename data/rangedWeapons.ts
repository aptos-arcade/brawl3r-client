import {RangedWeaponData} from "@/types/BrawlerData";

const rangedWeaponNames = [
    "Wooden Sword",
    "Iron Sword",
    "Fire Sword",
    "Gold Sword",
    "Diamond Sword",
]

export const getRangedWeaponName = (
    rangedWeapon: RangedWeaponData | undefined
): string => rangedWeapon?.type && rangedWeapon.type > 0
    ? rangedWeaponNames[rangedWeapon.type - 1]
    : "No Melee Weapon"