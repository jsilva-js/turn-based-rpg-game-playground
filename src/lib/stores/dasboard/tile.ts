import { to_index } from "@/lib/utils/grid";
import { Char } from "../char";

export enum TileState {
    HOVERED,
    SELECTED,
    HILIGHTED,
    IDLE
}

export class Tile {
    id: string = '';
    state: TileState = TileState.IDLE;
    has: Char | null = null;

    constructor(id: string) {
        this.id = id
        return this
    }

    change_tile_state(state: TileState) {
        this.state = state
        return this
    }

    clear_tile() {
        this.state = TILE.state
        this.has = TILE.has
        return this
    }

    set_char(char: Char) {
        this.has = char;
        return this
    }

    get_idx_linear(width: number): number {
        const [row, col] = this.id.split(',').map(Number)
        return to_index(row, col, width)
    }
    get_row_col(): [number, number] {
        return this.id.split(',').map(Number) as [number, number]
    }
};

export const TILE = {
    state: TileState.IDLE,
    has: null
}