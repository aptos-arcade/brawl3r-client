export const topRankedPlayers = (numDays: number, limit: number, collectionIdHash?: string) => `
    select player_address, sum(outcome) as wins, count(outcome) - sum(outcome) as losses
    from RankedResults
    join RankedMatches on RankedResults.match_object_id = RankedMatches.match_object_id
    where 
        date > extract(epoch from now()) - ${numDays * 24 * 60 * 60}
        ${collectionIdHash ? `and collection_id_hash = '${collectionIdHash}'` : ''}
    group by player_address
    order by wins desc
    limit ${limit};
`;

export const topRankedCollections = (numDays: number, limit: number) => `
    select collection_id_hash, sum(outcome) as wins, count(outcome) - sum(outcome) as losses
    from RankedResults
    join RankedMatches on RankedResults.match_object_id = RankedMatches.match_object_id
    where date > extract(epoch from now()) - ${numDays * 24 * 60 * 60}
    group by collection_id_hash
    order by wins desc
    limit ${limit}
`;

export const winStreakByPlayer = (playerAddress: string) => `
    select player_address, count(outcome) as wins
    from RankedResults
    join RankedMatches on RankedResults.match_object_id = RankedMatches.match_object_id
    where outcome = 1 and player_address = '${playerAddress}'
    group by player_address
    order by wins desc
    limit 1
`;

