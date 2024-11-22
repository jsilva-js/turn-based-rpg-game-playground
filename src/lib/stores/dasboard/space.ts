import { create } from 'zustand';
import { produce } from 'immer';
import { to_index } from '@/lib/utils/grid';
import { Char } from '../char';

const x_length = 24;
const y_length = 24;

export enum TileStatus {
    HOVERED,
    SELECTED,
    HIGHLIGHTED,
    IDLE,
}

export type Tile = {
    id: string;
    status: TileStatus;
    slot: Char | null;
};

export type SpaceState = {
    width: number;
    height: number;
    tiles: (Tile | null)[];
    hoveredTile: number | null;
    selectedTile: number | null; // Added selectedTile
};

export type SpaceActions = {
    set_tile: (row: number, col: number) => void;
    set_tiles: (positions: { row: number; col: number }[]) => void;
    clear_tile: (row: number, col: number) => void;
    hover_tile: (row: number, col: number) => void;
    select_tile: (row: number, col: number) => void;
    deselect_tile: (row: number, col: number) => void;
    create_tile: (row: number, col: number) => void;
    add_char_to_random_tile: (char: Char) => void;
    move_character: (char: Char, newRow: number, newCol: number) => void
};

export type SpaceStore = SpaceState & SpaceActions;

export const defaultInitial: SpaceState = {
    width: x_length,
    height: y_length,
    tiles: Array.from({ length: x_length * y_length }, () => null),
    hoveredTile: null,
    selectedTile: null, // Initialized selectedTile
};

export const createSpaceStore = (
    initState: SpaceState = defaultInitial
) => {
    return create<SpaceStore>()((set) => ({
        ...initState,

        set_tile: (row, col) =>
            set(
                produce((state: SpaceState) => {
                    const idx = to_index(row, col, state.width);
                    if (!state.tiles[idx]) {
                        state.tiles[idx] = { id: `${row},${col}`, status: TileStatus.IDLE, slot: null };
                    }
                })
            ),

        set_tiles: (positions) =>
            set(
                produce((state: SpaceState) => {
                    positions.forEach(({ row, col }) => {
                        const idx = to_index(row, col, state.width);
                        if (!state.tiles[idx]) {
                            state.tiles[idx] = { id: `${row},${col}`, status: TileStatus.IDLE, slot: null };
                        }
                    });
                })
            ),

        clear_tile: (row, col) =>
            set(
                produce((state: SpaceState) => {
                    const idx = to_index(row, col, state.width);
                    if (state.tiles[idx]) {
                        state.tiles[idx] = null; // Clear the tile by setting it to null
                    }
                })
            ),

        hover_tile: (row: number, col: number) =>
            set(
                produce((state: SpaceState) => {
                    const idx = to_index(row, col, state.width);
                    if (state.hoveredTile !== idx) {
                        if (state.hoveredTile !== null) {
                            const prevTile = state.tiles[state.hoveredTile];
                            if (prevTile) {
                                // Only reset if not the selected tile
                                if (state.selectedTile !== state.hoveredTile) {
                                    state.tiles[state.hoveredTile] = { ...prevTile, status: TileStatus.IDLE };
                                }
                            }
                        }
                        const currentTile = state.tiles[idx];
                        if (currentTile) {
                            // Only set to HOVERED if not the selected tile
                            if (state.selectedTile !== idx) {
                                state.tiles[idx] = { ...currentTile, status: TileStatus.HOVERED };
                            }
                        }
                        state.hoveredTile = idx;
                    }
                })
            ),

        select_tile: (row: number, col: number) =>
            set(
                produce((state: SpaceState) => {
                    const idx = to_index(row, col, state.width);

                    // Deselect previously selected tile
                    if (state.selectedTile !== null && state.selectedTile !== idx) {
                        const prevSelectedTile = state.tiles[state.selectedTile];
                        if (prevSelectedTile) {
                            state.tiles[state.selectedTile] = { ...prevSelectedTile, status: TileStatus.IDLE };
                        }
                    }

                    // Update the selected tile
                    const tile = state.tiles[idx];
                    if (tile) {
                        state.tiles[idx] = { ...tile, status: TileStatus.SELECTED };
                        state.selectedTile = idx;
                    }
                })
            ),

        deselect_tile: (row: number, col: number) =>
            set(
                produce((state: SpaceState) => {
                    const idx = to_index(row, col, state.width);

                    if (state.selectedTile === idx) {
                        const tile = state.tiles[idx];
                        if (tile) {
                            state.tiles[idx] = { ...tile, status: TileStatus.IDLE };
                        }
                        state.selectedTile = null;
                    }
                })
            ),

        create_tile: (row: number, col: number) =>
            set(
                produce((state: SpaceState) => {
                    const idx = to_index(row, col, state.width);
                    if (state.tiles[idx] === null) {
                        state.tiles[idx] = { id: `${row},${col}`, status: TileStatus.IDLE, slot: null };
                    }
                })
            ),

        add_char_to_random_tile: (char: Char) =>
            set(
                produce((state: SpaceState) => {
                    const idx = to_index(char.row, char.col, state.width);
                    const tile = state.tiles[idx];

                    if (tile && tile.slot === null) {
                        state.tiles[idx] = { ...tile, slot: char };
                    } else {
                        // Find next available tile
                        for (let i = 0; i < state.tiles.length; i++) {
                            const t = state.tiles[i];
                            if (t && t.slot === null) {
                                state.tiles[i] = { ...t, slot: char };
                                char.row = Math.floor(i / state.width);
                                char.col = i % state.width;
                                break;
                            }
                        }
                    }
                })
            ),

        // src/stores/spaceStore.ts
        move_character: (char: Char, newRow: number, newCol: number) =>
            set(
                produce((state: SpaceState) => {
                    const oldIdx = to_index(char.row, char.col, state.width);
                    const newIdx = to_index(newRow, newCol, state.width);

                    // Remove char from old tile
                    const oldTile = state.tiles[oldIdx];
                    if (oldTile) {
                        state.tiles[oldIdx] = { ...oldTile, slot: null };
                    }

                    // Place char in new tile
                    const newTile = state.tiles[newIdx];
                    if (newTile) {
                        state.tiles[newIdx] = { ...newTile, slot: { ...char, row: newRow, col: newCol } };
                    } else {
                        state.tiles[newIdx] = {
                            id: `${newRow},${newCol}`,
                            status: TileStatus.IDLE,
                            slot: { ...char, row: newRow, col: newCol },
                        };
                    }

                    // Update char's position
                    char = { ...char, row: newRow, col: newCol }
                })
            ),


    }));
};
