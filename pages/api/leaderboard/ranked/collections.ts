import type {NextApiRequest, NextApiResponse} from 'next'

import {topRankedCollections} from "@/db/queries/rankedQueries";
import {getConnection, closeConnection} from "@/db/connection";

import {RankedCollectionRow, RankedCollectionRowQuery} from "@/types/Leaderboard/RankedCollectionRow";
import {convertRankedCollectionRowResult} from "@/services/dbConverters/rankedConverters";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<RankedCollectionRow[]>
) {
    const { numDays, limit } = req.query;

    const [pool, connection] = await getConnection();

    const { rows } = await pool.query<RankedCollectionRowQuery>(topRankedCollections(
        parseInt(numDays as string),
        parseInt(limit as string),
    ));

    await closeConnection(pool, connection);

    res.status(200).json(rows.map(convertRankedCollectionRowResult));
}


