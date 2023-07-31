export interface CasualPlayerRow {
    playerId: string;
    playerName: string
    wins: number;
    losses: number;
    eliminations: number;
}

export interface CasualPlayerRowQuery {
    player_id: string;
    player_name: string;
    wins: string;
    losses: string;
    eliminations: string;
}