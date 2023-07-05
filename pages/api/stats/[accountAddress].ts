import type {NextApiRequest, NextApiResponse} from 'next'

import {Network} from "aptos";

import {getAptosProvider} from "@/services/aptosProvider";
import {getPlayerStats} from "@/services/viewFunctions";

import {PlayerStats} from "@/types/PlayerStats";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<PlayerStats>
) {
    const provider = getAptosProvider(Network.MAINNET);
    const tokens = await getPlayerStats(provider.aptosClient, req.query.accountAddress as string);
    res.status(200).send(tokens);
}


