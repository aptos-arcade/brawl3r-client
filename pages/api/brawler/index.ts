import type { NextApiRequest, NextApiResponse } from 'next'

import { Network } from "aptos";

import { getAptosClient } from "@/services/aptosProvider";
import { getBrawlerCollectionAddress } from "@/services/viewFunctions";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    const collectionAddress = await getBrawlerCollectionAddress(getAptosClient(Network.MAINNET));
    res.status(200).json(collectionAddress)
}


