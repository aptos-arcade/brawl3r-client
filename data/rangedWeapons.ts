import {RangedWeaponData} from "@/types/BrawlerData";

const rangedWeaponNames = [
    "Wooden Gun",
    "Iron Gun",
    "Fire Gun",
    "Gold Gun",
    "Diamond Gun",
]

export const getRangedWeaponName = (
    rangedWeapon: RangedWeaponData | undefined
): string => rangedWeapon?.type && rangedWeapon.type > 0
    ? rangedWeaponNames[rangedWeapon.type - 1]
    : "No Melee Weapon"