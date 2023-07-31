import {NextApiRequest, NextApiResponse} from "next";

import {setMatchResult} from "@/db/inserts/casualInserts";
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
        const matchId = req.body.matchId as string;
        const winnerIndex = req.body.winnerIndex as number;
        const teams = req.body.teams as CasualMatchPlayer[][];

        if(matchId === undefined) {
            res.status(400).json({message: 'Match ID is undefined'})
            return;
        }
        if(winnerIndex === undefined) {
            res.status(400).json({message: 'Winner index is undefined'})
            return;
        }
        if(teams === undefined) {
            res.status(400).json({message: 'Teams is undefined'})
            return;
        }
        if(!Array.isArray(teams)) {
            res.status(400).json({message: 'Teams is not an array'})
            return;
        }
        if(teams.length < 2) {
            res.status(400).json({message: 'Must have at least two teams'})
            return;
        }
        if(teams.some((team: CasualMatchPlayer[]) => team == undefined || team.length < 1)) {
            res.status(400).json({message: 'Teams must have at least one player'})
            return;
        }
        if(teams.some((team: CasualMatchPlayer[]) => team.some((player: CasualMatchPlayer) => (
            player.playerId === undefined || player.collectionIdHash == undefined || player.eliminations === undefined
        )))) {
            res.status(400).json({message: 'Teams is not formatted correctly'})
            return;
        }
        if(winnerIndex < 0 || winnerIndex >= teams.length) {
            res.status(400).json({message: 'Winner index is out of bounds'})
            return;
        }

        await setMatchResult(matchId, winnerIndex, teams)
            .catch((e) => res.status(400).json({message: e.message}));
        res.status(200).json({message: 'OK'});
    } else {
        res.status(400).json({message: 'Only POST requests allowed'})
    }
}