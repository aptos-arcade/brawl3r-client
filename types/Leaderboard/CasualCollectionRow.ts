export interface CasualCollectionRow {
    collectionIdHash: string;
    wins: number;
    losses: number;
}

export interface CasualCollectionRowQuery {
    collection_id_hash: string;
    wins: string;
    losses: string;
}