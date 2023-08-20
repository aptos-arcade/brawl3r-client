import {
    topRankedPlayers as topRankedPlayersDb,
    topRankedPlayersByCollection as topRankedPlayersByCollectionDb,
    topRankedCollections as topRankedCollectionsDb,
} from "@/db/queries/rankedQueries";

import {convertRankedCollectionRowResult, convertRankedPlayerRowResult} from "@/services/dbConverters/rankedConverters";

import {RankedPlayerRow} from "@/types/Leaderboard/RankedPlayerRow";
import { RankedCollectionRow } from "@/types/Leaderboard/RankedCollectionRow";

export const topRankedPlayers = async (numDays: number, limit: number): Promise<RankedPlayerRow[]> => {
    const { rows } = await topRankedPlayersDb(numDays, limit);
    return rows.map(convertRankedPlayerRowResult);
}

export const topRankedPlayersByCollection = async (numDays: number, limit: number, collectionIdHash: string): Promise<RankedPlayerRow[]> => {
    const { rows } = await topRankedPlayersByCollectionDb(numDays, limit, collectionIdHash);
    return rows.map(convertRankedPlayerRowResult);
}

export const topRankedCollections = async (numDays: number, limit: number): Promise<RankedCollectionRow[]> => {
    const { rows } = await topRankedCollectionsDb(numDays, limit);
    return rows.map(convertRankedCollectionRowResult);
}

