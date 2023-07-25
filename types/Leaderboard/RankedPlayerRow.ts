export interface RankedPlayerRow {
    playerAddress: string;
    wins: number;
    losses: number;
}

export interface RankedPlayerRowQuery {
    player_address: string;
    wins: string;
    losses: string;
}