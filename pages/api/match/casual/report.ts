import {NextApiRequest, NextApiResponse} from "next";

import {closeConnection, getConnection} from "@/db/connection";
import {reportMatch} from "@/db/inserts/casualInserts";

import {CasualMatchPlayer} from "@/types/Matches/CasualMatchPlayer";

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
        if(body.teams === undefined) {
            res.status(400).json({message: 'Teams is undefined'})
            return;
        }
        if(!Array.isArray(body.teams)) {
            res.status(400).json({message: 'Teams is not an array'})
            return;
        }
        if(body.teams.length < 2) {
            res.status(400).json({message: 'Must have at least two teams'})
            return;
        }
        if(body.teams.some((team: CasualMatchPlayer[]) => team == undefined || team.length < 1)) {
            res.status(400).json({message: 'Teams must have at least one player'})
            return;
        }
        if(body.teams.some((team: CasualMatchPlayer[]) => team.some((player: CasualMatchPlayer) => (
            player.playerId === undefined || player.collectionIdHash == undefined
        )))) {
            res.status(400).json({message: 'Teams is not formatted correctly'})
            return;
        }
        if(body.winnerIndex === undefined) {
            res.status(400).json({message: 'Winner index is undefined'})
            return;
        }
        if(body.winnerIndex < 0 || body.winnerIndex >= body.teams.length) {
            res.status(400).json({message: 'Winner index is out of bounds'})
            return;
        }

        const [pool, connection] = await getConnection();
        await pool.query(reportMatch(body.teams as CasualMatchPlayer[][], body.winnerIndex as number))
            .catch((e) => res.status(400).json({message: e.message}));
        await closeConnection(pool, connection);
        res.status(200).json({message: 'OK'});
    } else {
        res.status(400).json({message: 'Only POST requests allowed'})
    }
}