import type {NextApiRequest, NextApiResponse} from 'next'

import {getConnection, closeConnection} from "@/db/connection";
import {topCasualPlayers} from "@/db/queries/casualQueries";

import {convertCasualPlayerRowResult} from "@/services/dbConverters/casualConverters";

import {CasualPlayerRow, CasualPlayerRowQuery} from "@/types/Leaderboard/CasualPlayerRow";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CasualPlayerRow[]>
) {
    const { numDays, limit, collectionIdHash } = req.query;

    const [pool, connection] = await getConnection();

    const { rows } = await pool.query<CasualPlayerRowQuery>(topCasualPlayers(
        parseInt(numDays as string),
        parseInt(limit as string),
        collectionIdHash ? collectionIdHash as string : undefined
    ));

    await closeConnection(pool, connection);

    res.status(200).json(rows.map(convertCasualPlayerRowResult));
}


