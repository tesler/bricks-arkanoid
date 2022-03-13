import { BrickStrength, Level } from './types';

export const PADDLE_HEIGHT = 20;
export const PADDLE_SPEED = 10;

export const LEVEL_PADDING = 10;
export const LEVEL_ROWS = 20;
export const LEVEL_COLS = 10;

export const BRICK_PADDING = 5;

export const BRICK_COLOR: Record<BrickStrength, string> = {
    0: '',
    1: '#dc143c',
    2: '#b22222',
    3: '#8b0000',
};

export const EXAMPLE_LEVEL: Level = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 3, 3, 3, 3, 3, 3, 3, 3, 0],
    [0, 0, 2, 2, 2, 2, 2, 2, 0, 0],
    [0, 0, 3, 3, 0, 0, 3, 3, 0, 0],
];
