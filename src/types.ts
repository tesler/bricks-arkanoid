export type Coordinates = {
    x: number;
    y: number;
};

export type BrickStrength = 0 | 1 | 2 | 3;

export type LevelRow = BrickStrength[];

export type Level = LevelRow[];

export const enum EntityType {
    Circle,
    Rectangle,
}

export interface GameSettings {
    ballRadius: number;
    ballSpeed: number;
    paddleWidth: number;
}
