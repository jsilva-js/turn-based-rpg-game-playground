
// src/stores/charStore.ts
import { create } from 'zustand';
import { produce } from 'immer';
import { to_index } from '@/lib/utils/grid';
import { get_available_moves } from './mov';
export type Char = {
    id: string;
    row: number;
    col: number;
    move_points: number;
    // Add other properties as needed
};

type Move = {
    row: number;
    col: number;
    char_id: string;
};

type CharState = {
    selected_char: Char | null;
    world_map: (Move | null)[];
    width: number;
    height: number;
};

type CharActions = {
    select_char: (char: Char) => void;
    deselect_char: () => void;
    generate_moves: () => void;
    reset_world_map: () => void;
};

export type CharStore = CharState & CharActions;

export const useCharStore = create<CharStore>((set, get) => ({
    selected_char: null,
    world_map: Array(24 * 24).fill(null),
    width: 24,
    height: 24,

    select_char: (char) => {
        set({ selected_char: char });
        get().generate_moves();
    },

    deselect_char: () => {
        set({ selected_char: null });
        get().reset_world_map();
    },

    generate_moves: () => {
        const { selected_char, width, height } = get();
        if (!selected_char) return;

        const available_moves = get_available_moves(selected_char, width, height);

        set(
            produce((state: CharState) => {
                state.world_map = Array(width * height).fill(null);
                available_moves.forEach((move) => {
                    const idx = to_index(move.row, move.col, width);
                    state.world_map[idx] = { ...move, char_id: selected_char.id };
                });
            })
        );
    },

    reset_world_map: () => {
        const { width, height } = get();
        set({ world_map: Array(width * height).fill(null) });
    },
}));
