export const topCasualPlayers = (numDays: number, limit: number, collectionIdHash?: string) => `
    select CasualResults.player_id, player_name, sum(outcome) as wins, count(outcome) - sum(outcome) as losses
    from CasualResults
    join CasualMatches on CasualResults.match_id = CasualMatches.match_id
    join Players on CasualResults.player_id = Players.player_id
    where 
        date > extract(epoch from now()) - ${numDays * 24 * 60 * 60}
        ${collectionIdHash ? `and collection_id_hash = '${collectionIdHash}'` : ''}
    group by CasualResults.player_id
    order by wins desc
    limit ${limit};
`;

export const topCasualCollections = (numDays: number, limit: number) => `
    select collection_id_hash, sum(outcome) as wins, count(outcome) - sum(outcome) as losses
    from CasualResults
    join CasualMatches on CasualResults.match_id = CasualMatches.match_id
    where date > extract(epoch from now()) - ${numDays * 24 * 60 * 60}
    group by collection_id_hash
    order by wins desc
    limit ${limit}
`;

