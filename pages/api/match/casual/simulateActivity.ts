import {NextApiRequest, NextApiResponse} from "next";

import {Guid} from "guid-ts";

import {createMatch, setMatchResult} from "@/db/inserts/casualInserts";

import {topCasualPlayers} from "@/services/leaderboard/casual";
import {pick} from "@/services/utils";

import supportedCollections from "@/data/supportedCollections";
import {CasualMatchPlayer} from "@/types/Matches/CasualMatch";

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

        // get the top 10 casual players
        const playerRows = await topCasualPlayers(30, 3);

        // create 10 matches
        for(let player of playerRows) {
            const matchId = Guid.newGuid().toString();
            await createMatch(matchId);
            let teams: CasualMatchPlayer[][] = [];
            const player1 = player.playerId;
            teams.push([{
                playerId: player1,
                eliminations: Math.floor(Math.random() * 3),
                collectionIdHash: pick(supportedCollections)
            }]);

            let player2 = pick(playerRows).playerId;
            while(player2 === player1) {
                player2 = pick(playerRows).playerId;
            }
            teams.push([{
                playerId: player2,
                eliminations: Math.floor(Math.random() * 3),
                collectionIdHash: pick(supportedCollections)
            }]);
            await setMatchResult(matchId, Math.floor(Math.random() * 2), teams)
        }

        console.log('done')

        res.status(200).json({message: 'OK'})

    } else {
        res.status(400).json({message: 'Only POST requests allowed'})
    }
}