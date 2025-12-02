import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from '@ngneat/elf';

import { ArcadeStats } from './game-stats.model';
import { statsStore, defaultStatsState } from './stats.store';

@Injectable({
    providedIn: 'root',
})
export class StatsService {


    stats$: Observable<ArcadeStats> = statsStore.pipe(
        select((state) => state)
    );

    constructor() { }

    getStats(): ArcadeStats {
        return statsStore.getValue();
    }

    resetStats(): void {
        statsStore.update(() => defaultStatsState);
    }

    updateGameStats(
        game: keyof ArcadeStats,
        options: {
            timeMs?: number;
            moves?: number;
            difficulty?: 'easy' | 'medium' | 'hard';
            size?: number;
        }
    ): void {
        statsStore.update((state) => {
            const gameStats = { ...state[game] };

            gameStats.gamesPlayed = (gameStats.gamesPlayed ?? 0) + 1;


            if (options.timeMs != null) {
                if (!gameStats.bestTimeMs || options.timeMs < gameStats.bestTimeMs) {
                    gameStats.bestTimeMs = options.timeMs;
                }
            }


            if (options.moves != null) {
                gameStats.lastMoves = options.moves;
                gameStats.totalMoves = (gameStats.totalMoves ?? 0) + options.moves;

                if (gameStats.bestMoves == null || options.moves < gameStats.bestMoves) {
                    gameStats.bestMoves = options.moves;
                }
            }


            if (options.difficulty) {
                gameStats.lastDifficulty = options.difficulty;
            }
            if (options.size != null) {
                gameStats.lastSize = options.size;
            }

            gameStats.lastPlayed = new Date().toISOString();

            return {
                ...state,
                [game]: gameStats,
            };
        });
    }
}
