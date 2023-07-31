import {NextApiRequest, NextApiResponse} from "next";

import {Guid} from "guid-ts";

import {createMatch} from "@/db/inserts/casualInserts";

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
        let matchId = Guid.newGuid().toString();
        await createMatch(matchId)
            .catch((e) => res.status(400).json({message: e.message}));
        res.status(200).json({message: matchId});
    } else {
        res.status(400).json({message: 'Only POST requests allowed'})
    }
}