import type {NextApiRequest, NextApiResponse} from 'next'

import {topRankedPlayers, topRankedPlayersByCollection} from "@/db/queries/rankedQueries";

import {RankedPlayerRow} from "@/types/Leaderboard/RankedPlayerRow";
import {fetchANS} from "@/services/aptosUtils";
import {convertRankedPlayerRowResult} from "@/services/dbConverters/rankedConverters";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<RankedPlayerRow[]>
) {
    const numDays = req.query.numDays as string;
    const limit = req.query.limit as string;
    const collectionIdHash = req.query.collectionIdHash as string;

    const { rows } = collectionIdHash
        ? await topRankedPlayersByCollection(
            parseInt(numDays),
            parseInt(limit),
            collectionIdHash
        ) : await topRankedPlayers(
            parseInt(numDays),
            parseInt(limit),
        )

    await Promise.all(rows.map(async (row) => {
        const ans = await fetchANS(row.player_address);
        if(ans) row.player_address = ans;
    }));

    res.status(200).json(rows.map(convertRankedPlayerRowResult));
}


