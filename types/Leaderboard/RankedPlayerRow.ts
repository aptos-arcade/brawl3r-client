export interface RankedPlayerRow {
    playerAddress: string;
    wins: number;
    losses: number;
    eliminations: number;
}

export interface RankedPlayerRowQuery {
    player_address: string;
    wins: string;
    losses: string;
    eliminations: string;
}