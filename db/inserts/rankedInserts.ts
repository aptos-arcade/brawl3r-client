import {RankedMatchPlayer} from "@/types/Matches/RankedMatchPlayer";

export const insertMatch = (matchObjectId: string) => `
    insert into RankedMatches (match_object_id, date)
    values(${matchObjectId}, extract(epoch from now()))
`;

export const insertResult = (
    matchObjectId: string,
    playerAddress: string,
    collectionIdHash: string,
    outcome: number,
    teamIndex: number
) => `
    insert into RankedResults (match_object_id, player_address, collection_id_hash, outcome, team_index)
    values(${matchObjectId}, '${playerAddress}', '${collectionIdHash}', ${outcome}, ${teamIndex});
`;

export const reportMatch = (
    matchObjectId: string,
    teams: RankedMatchPlayer[][],
    winningTeamIndex: number
) => {
    let query = insertMatch(matchObjectId);
    teams.forEach((team, teamIndex) => {
        team.forEach((player) => {
            query += insertResult(
                matchObjectId,
                player.playerAddress,
                player.collectionIdHash,
                teamIndex === winningTeamIndex ? 1 : 0,
                teamIndex
            );
        });
    });
    return query;
}
