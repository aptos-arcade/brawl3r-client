import type {NextApiRequest, NextApiResponse} from 'next'

import {topRankedCollections} from "@/services/leaderboard/ranked";

import {RankedCollectionRow} from "@/types/Leaderboard/RankedCollectionRow";

interface Response {
    rows: RankedCollectionRow[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {
    const numDays = req.query.numDays as string;
    const limit = req.query.limit as string;
    res.status(200).json({
        rows: await topRankedCollections(
            parseInt(numDays),
            parseInt(limit),
        )
    });
}


