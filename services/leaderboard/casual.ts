import {
    topCasualPlayers as topCasualPlayersDb,
    topCasualPlayersByCollection as topCasualPlayersByCollectionDb,
    topCasualCollections as topCasualCollectionsDb,
} from "@/db/queries/casualQueries";

import {convertCasualCollectionRowResult, convertCasualPlayerRowResult} from "@/services/dbConverters/casualConverters";

import {CasualPlayerRow} from "@/types/Leaderboard/CasualPlayerRow";
import { CasualCollectionRow } from "@/types/Leaderboard/CasualCollectionRow";

export const topCasualPlayers = async (numDays: number, limit: number): Promise<CasualPlayerRow[]> => {
    const { rows } = await topCasualPlayersDb(numDays, limit);
    return rows.map(convertCasualPlayerRowResult);
}

export const topCasualPlayersByCollection = async (numDays: number, limit: number, collectionIdHash: string): Promise<CasualPlayerRow[]> => {
    const { rows } = await topCasualPlayersByCollectionDb(numDays, limit, collectionIdHash);
    return rows.map(convertCasualPlayerRowResult);
}

export const topCasualCollections = async (numDays: number, limit: number): Promise<CasualCollectionRow[]> => {
    const { rows } = await topCasualCollectionsDb(numDays, limit);
    return rows.map(convertCasualCollectionRowResult);
}

