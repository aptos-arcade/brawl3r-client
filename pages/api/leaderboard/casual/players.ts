import type {NextApiRequest, NextApiResponse} from 'next'

import {topCasualPlayers, topCasualPlayersByCollection} from "@/services/leaderboard/casual";

import {CasualPlayerRow} from "@/types/Leaderboard/CasualPlayerRow";

interface Response {
    rows: CasualPlayerRow[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {

    const numDays = req.query.numDays as string;
    const limit = req.query.limit as string;
    const collectionIdHash = req.query.collectionIdHash as string;

    res.status(200).json({
        rows: collectionIdHash
            ? await topCasualPlayersByCollection(
                parseInt(numDays),
                parseInt(limit),
                collectionIdHash
            ) : await topCasualPlayers(
                parseInt(numDays),
                parseInt(limit),
            )
    });
}


