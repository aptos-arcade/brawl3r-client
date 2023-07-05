import {AptosClient} from "aptos";

import {canonicalAddress} from "@/services/aptosUtils";
import {viewRequest} from "@/services/viewFunctions/viewRequest";

import {meleeWeaponModule} from "@/data/modules";


export const getMeleeWeaponCollectionAddress = (client: AptosClient): Promise<string> =>
    client.view(viewRequest(
        meleeWeaponModule,
        "get_collection_address",
        [],
        []
    ))
        .then((result) => canonicalAddress(result[0] as string))
        .catch(() => "")

export const getMeleeWeaponData = (client: AptosClient, address: string): Promise<number[]> =>
    client.view(viewRequest(
        meleeWeaponModule,
        "get_melee_weapon_data",
        [address],
        []
    ))
        .then((result) => result.map((value) => parseInt(value as string)))
        .catch(() => [])

export const getHasPlayerMintedMeleeWeapon = (client: AptosClient, playerAddress: string): Promise<boolean> =>
    client.view(viewRequest(
        meleeWeaponModule,
        "has_player_minted",
        [playerAddress],
        []
    ))
        .then((result) => result[0] as boolean)
        .catch(() => false)