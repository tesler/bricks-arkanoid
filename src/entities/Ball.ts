import { Coordinates } from '../types';
import { Circle } from './Circle';

export class Ball extends Circle {
    private speed: Coordinates;

    constructor(
        speed: number,
        private _radius: number,
        private _position: Coordinates,
        private _color: string,
    ) {
        super();

        this.speed = {
            x: speed,
            y: -speed,
        };
    }

    get radius(): number {
        return this._radius;
    }

    get position(): Coordinates {
        return this._position;
    }

    get color(): string {
        return this._color;
    }

    changeYDirection(): void {
        this.speed.y = -this.speed.y;
    }

    changeXDirection(): void {
        this.speed.x = -this.speed.x;
    }

    moveBall(delta: number): void {
        this._position.x += this.speed.x * delta;
        this._position.y += this.speed.y * delta;
    }
}
