import {CasualMatchPlayer} from "@/types/Matches/CasualMatchPlayer";
import {db, VercelPoolClient} from "@vercel/postgres";

const insertMatch = (client: VercelPoolClient, matchId: string) => client.sql`
    insert into CasualMatches (match_id, status, date)
    values(${matchId}, 0, extract('epoch' from now()));
`;

const insertResult = async (
    client: VercelPoolClient,
    matchId: string,
    playerId: string,
    collectionIdHash: string,
    outcome: number,
    eliminations: number,
    teamIndex: number
) => client.sql`
    insert into CasualResults (match_id, player_id, collection_id_hash, outcome, eliminations, team_index)
    values(${matchId}, ${playerId}, ${collectionIdHash}, ${outcome}, ${eliminations}, ${teamIndex});
`;

export const createMatch = async (matchId: string) => {
    const client = await db.connect();
    await insertMatch(client, matchId);
}

export const setMatchResult = async (matchId: string, winnerIndex: number, teams: CasualMatchPlayer[][]) => {
    const client = await db.connect();
    await client. sql`
        update CasualMatches
        set status = 1
        where match_id = ${matchId};
    `;
    await Promise.all(teams.map(async (team, teamIndex) => {
        await Promise.all(team.map(async (player) => {
            await insertResult(
                client,
                matchId,
                player.playerId,
                player.collectionIdHash,
                teamIndex == winnerIndex ? 1 : 0,
                player.eliminations,
                teamIndex
            );
        }));
    }));
}
