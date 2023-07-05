import type { NextApiRequest, NextApiResponse } from 'next'

import { Network } from "aptos";

import { getPlayerBrawlerData } from "@/services/viewFunctions";
import { getAptosClient } from "@/services/aptosProvider";

import {BrawlerData} from "@/types/BrawlerData";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<BrawlerData>
) {
    const playerData = await getPlayerBrawlerData(
        getAptosClient(Network.MAINNET),
        req.query.accountAddress as string
    );
    res.status(200).json(playerData)
}


