export const to_index = (row: number, col: number, width: number): number => row * width + col;
export const to_row_col = (index: number, width: number): [number, number] => (
    [Math.floor(index / width), index % width]
);