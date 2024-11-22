

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
type Position = { row: number; col: number };
type Move = {
    row: number;
    col: number;
    char_id: string;
    cost: number;
    path: Position[];
};

type CharState = {
    selected_char: Char | null;
    world_map: Map<number, Move>; // Map from index to Move
    width: number;
    height: number;
    highlighted_path: Position[]; // New state for the path
    mouse_movement_path: Position[]; // New state to track mouse movement

};

type CharActions = {
    select_char: (char: Char) => void;
    deselect_char: () => void;
    generate_moves: () => void;
    reset_world_map: () => void;
    set_highlighted_path: (path: Position[]) => void;
    add_to_mouse_path: (position: Position) => void;
    reset_mouse_path: () => void;
};

export type CharStore = CharState & CharActions;

export const useCharStore = create<CharStore>((set, get) => ({
    selected_char: null,
    world_map: new Map<number, Move>(),
    width: 24,
    height: 24,
    highlighted_path: [],
    mouse_movement_path: [], // Initialize the mouse movement path


    select_char: (char) => {
        set({ selected_char: char });
        get().generate_moves();
    },

    deselect_char: () => {
        set({ selected_char: null, highlighted_path: [] });
        get().reset_world_map();
    },

    generate_moves: () => {
        const { selected_char, width, height } = get();
        if (!selected_char) return;

        const available_moves = get_available_moves(selected_char, width, height);

        set(
            produce((state: CharState) => {
                state.world_map.clear();
                available_moves.forEach((moveNode) => {
                    const idx = to_index(moveNode.row, moveNode.col, width);
                    state.world_map.set(idx, {
                        row: moveNode.row,
                        col: moveNode.col,
                        char_id: selected_char.id,
                        cost: moveNode.cost,
                        path: moveNode.path,
                    });
                });
            })
        );
    },

    reset_world_map: () => {
        set({ world_map: new Map<number, Move>() });
    },

    set_highlighted_path: (path) => {
        set({ highlighted_path: path });
    },

    add_to_mouse_path: (position) =>
        set(
            produce((state: CharState) => {
                const path = state.mouse_movement_path;
                const lastPosition = path[path.length - 1] || state.selected_char;

                if (!lastPosition) {
                    // No last position, start path from character
                    state.mouse_movement_path = [position];
                    return;
                }

                const rowDiff = position.row - lastPosition.row;
                const colDiff = position.col - lastPosition.col;

                const isAdjacent = Math.abs(rowDiff) + Math.abs(colDiff) === 1;

                if (!isAdjacent) {
                    // Not adjacent, reset path to start from character
                    state.mouse_movement_path = [];
                    state.mouse_movement_path.push(position);
                } else if (state.mouse_movement_path.some((pos) => pos.row === position.row && pos.col === position.col)) {
                    // Backtracking is not allowed, do not add to path
                    // Optionally, reset path if backtracking is attempted
                    // state.mouse_movement_path = [];
                } else {
                    // Valid next tile, add to path
                    state.mouse_movement_path.push(position);
                }
            })
        ),

    reset_mouse_path: () =>
        set(
            produce((state: CharState) => {
                state.mouse_movement_path = [];
            })
        ),
}));

