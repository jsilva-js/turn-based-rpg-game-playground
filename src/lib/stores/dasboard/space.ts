import { create } from 'zustand';
import { produce } from 'immer';
import { Tile } from './tile';
import { to_index } from '@/lib/utils/grid';


const x_length = 24;
const y_length = 24;

export type SpaceState = {
    width: number;
    height: number;
    tiles: (Tile | null)[]; // Array of tiles or nulls
};

export type SpaceActions = {
    set_tile: (row: number, col: number) => void;
    set_tiles: (positions: { row: number; col: number }[]) => void;
    clear_tile: (row: number, col: number) => void;
};

export type SpaceStore = SpaceState & SpaceActions

export const defaultInitial: SpaceState = {
    width: x_length,
    height: y_length,
    tiles: Array.from({ length: x_length * y_length }, () => null),
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
                        state.tiles[idx] = new Tile(`${row},${col}`);
                    }
                })
            ),

        // Set multiple tiles
        set_tiles: (positions) =>
            set(
                produce((state: SpaceState) => {
                    positions.forEach(({ row, col }) => {
                        const idx = to_index(row, col, state.width);
                        if (!state.tiles[idx]) {
                            state.tiles[idx] = new Tile(`${row},${col}`);
                        }
                    });
                })
            ),

        // Clear a tile
        clear_tile: (row, col) =>
            set(
                produce((state: SpaceState) => {
                    const idx = to_index(row, col, state.width);
                    if (state.tiles[idx]) {
                        state.tiles[idx]?.clear_tile();
                    }
                })
            ),
    }));
};