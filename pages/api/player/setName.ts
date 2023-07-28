import {NextApiRequest, NextApiResponse} from "next";

import {closeConnection, getConnection} from "@/db/connection";
import {upsertPlayerName} from "@/db/inserts/playerInserts";
// import {runCorsMiddleware} from "@/services/apiUtils";

interface Data {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    if (req.method === 'OPTIONS') {
        return res.status(200).send({message: "OK"});
    }

    if (req.method === 'POST') {
        // get the request body json
        const { body } = req;

        if(body.playerId === undefined) {
            res.status(400).json({message: 'Player ID is undefined'})
            return;
        }
        if(body.name === undefined) {
            res.status(400).json({message: 'Name is undefined'})
            return;
        }
        if(typeof body.name !== 'string') {
            res.status(400).json({message: 'Name is not a string'})
            return;
        }
        if(body.name.length < 1) {
            res.status(400).json({message: 'Name is empty'})
            return;
        }
        if(body.name.length > 64) {
            res.status(400).json({message: 'Name is too long'})
            return;
        }

        const [pool, connection] = await getConnection();
        await pool.query(upsertPlayerName(body.playerId as string, body.name as string))
            .catch((e) => res.status(400).json({message: e.message}));
        await closeConnection(pool, connection);
        res.status(200).json({message: 'OK'});
    } else {
        res.status(400).json({message: 'Only POST requests allowed'})
    }
}