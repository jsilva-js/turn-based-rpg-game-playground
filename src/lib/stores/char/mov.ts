import { Char } from ".";

// src/utils/movement.ts
type Position = { row: number; col: number };
type MoveNode = Position & { cost: number };

export function get_available_moves(char: Char, width: number, height: number): Position[] {
    const { row, col, move_points } = char;
    const visited = new Set<string>();
    const moves: Position[] = [];
    const queue: MoveNode[] = [{ row, col, cost: 0 }];

    while (queue.length > 0) {
        const { row: currentRow, col: currentCol, cost } = queue.shift()!;
        const key = `${currentRow},${currentCol}`;

        if (visited.has(key) || cost > move_points) continue;

        visited.add(key);

        if (cost > 0) {
            moves.push({ row: currentRow, col: currentCol });
        }

        const directions = [
            { dr: -1, dc: 0, moveCost: 1 },  // Up
            { dr: 1, dc: 0, moveCost: 1 },   // Down
            { dr: 0, dc: -1, moveCost: 1 },  // Left
            { dr: 0, dc: 1, moveCost: 1 },   // Right
            { dr: -1, dc: -1, moveCost: 2 }, // Up-Left (Diagonal)
            { dr: -1, dc: 1, moveCost: 2 },  // Up-Right
            { dr: 1, dc: -1, moveCost: 2 },  // Down-Left
            { dr: 1, dc: 1, moveCost: 2 },   // Down-Right
        ];

        for (const { dr, dc, moveCost } of directions) {
            const newRow = currentRow + dr;
            const newCol = currentCol + dc;
            const newKey = `${newRow},${newCol}`;
            const newCost = cost + moveCost;

            if (
                newRow >= 0 &&
                newRow < height &&
                newCol >= 0 &&
                newCol < width &&
                !visited.has(newKey) &&
                newCost <= move_points
            ) {
                queue.push({ row: newRow, col: newCol, cost: newCost });
            }
        }
    }

    return moves;
}
