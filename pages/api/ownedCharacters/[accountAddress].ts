import type {NextApiRequest, NextApiResponse} from 'next'

import {Network} from "aptos";

import {getAptosProvider} from "@/services/aptosProvider";
import {getAptosArenaOwnedTokens} from "@/services/ownedTokens";

import {TokenId} from "@/types/Token";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<TokenId[]>
) {
    const accountAddress = req.query.accountAddress as string;
    if(!accountAddress) res.status(200).send([]);
    const provider = getAptosProvider(Network.MAINNET);
    const tokens = await getAptosArenaOwnedTokens(provider.indexerClient, accountAddress);
    res.status(200).send(tokens);
}


