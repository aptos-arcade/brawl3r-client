import {Guid} from "guid-ts";

import {CasualMatchPlayer} from "@/types/Matches/CasualMatchPlayer";

export const insertMatch = (matchId: string) => `
    insert into CasualMatches (match_id, date)
    values('${matchId}', extract(epoch from now()));
`;

export const insertResult = (
    matchId: string,
    playerId: string,
    collectionIdHash: string,
    outcome: number,
    teamIndex: number
) => `
    insert into CasualResults (match_id, player_id, collection_id_hash, outcome, team_index)
    values('${matchId}', '${playerId}', '${collectionIdHash}', ${outcome}, ${teamIndex});
`;

export const reportMatch = (
    teams: CasualMatchPlayer[][],
    winningTeamIndex: number
) => {
    let matchId = Guid.newGuid().toString();
    let query = insertMatch(matchId);
    teams.forEach((team, teamIndex) => {
        team.forEach((player) => {
            query += insertResult(
                matchId,
                player.playerId,
                player.collectionIdHash,
                teamIndex === winningTeamIndex ? 1 : 0,
                teamIndex
            );
        });
    });
    return query;
}
