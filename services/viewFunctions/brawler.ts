import {AptosClient} from "aptos";

import { viewRequest } from "@/services/viewFunctions/viewRequest";

import {brawlerModule} from "@/data/modules";

import {CharacterData, MeleeWeaponData, BrawlerData, RangedWeaponData} from "@/types/BrawlerData";

export const getBrawlerCollectionAddress = (client: AptosClient): Promise<string> =>
    client.view(viewRequest(
        brawlerModule,
        "get_collection_address",
        [],
        []
    ))
        .then((result) => result[0] as string)
        .catch(() => "")

export const getPlayerBrawlerTokenAddress = (client: AptosClient, playerAddress: string): Promise<string> =>
    client.view(viewRequest(
        brawlerModule,
        "get_player_token_address",
        [playerAddress],
        []
    ))
        .then((result) => result[0] as string)
        .catch(() => "")

export const getPlayerCharacterData = (client: AptosClient, playerAddress: string): Promise<CharacterData> =>
    client.view(viewRequest(
        brawlerModule,
        "get_player_character",
        [playerAddress],
        []
    ))
        .then((result) => ({
            creator: result[0] as string,
            collection: result[1] as string,
            name: result[2] as string
        }))
        .catch(() => ({
            creator: "",
            collection: "",
            name: ""
        }))

export const getPlayerMeleeWeaponData = (client: AptosClient, playerAddress: string): Promise<MeleeWeaponData> =>
    client.view(viewRequest(
        brawlerModule,
        "get_player_melee_weapon",
        [playerAddress],
        []
    ))
        .then((result) => ({
            power: parseInt(result[0] as string),
            type: parseInt(result[1] as string)
        }))
        .catch(() => ({
            power: 0,
            type: 0
        }))

export const getPlayerRangedWeaponData = (client: AptosClient, playerAddress: string): Promise<RangedWeaponData> =>
    client.view(viewRequest(
        brawlerModule,
        "get_player_ranged_weapon",
        [playerAddress],
        []
    ))
        .then((result) => ({
            power: parseInt(result[0] as string),
            type: parseInt(result[1] as string)
        }))
        .catch(() => ({
            power: 0,
            type: 0
        }))

export const getPlayerBrawlerData = (client: AptosClient, playerAddress: string): Promise<BrawlerData> =>
    Promise.all([
        getPlayerCharacterData(client, playerAddress),
        getPlayerMeleeWeaponData(client, playerAddress),
        getPlayerRangedWeaponData(client, playerAddress)
    ])
        .then(([character, meleeWeapon, rangedWeapon]) => ({
            character,
            meleeWeapon,
            rangedWeapon
        }))
        .catch(() => ({
            character: {
                creator: "",
                collection: "",
                name: ""
            },
            meleeWeapon: {
                power: 0,
                type: 0
            },
            rangedWeapon: {
                power: 0,
                type: 0
            }
        }))

