import { CharacterData } from "@/types/BrawlerData";
import { MeleeWeaponData } from "@/types/BrawlerData";
import { RangedWeaponData } from "@/types/BrawlerData";

export interface BrawlerData {
    character: CharacterData,
    meleeWeapon: MeleeWeaponData,
    rangedWeapon: RangedWeaponData
}