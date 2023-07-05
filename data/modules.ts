import { Module } from "@/types/Module";

export const aptosArenaModuleAddress = "0xa063aa74aeb7aac297161df445de42d99e2e9ac0d560af9500b2db29f2b8c4d6";

export const brawlerModule: Module = {
    module_address: aptosArenaModuleAddress,
    module_name: "brawler"
}

export const meleeWeaponModule: Module = {
    module_address: aptosArenaModuleAddress,
    module_name: "melee_weapon"
}

export const rangedWeaponModule: Module = {
    module_address: aptosArenaModuleAddress,
    module_name: "ranged_weapon"
}

export const scriptsModule: Module = {
    module_address: aptosArenaModuleAddress,
    module_name: "scripts"
}

export const aptosArenaModule: Module = {
    module_address: aptosArenaModuleAddress,
    module_name: "aptos_arena"
}