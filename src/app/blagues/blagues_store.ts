import { createStore, withProps } from '@ngneat/elf';

export interface BlagueState {
    categories: string[];
    currentJoke: string;
    loading: boolean;
    error: string | null;
}

const initialState: BlagueState = {
    categories: [],
    currentJoke: '',
    loading: false,
    error: null,
};

export const blagueStore = createStore(
    { name: 'blagues' },
    withProps<BlagueState>(initialState)
);
