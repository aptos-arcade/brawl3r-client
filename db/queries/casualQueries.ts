import {sql} from "@vercel/postgres";

import {CasualCollectionRowQuery} from "@/types/Leaderboard/CasualCollectionRow";
import {CasualPlayerRowQuery} from "@/types/Leaderboard/CasualPlayerRow";

export const topCasualPlayers = (numDays: number, limit: number) => sql<CasualPlayerRowQuery>`
    select r.player_id, p.player_name, sum(outcome) as wins, count(outcome) - sum(outcome) as losses
    from CasualResults r
    join Players p on r.player_id = p.player_id
    join CasualMatches m on r.match_id = m.match_id
    where m.status = 1 and date > extract(epoch from now()) - ${numDays * 24 * 60 * 60}
    group by p.player_name, r.player_id
    order by wins desc
    limit ${limit};
`;

export const topCasualPlayersByCollection = (numDays: number, limit: number, collectionIdHash: string) => sql<CasualPlayerRowQuery>`
    select r.player_id, p.player_name, sum(outcome) as wins, count(outcome) - sum(outcome) as losses
    from CasualResults r
    join Players p on r.player_id = p.player_id
    join CasualMatches m on r.match_id = m.match_id
    where m.status = 1 and date > extract(epoch from now()) - ${numDays * 24 * 60 * 60} and collection_id_hash = ${collectionIdHash}
    group by p.player_name, r.player_id
    order by wins desc
    limit ${limit};
`;

export const topCasualCollections = (numDays: number, limit: number) => sql<CasualCollectionRowQuery>`
    select collection_id_hash, sum(outcome) as wins, count(outcome) - sum(outcome) as losses
    from CasualResults r
    join CasualMatches m on r.match_id = m.match_id
    where m.status = 1 and date > extract(epoch from now()) - ${numDays * 24 * 60 * 60}
    group by collection_id_hash
    order by wins desc
    limit ${limit}
`;

