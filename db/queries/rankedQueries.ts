import {sql} from "@vercel/postgres";
import {RankedCollectionRowQuery} from "@/types/Leaderboard/RankedCollectionRow";
import {RankedPlayerRowQuery} from "@/types/Leaderboard/RankedPlayerRow";

export const topRankedPlayers = (numDays: number, limit: number) => sql<RankedPlayerRowQuery>`
    select player_address, sum(outcome) as wins, count(outcome) - sum(outcome) as losses
    from RankedResults r
    join RankedMatches m on r.match_object_id = m.match_object_id
    where m.status = 1 and date > extract(epoch from now()) - ${numDays * 24 * 60 * 60}
    group by player_address
    order by wins desc
    limit ${limit};
`;

export const topRankedPlayersByCollection = (numDays: number, limit: number, collectionIdHash: string) => sql<RankedPlayerRowQuery>`
    select player_address, sum(outcome) as wins, count(outcome) - sum(outcome) as losses
    from RankedResults r
    join RankedMatches m on r.match_object_id = m.match_object_id
    where m.status = 1 and date > extract(epoch from now()) - ${numDays * 24 * 60 * 60} and collection_id_hash = ${collectionIdHash}
    group by player_address
    order by wins desc
    limit ${limit};
`;

export const topRankedCollections = (numDays: number, limit: number) => sql<RankedCollectionRowQuery>`
    select collection_id_hash, sum(outcome) as wins, count(outcome) - sum(outcome) as losses
    from RankedResults r
    join RankedMatches m on r.match_object_id = m.match_object_id
    where m.status = 1 and date > extract(epoch from now()) - ${numDays * 24 * 60 * 60}
    group by collection_id_hash
    order by wins desc
    limit ${limit}
`;
