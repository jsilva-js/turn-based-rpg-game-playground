import { create } from 'zustand';
import { produce } from 'immer';
import { Tile, TileStatus } from './tile';
import { to_index } from '@/lib/utils/grid';


const x_length = 24;
const y_length = 24;

export type SpaceState = {
    width: number;
    height: number;
    tiles: (Tile | null)[];
    hoveredTile: number | null;
};

export type SpaceActions = {
    set_tile: (row: number, col: number) => void;
    set_tiles: (positions: { row: number; col: number }[]) => void;
    clear_tile: (row: number, col: number) => void;
    hover_tile: (row: number, col: number) => void;
    select_tile: (row: number, col: number) => void;
    deselect_tile: (row: number, col: number) => void;
    create_tile: (row: number, col: number) => void;

};

export type SpaceStore = SpaceState & SpaceActions

export const defaultInitial: SpaceState = {
    width: x_length,
    height: y_length,
    tiles: Array.from({ length: x_length * y_length }, () => null),
    hoveredTile: null
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

        clear_tile: (row, col) =>
            set(
                produce((state: SpaceState) => {
                    const idx = to_index(row, col, state.width);
                    if (state.tiles[idx]) {
                        state.tiles[idx]?.clear_tile();
                    }
                })
            ),
        hover_tile: (row: number, col: number) =>
            set(
                produce((state: SpaceState) => {
                    const idx = to_index(row, col, state.width);
                    if (state.hoveredTile !== idx) {
                        if (state.hoveredTile !== null) {
                            state.tiles[state.hoveredTile]?.change_tile_status(TileStatus.IDLE);
                        }
                        state.tiles[idx]?.change_tile_status(TileStatus.HOVERED);
                        state.hoveredTile = idx;
                    }
                })
            ),
        select_tile: (row: number, col: number) =>
            set(
                produce((state: SpaceState) => {
                    const idx = to_index(row, col, state.width);
                    state.tiles[idx]?.change_tile_status(TileStatus.SELECTED);
                })
            ),

        deselect_tile: (row: number, col: number) =>
            set(
                produce((state: SpaceState) => {
                    const idx = to_index(row, col, state.width);
                    state.tiles[idx]?.change_tile_status(TileStatus.IDLE);
                })
            ),
        create_tile: (row: number, col: number) =>
            set(
                produce((state: SpaceState) => {
                    const idx = to_index(row, col, state.width);
                    if (state.tiles[idx] === null) {
                        state.tiles[idx] = new Tile(`${row},${col}`);
                    }
                })
            ),
    }));
};