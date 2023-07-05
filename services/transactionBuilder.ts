import {moduleToString} from "@/services/aptosUtils";

import {scriptsModule} from "@/data/modules";

import { TransactionPayload_EntryFunctionPayload } from "aptos/src/generated";

export const scriptTransactionPayload = (
    functionName: string,
    args: any[],
    typeArgs: string[]
): TransactionPayload_EntryFunctionPayload => ({
    type: "entry_function_payload",
    function: `${moduleToString(scriptsModule)}::${functionName}`,
    arguments: args,
    type_arguments: typeArgs,
})

export const mintPlayerPayload = scriptTransactionPayload("init_player", [], []);

export const equipMeleeWeaponPayload = (meleeWeaponAddress: string) => scriptTransactionPayload(
    "equip_melee_weapon",
    [meleeWeaponAddress],
    []
);

export const mintAndEquipMeleeWeapon = scriptTransactionPayload(
    "mint_and_equip_melee_weapon",
    [],
    []
);

export const equipCharacterPayload = (
    creatorAddress: string,
    collectionName: string,
    tokenName: string,
    propertyVersion: number
) => scriptTransactionPayload(
    "equip_character",
    [creatorAddress, collectionName, tokenName, propertyVersion],
    []
);


export const equipRangedWeaponPayload = (rangedWeaponAddress: string) => scriptTransactionPayload(
    "equip_ranged_weapon",
    [rangedWeaponAddress],
    []
);

export const mintAndEquipRangedWeapon = scriptTransactionPayload(
    "mint_and_equip_ranged_weapon",
    [],
    []
);

export const createMatch = (teams: string[][]) => scriptTransactionPayload(
    "create_match",
    [teams],
    []
)

export const setMatchResult = (matchAddress: string, winnerIndex: number) => scriptTransactionPayload(
    "set_match_result",
    [matchAddress, winnerIndex],
    []
)