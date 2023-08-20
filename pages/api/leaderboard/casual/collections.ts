import type {NextApiRequest, NextApiResponse} from 'next'

import {topCasualCollections} from "@/services/leaderboard/casual";

import {CasualCollectionRow} from "@/types/Leaderboard/CasualCollectionRow";

interface Response {
    rows: CasualCollectionRow[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {
    const numDays = req.query.numDays as string;
    const limit = req.query.limit as string;
    res.status(200).json({
        rows: await topCasualCollections(
            parseInt(numDays),
            parseInt(limit),
        )
    });
}


