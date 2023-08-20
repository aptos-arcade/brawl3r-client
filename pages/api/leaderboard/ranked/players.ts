import type {NextApiRequest, NextApiResponse} from 'next'

import {topRankedPlayers, topRankedPlayersByCollection} from "@/services/leaderboard/ranked";
import {fetchANS} from "@/services/aptosUtils";

import {RankedPlayerRow} from "@/types/Leaderboard/RankedPlayerRow";

interface Response {
    rows: RankedPlayerRow[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {
    const numDays = req.query.numDays as string;
    const limit = req.query.limit as string;
    const collectionIdHash = req.query.collectionIdHash as string;

    const rows = collectionIdHash
        ? await topRankedPlayersByCollection(
            parseInt(numDays),
            parseInt(limit),
            collectionIdHash
        ) : await topRankedPlayers(
            parseInt(numDays),
            parseInt(limit),
        )

    await Promise.all(rows.map(async (row) => {
        const ans = await fetchANS(row.playerAddress);
        if(ans) row.playerAddress = ans;
    }));

    res.status(200).json({rows});
}


