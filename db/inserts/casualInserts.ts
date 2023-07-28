import {CasualMatchPlayer} from "@/types/Matches/CasualMatchPlayer";

const insertMatch = (matchId: string) => `
    insert into CasualMatches (match_id, status, date)
    values('${matchId}', 0, extract(epoch from now()));
`;

const insertResult = (
    matchId: string,
    playerId: string,
    collectionIdHash: string,
    teamIndex: number
) => `
    insert into CasualResults (match_id, player_id, collection_id_hash, outcome, team_index)
    values('${matchId}', '${playerId}', '${collectionIdHash}', 0, ${teamIndex});
`;

export const createMatch = (matchId: string, teams: CasualMatchPlayer[][]) => {
    let query = insertMatch(matchId);
    teams.forEach((team, teamIndex) => {
        team.forEach((player) => {
            query += insertResult(
                matchId,
                player.playerId,
                player.collectionIdHash,
                teamIndex
            );
        });
    });
    return query;
}

export const setMatchResult = (matchId: string, winnerIndex: number) => `
    update CasualMatches
    set status = 1
    where match_id = '${matchId}';

    update CasualResults
    set outcome = 1
    where match_id = '${matchId}' and team_index = ${winnerIndex};
`;
