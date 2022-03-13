import { BRICK_PADDING, LEVEL_COLS, LEVEL_PADDING } from '../constants';
import { Brick } from '../entities/Brick';
import { LevelRow, Level } from '../types';

const createBricksRow = (
    row: LevelRow,
    rowIndex: number,
    brickWidth: number,
    brickHeight: number,
): Brick[] => {
    const bricksrow: Brick[] = [];

    row.forEach((brickStrength, col) => {
        const x = LEVEL_PADDING + col * (brickWidth + BRICK_PADDING);
        const y = LEVEL_PADDING + rowIndex * (brickHeight + BRICK_PADDING);

        if (brickStrength !== 0) {
            bricksrow.push(
                new Brick(brickWidth, brickHeight, { x, y }, brickStrength),
            );
        }
    });

    return bricksrow;
};

export const createBricks = (
    level: Level,
    brickWidth: number,
    brickHeight: number,
): Brick[] => {
    const bricks: Brick[] = [];

    level.forEach((row, rowIndex) => {
        bricks.push(...createBricksRow(row, rowIndex, brickWidth, brickHeight));
    });

    return bricks;
};

export const generateLevel = (): Level => {
    return [...Array(6)].map(() =>
        [...Array(LEVEL_COLS)].map(() => {
            const randomNumber = Math.random();

            if (randomNumber < 0.5) {
                return 0;
            }

            if (randomNumber < 0.6) {
                return 1;
            }

            if (randomNumber < 0.8) {
                return 2;
            }

            return 3;
        }),
    );
};
