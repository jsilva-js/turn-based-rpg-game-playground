import { Char } from ".";

// src/utils/movement.ts
type Position = { row: number; col: number };
type MoveNode = Position & { cost: number; path: Position[] };

export function get_available_moves(
    char: Char,
    width: number,
    height: number
): Map<string, MoveNode> {
    const { row, col, move_points } = char;
    const visited = new Map<string, MoveNode>();
    const queue: MoveNode[] = [{ row, col, cost: 0, path: [] }];

    while (queue.length > 0) {
        const current = queue.shift()!;
        const key = `${current.row},${current.col}`;

        if (visited.has(key)) {
            const existingNode = visited.get(key)!;
            if (current.cost >= existingNode.cost) {
                continue;
            }
        }

        visited.set(key, current);

        if (current.cost > move_points) continue;

        const directions = [
            { dr: -1, dc: 0, moveCost: 1 }, // Up
            { dr: 1, dc: 0, moveCost: 1 }, // Down
            { dr: 0, dc: -1, moveCost: 1 }, // Left
            { dr: 0, dc: 1, moveCost: 1 }, // Right
            { dr: -1, dc: -1, moveCost: 2 }, // Up-Left
            { dr: -1, dc: 1, moveCost: 2 }, // Up-Right
            { dr: 1, dc: -1, moveCost: 2 }, // Down-Left
            { dr: 1, dc: 1, moveCost: 2 }, // Down-Right
        ];

        for (const { dr, dc, moveCost } of directions) {
            const newRow = current.row + dr;
            const newCol = current.col + dc;
            const newCost = current.cost + moveCost;
            const newKey = `${newRow},${newCol}`;

            if (
                newRow >= 0 &&
                newRow < height &&
                newCol >= 0 &&
                newCol < width &&
                newCost <= move_points
            ) {
                const newPath = [...current.path, { row: newRow, col: newCol }];
                const newNode: MoveNode = {
                    row: newRow,
                    col: newCol,
                    cost: newCost,
                    path: newPath,
                };
                queue.push(newNode);
            }
        }
    }

    // Remove the starting position
    visited.delete(`${row},${col}`);

    return visited;
}
