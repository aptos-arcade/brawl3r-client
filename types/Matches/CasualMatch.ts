export interface CasualMatchPlayer {
    playerId: string,
    collectionIdHash: string,
    eliminations: number
}

export interface CasualMatchTeam {
    players: CasualMatchPlayer[]
}