import type { NextApiRequest, NextApiResponse } from 'next'

import { Network } from "aptos";

import {getPlayerMeleeWeaponData} from "@/services/viewFunctions";
import {getAptosClient} from "@/services/aptosProvider";

import {MeleeWeaponData} from "@/types/BrawlerData";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<MeleeWeaponData>
) {
    const meleeWeaponData = await getPlayerMeleeWeaponData(
        getAptosClient(Network.MAINNET),
        req.query.accountAddress as string
    );
    res.status(200).json(meleeWeaponData)
}


