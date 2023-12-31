import {CasualPlayerRow, CasualPlayerRowQuery} from "@/types/Leaderboard/CasualPlayerRow";
import {CasualCollectionRow, CasualCollectionRowQuery} from "@/types/Leaderboard/CasualCollectionRow";

export const convertCasualPlayerRowResult = (row: CasualPlayerRowQuery): CasualPlayerRow => ({
    playerId: row.player_id,
    playerName: row.player_name,
    wins: parseInt(row.wins),
    losses: parseInt(row.losses),
    eliminations: parseInt(row.eliminations)
})

export const convertCasualCollectionRowResult = (row: CasualCollectionRowQuery): CasualCollectionRow => ({
    collectionIdHash: row.collection_id_hash,
    wins: parseInt(row.wins),
    losses: parseInt(row.losses),
    eliminations: parseInt(row.eliminations)
});