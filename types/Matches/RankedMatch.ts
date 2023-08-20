export interface RankedMatchPlayer {
    playerAddress: string,
    collectionIdHash: string,
    eliminations: number
}

export interface RankedMatchTeam {
    players: RankedMatchPlayer[]
}

export interface CreateRankedMatchTeam {
    players: string[]
}