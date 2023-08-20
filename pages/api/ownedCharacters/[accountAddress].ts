import type {NextApiRequest, NextApiResponse} from 'next'

import {Network} from "aptos";

import {getAptosProvider} from "@/services/aptosProvider";
import {getAptosArenaOwnedTokens} from "@/services/ownedTokens";

import {TokenId} from "@/types/Token";

interface Response {
    tokens: TokenId[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {
    const accountAddress = req.query.accountAddress as string;
    if(!accountAddress) res.status(200).send({tokens: []});
    const provider = getAptosProvider(Network.MAINNET);
    const tokens = provider.indexerClient ? await getAptosArenaOwnedTokens(provider.indexerClient, accountAddress) : [];
    res.status(200).send({
        tokens
    });
}


