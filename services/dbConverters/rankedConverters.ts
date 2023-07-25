import {RankedPlayerRow, RankedPlayerRowQuery} from "@/types/Leaderboard/RankedPlayerRow";
import {RankedCollectionRow, RankedCollectionRowQuery} from "@/types/Leaderboard/RankedCollectionRow";

export const convertRankedPlayerRowResult = (row: RankedPlayerRowQuery): RankedPlayerRow => ({
    playerAddress: row.player_address,
    wins: parseInt(row.wins),
    losses: parseInt(row.losses),
})

export const convertRankedCollectionRowResult = (row: RankedCollectionRowQuery): RankedCollectionRow => ({
    collectionIdHash: row.collection_id_hash,
    wins: parseInt(row.wins),
    losses: parseInt(row.losses),
})