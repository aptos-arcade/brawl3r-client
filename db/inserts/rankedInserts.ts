import {RankedMatchPlayer} from "@/types/Matches/RankedMatchPlayer";
import {db, VercelPoolClient} from "@vercel/postgres";

const insertMatch = async (client: VercelPoolClient, matchObjectId: string) => client.sql`
    insert into RankedMatches (match_object_id, status, date)
    values(${matchObjectId}, 0, extract(epoch from now()));
`;

const insertResults = async (
    client: VercelPoolClient,
    matchObjectId: string,
    playerAddress: string,
    collectionIdHash: string,
    outcome: number,
    eliminations: number,
    teamIndex: number
) => client.sql`
    insert into RankedResults (match_object_id, player_address, collection_id_hash, outcome, eliminations, team_index)
    values(${matchObjectId}, ${playerAddress}, ${collectionIdHash}, ${outcome}, ${eliminations}, ${teamIndex});
`;

export const createMatch = async(matchObjectId: string) => {
    const client = await db.connect();
    await insertMatch(client, matchObjectId);
}

export const setMatchResult = async (matchObjectId: string, winnerIndex: number, teams: RankedMatchPlayer[][]) => {
    const client = await db.connect();
    await client.sql`
        update RankedMatches
        set status = 1
        where match_object_id = ${matchObjectId};
    `;
    await Promise.all(teams.map(async (team, teamIndex) => {
        await Promise.all(team.map(async (player) => {
            await insertResults(
                client,
                matchObjectId,
                player.playerAddress,
                player.collectionIdHash,
                teamIndex == winnerIndex ? 1 : 0,
                player.eliminations,
                teamIndex
            );
        }));
    }))
};