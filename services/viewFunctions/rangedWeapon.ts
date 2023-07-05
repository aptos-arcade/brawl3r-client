import {AptosClient} from "aptos";

import {canonicalAddress} from "@/services/aptosUtils";

import { viewRequest } from "@/services/viewFunctions/viewRequest";

import {rangedWeaponModule} from "@/data/modules";

export const getHasPlayerMintedRangedWeapon = (client: AptosClient, playerAddress: string): Promise<boolean> =>
    client.view(viewRequest(
        rangedWeaponModule,
        "has_player_minted",
        [playerAddress],
        []
    ))
        .then((result) => result[0] as boolean)
        .catch(() => false)

export const getRangedWeaponCollectionAddress = (client: AptosClient): Promise<string> =>
    client.view(viewRequest(
        rangedWeaponModule,
        "get_collection_address",
        [],
        []
    ))
        .then((result) => canonicalAddress(result[0] as string))
        .catch(() => "")

export const getRangedWeaponData = (client: AptosClient, address: string): Promise<number[]> =>
    client.view(viewRequest(
        rangedWeaponModule,
        "get_ranged_weapon_data",
        [address],
        []
    ))
        .then((result) => result.map((value) => parseInt(value as string)))
        .catch(() => [])