import {NextApiRequest, NextApiResponse} from "next";

import {setMatchResult} from "@/db/inserts/casualInserts";

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
        if(body.matchId === undefined) {
            res.status(400).json({message: 'Match ID is undefined'})
            return;
        }
        if(body.winnerIndex === undefined) {
            res.status(400).json({message: 'Winner index is undefined'})
            return;
        }

        await setMatchResult(body.matchId as string, body.winnerIndex as number)
            .catch((e) => res.status(400).json({message: e.message}));
        res.status(200).json({message: 'OK'});
    } else {
        res.status(400).json({message: 'Only POST requests allowed'})
    }
}