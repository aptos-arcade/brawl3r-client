import {NextApiRequest, NextApiResponse} from "next";

import {Guid} from "guid-ts";

import {createMatch, setMatchResult} from "@/db/inserts/rankedInserts";

import {topRankedPlayers} from "@/services/leaderboard/ranked";
import {pick} from "@/services/utils";

import supportedCollections from "@/data/supportedCollections";
import {RankedMatchPlayer} from "@/types/Matches/RankedMatch";

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
        const playerRows = await topRankedPlayers(30, 4);

        // create 10 matches
        for(let player of playerRows) {
            const matchId = Guid.newGuid().toString();
            await createMatch(matchId);
            let teams: RankedMatchPlayer[][] = [];
            const player1 = player.playerAddress;
            teams.push([{
                playerAddress: player1,
                eliminations: Math.floor(Math.random() * 3),
                collectionIdHash: pick(supportedCollections)
            }]);

            let player2 = pick(playerRows).playerAddress;
            while(player2 === player1) {
                player2 = pick(playerRows).playerAddress;
            }
            teams.push([{
                playerAddress: player2,
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