import type {NextApiRequest, NextApiResponse} from 'next'

import {topRankedCollections} from "@/db/queries/rankedQueries";

import {RankedCollectionRow} from "@/types/Leaderboard/RankedCollectionRow";
import {convertRankedCollectionRowResult} from "@/services/dbConverters/rankedConverters";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<RankedCollectionRow[]>
) {
    const numDays = req.query.numDays as string;
    const limit = req.query.limit as string;

    const { rows } = await topRankedCollections(
        parseInt(numDays),
        parseInt(limit),
    );

    res.status(200).json(rows.map(convertRankedCollectionRowResult));
}


