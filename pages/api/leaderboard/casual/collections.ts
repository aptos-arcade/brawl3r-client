import type {NextApiRequest, NextApiResponse} from 'next'

import {getConnection, closeConnection} from "@/db/connection";
import {topCasualCollections} from "@/db/queries/casualQueries";

import {convertCasualCollectionRowResult} from "@/services/dbConverters/casualConverters";
import {CasualCollectionRow, CasualCollectionRowQuery} from "@/types/Leaderboard/CasualCollectionRow";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CasualCollectionRow[]>
) {
    const { numDays, limit } = req.query;

    const [pool, connection] = await getConnection();

    const { rows } = await pool.query<CasualCollectionRowQuery>(topCasualCollections(
        parseInt(numDays as string),
        parseInt(limit as string),
    ));

    await closeConnection(pool, connection);

    res.status(200).json(rows.map(convertCasualCollectionRowResult));
}


