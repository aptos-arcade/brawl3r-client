import {RankedMatchPlayer} from "@/types/Matches/RankedMatchPlayer";

const insertMatch = (matchObjectId: string) => `
    insert into RankedMatches (match_object_id, status, date)
    values('${matchObjectId}', 0, extract(epoch from now()));
`;

const insertResults = (
    matchObjectId: string,
    playerAddress: string,
    collectionIdHash: string,
    teamIndex: number
) => `
    insert into RankedResults (match_object_id, player_address, collection_id_hash, outcome, team_index)
    values('${matchObjectId}', '${playerAddress}', '${collectionIdHash}', 0, ${teamIndex});
`;

export const createMatch = (matchObjectId: string, teams: RankedMatchPlayer[][]) => {
    let query = insertMatch(matchObjectId);
    teams.forEach((team, teamIndex) => {
        team.forEach((player) => {
            query += insertResults(
                matchObjectId,
                player.playerAddress,
                player.collectionIdHash,
                teamIndex
            );
        });
    });
    return query;
}

export const setMatchResult = (matchObjectId: string, winnerIndex: number) => `
    update RankedMatches
    set status = 1
    where match_object_id = '${matchObjectId}';

    update RankedResults
    set outcome = 1
    where match_object_id = '${matchObjectId}' and team_index = ${winnerIndex};
`;