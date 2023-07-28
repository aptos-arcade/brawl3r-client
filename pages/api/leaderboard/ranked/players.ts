import type {NextApiRequest, NextApiResponse} from 'next'

import {topRankedPlayers} from "@/db/queries/rankedQueries";
import {getConnection, closeConnection} from "@/db/connection";

import {RankedPlayerRow, RankedPlayerRowQuery} from "@/types/Leaderboard/RankedPlayerRow";
import {convertRankedPlayerRowResult} from "@/services/dbConverters/rankedConverters";
import {fetchANS} from "@/services/aptosUtils";

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

    await Promise.all(rows.map(async (row) => {
        const ans = await fetchANS(row.player_address);
        if(ans) row.player_address = ans;
    }));

    res.status(200).json(rows.map(convertRankedPlayerRowResult));
}


