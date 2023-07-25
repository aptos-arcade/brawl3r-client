import type {NextApiRequest, NextApiResponse} from 'next'

import {topRankedPlayers} from "@/db/queries/rankedQueries";
import {getConnection, closeConnection} from "@/db/connection";

import {RankedPlayerRow, RankedPlayerRowQuery} from "@/types/Leaderboard/RankedPlayerRow";
import {convertRankedPlayerRowResult} from "@/services/dbConverters/rankedConverters";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<RankedPlayerRow[]>
) {
    const { numDays, limit, collectionIdHash } = req.query;

    const [pool, connection] = await getConnection();

    const { rows } = await pool.query<RankedPlayerRowQuery>(topRankedPlayers(
        parseInt(numDays as string),
        parseInt(limit as string),
        collectionIdHash ? collectionIdHash as string : undefined
    ));

    await closeConnection(pool, connection);

    res.status(200).json(rows.map(convertRankedPlayerRowResult));
}


