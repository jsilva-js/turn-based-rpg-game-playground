// src/utils/pathfinding.ts
export type Position = { row: number; col: number };

export function getPerpendicularPath(
    start: Position,
    end: Position,
    preferHorizontal: boolean
): { path: Position[]; cost: number } {
    const path: Position[] = [];
    let cost = 0;

    const rowStep = start.row <= end.row ? 1 : -1;
    const colStep = start.col <= end.col ? 1 : -1;

    let currentRow = start.row;
    let currentCol = start.col;

    if (preferHorizontal) {
        // Move horizontally first
        while (currentCol !== end.col) {
            currentCol += colStep;
            path.push({ row: currentRow, col: currentCol });
            cost += 1; // Perpendicular move costs 1
        }
        // Then move vertically
        while (currentRow !== end.row) {
            currentRow += rowStep;
            path.push({ row: currentRow, col: currentCol });
            cost += 1;
        }
    } else {
        // Move vertically first
        while (currentRow !== end.row) {
            currentRow += rowStep;
            path.push({ row: currentRow, col: currentCol });
            cost += 1;
        }
        // Then move horizontally
        while (currentCol !== end.col) {
            currentCol += colStep;
            path.push({ row: currentRow, col: currentCol });
            cost += 1;
        }
    }

    return { path, cost };
}


// src/utils/pathfinding.ts
// src/utils/pathfinding.ts
export function getPathFromMouseMovement(
    start: Position,
    mousePath: Position[],
    movePoints: number
): Position[] {
    const path: Position[] = [];
    const visited = new Set<string>();
    let totalCost = 0;

    let previousPosition = start;

    for (const currentPosition of mousePath) {
        const deltaRow = currentPosition.row - previousPosition.row;
        const deltaCol = currentPosition.col - previousPosition.col;
        const preferHorizontal = Math.abs(deltaCol) >= Math.abs(deltaRow);

        const { path: segment } = getPerpendicularPath(
            previousPosition,
            currentPosition,
            preferHorizontal
        );

        for (const pos of segment) {
            const key = `${pos.row},${pos.col}`;
            if (!visited.has(key)) {
                // Tile not visited before, increment cost
                totalCost += 1;
                if (totalCost > movePoints) {
                    // Movement limit reached, stop adding to the path
                    return path;
                }
                visited.add(key);
            }
            path.push(pos);
        }

        previousPosition = currentPosition;
    }

    // Remove duplicates in the path (if necessary)
    const uniquePath = path.filter(
        (pos, index, self) =>
            index === self.findIndex((p) => p.row === pos.row && p.col === pos.col)
    );

    return uniquePath;
}
