import { Coordinates, EntityType } from '../types';

export abstract class Circle {
    type = EntityType.Circle;

    abstract get position(): Coordinates;
    abstract get radius(): number;
    abstract get color(): string;
}
