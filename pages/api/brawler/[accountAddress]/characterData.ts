import type { NextApiRequest, NextApiResponse } from 'next'

import { Network } from "aptos";

import {getPlayerCharacterData} from "@/services/viewFunctions";
import {getAptosClient} from "@/services/aptosProvider";

import {CharacterData} from "@/types/BrawlerData";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CharacterData>
) {
    const characterData = await getPlayerCharacterData(
        getAptosClient(Network.MAINNET),
        req.query.accountAddress as string
    );
    res.status(200).json(characterData)
}


