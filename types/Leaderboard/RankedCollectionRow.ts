export interface RankedCollectionRow {
    collectionIdHash: string;
    wins: number;
    losses: number;
}

export interface RankedCollectionRowQuery {
    collection_id_hash: string;
    wins: string;
    losses: string;
}