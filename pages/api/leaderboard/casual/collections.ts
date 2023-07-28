import type {NextApiRequest, NextApiResponse} from 'next'

import {topCasualCollections} from "@/db/queries/casualQueries";

import {CasualCollectionRow} from "@/types/Leaderboard/CasualCollectionRow";
import {convertCasualCollectionRowResult} from "@/services/dbConverters/casualConverters";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CasualCollectionRow[]>
) {
    const numDays = req.query.numDays as string;
    const limit = req.query.limit as string;

    const { rows } = await topCasualCollections(
        parseInt(numDays),
        parseInt(limit),
    );

    res.status(200).json(rows.map(convertCasualCollectionRowResult));
}


