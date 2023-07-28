export interface CasualPlayerRow {
    playerId: string;
    playerName: string
    wins: number;
    losses: number;
}

export interface CasualPlayerRowQuery {
    player_id: string;
    player_name: string;
    wins: string;
    losses: string;
}