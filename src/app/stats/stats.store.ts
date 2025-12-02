import { createStore, withProps } from '@ngneat/elf';
import { ArcadeStats } from './game-stats.model';

export const STORAGE_KEY = 'arcade_stats';


function hasLocalStorage(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export const defaultStatsState: ArcadeStats = {
    labyrinthe: {
        gamesPlayed: 0,
        totalMoves: 0,
        lastDifficulty: 'easy',
        lastSize: 9,

    },
};


function getInitialState(): ArcadeStats {
    if (!hasLocalStorage()) {
        return defaultStatsState;
    }

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return defaultStatsState;
        }

        const parsed = JSON.parse(raw) as ArcadeStats;
        return {
            ...defaultStatsState,
            ...parsed,
        };
    } catch {
        return defaultStatsState;
    }
}


export const statsStore = createStore(
    { name: 'stats' },
    withProps<ArcadeStats>(getInitialState())
);


statsStore.subscribe((state) => {
    if (!hasLocalStorage()) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
});
