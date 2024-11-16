import { to_index } from "@/lib/utils/grid";
import { Char } from "../char";

export enum TileStatus {
    HOVERED,
    SELECTED,
    HIGHLIGHTED,
    IDLE,
}

export class Tile {
    id: string = "";
    status: TileStatus = TileStatus.IDLE;
    slot: Char | null = null;

    constructor(id: string) {
        this.id = id;
        return this;
    }

    change_tile_status(status: TileStatus) {
        this.status = status;
        return this;
    }

    clear_tile() {
        this.status = TILE.status;
        this.slot = TILE.slot;
        return this;
    }

    set_char(char: Char) {
        this.slot = char;
        return this;
    }

    get_idx_linear(width: number): number {
        const [row, col] = this.id.split(",").map(Number);
        return to_index(row, col, width);
    }

    get_row_col(): [number, number] {
        return this.id.split(",").map(Number) as [number, number];
    }
}

export const TILE = {
    status: TileStatus.IDLE,
    slot: null,
};
