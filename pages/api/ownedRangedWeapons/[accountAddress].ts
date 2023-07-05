import type {NextApiRequest, NextApiResponse} from 'next'

import {Network} from "aptos";

import {getAptosProvider} from "@/services/aptosProvider";
import {getRangedWeaponCollectionAddress, getRangedWeaponData} from "@/services/viewFunctions";

import {MeleeWeaponData} from "@/types/BrawlerData";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<MeleeWeaponData[]>
) {
    const accountAddress = req.query.accountAddress as string;
    if(!accountAddress) res.status(200).send([]);
    const provider = getAptosProvider(Network.MAINNET);
    const collectionAddress = await getRangedWeaponCollectionAddress(provider.aptosClient);
    const tokens = await provider.indexerClient.getTokenOwnedFromCollectionAddress(
        accountAddress,
        collectionAddress
    );
    const rangedWeapons = await Promise.all(tokens.current_token_ownerships_v2.map((token) => (
        getRangedWeaponData(provider.aptosClient, token.storage_id)
    )));
    res.status(200).send(rangedWeapons.map(([power, type], index) => ({
        address: tokens.current_token_ownerships_v2[index].storage_id,
        type,
        power,
    })));
}


