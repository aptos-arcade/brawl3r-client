import type { NextApiRequest, NextApiResponse } from 'next'

import { Network } from "aptos";

import {getPlayerRangedWeaponData} from "@/services/viewFunctions";
import {getAptosClient} from "@/services/aptosProvider";

import {RangedWeaponData} from "@/types/BrawlerData";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<RangedWeaponData>
) {
    const rangedWeaponData = await getPlayerRangedWeaponData(
        getAptosClient(Network.MAINNET),
        req.query.accountAddress as string
    );
    res.status(200).json(rangedWeaponData)
}


