export type Position = { row: number; col: number };

export function getPerpendicularPath(start: Position, end: Position): Position[] {
    const path: Position[] = [];

    const rowStep = start.row <= end.row ? 1 : -1;
    const colStep = start.col <= end.col ? 1 : -1;

    let currentRow = start.row;
    let currentCol = start.col;

    // Optionally, choose to move horizontally first
    // while (currentCol !== end.col) {
    //   currentCol += colStep;
    //   path.push({ row: currentRow, col: currentCol });
    // }

    // Move vertically
    while (currentRow !== end.row) {
        currentRow += rowStep;
        path.push({ row: currentRow, col: currentCol });
    }

    // Move horizontally
    while (currentCol !== end.col) {
        currentCol += colStep;
        path.push({ row: currentRow, col: currentCol });
    }

    return path;
}