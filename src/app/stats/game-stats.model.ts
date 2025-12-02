export interface LabyrintheStats {
    gamesPlayed: number;
    bestTimeMs?: number;
    lastPlayed?: string;

    lastMoves?: number;
    bestMoves?: number;
    totalMoves?: number;

    lastDifficulty?: 'easy' | 'medium' | 'hard';
    lastSize?: number;
}

export interface ArcadeStats {
    labyrinthe: LabyrintheStats;
}
