import type { NextApiRequest, NextApiResponse } from 'next'

import { Network } from "aptos";

import { getPlayerBrawlerTokenAddress } from "@/services/viewFunctions";
import {getAptosClient} from "@/services/aptosProvider";
import {BrawlerAddress} from "@/types/BrawlerData/BrawlerAddress";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<BrawlerAddress>
) {
    const address = await getPlayerBrawlerTokenAddress(
        getAptosClient(Network.MAINNET),
        req.query.accountAddress as string
    );
    res.status(200).json({
        address
    })
}


