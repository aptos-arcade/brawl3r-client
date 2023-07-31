export interface RankedCollectionRow {
    collectionIdHash: string;
    wins: number;
    losses: number;
    eliminations: number;
}

export interface RankedCollectionRowQuery {
    collection_id_hash: string;
    wins: string;
    losses: string;
    eliminations: string;
}