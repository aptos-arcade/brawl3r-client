import type {NextApiRequest, NextApiResponse} from 'next'

import {topCasualPlayers, topCasualPlayersByCollection} from "@/db/queries/casualQueries";


import {CasualPlayerRow} from "@/types/Leaderboard/CasualPlayerRow";
import {convertCasualPlayerRowResult} from "@/services/dbConverters/casualConverters";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CasualPlayerRow[]>
) {

    const numDays = req.query.numDays as string;
    const limit = req.query.limit as string;
    const collectionIdHash = req.query.collectionIdHash as string;

    const { rows } = collectionIdHash
        ? await topCasualPlayersByCollection(
            parseInt(numDays),
            parseInt(limit),
            collectionIdHash
        ) : await topCasualPlayers(
            parseInt(numDays),
            parseInt(limit),
        )

    res.status(200).json(rows.map(convertCasualPlayerRowResult));
}


