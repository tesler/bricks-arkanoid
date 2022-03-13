import { Coordinates, EntityType } from '../types';

export abstract class Rectangle {
    type = EntityType.Rectangle;

    abstract get position(): Coordinates;
    abstract get width(): number;
    abstract get height(): number;
    abstract get color(): string;
}
