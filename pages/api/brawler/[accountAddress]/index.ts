import type { NextApiRequest, NextApiResponse } from 'next'

import { Network } from "aptos";

import { getPlayerBrawlerTokenAddress } from "@/services/viewFunctions";
import {getAptosClient} from "@/services/aptosProvider";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    const tokenAddress = await getPlayerBrawlerTokenAddress(
        getAptosClient(Network.MAINNET),
        req.query.accountAddress as string
    );
    res.status(200).json(tokenAddress)
}


