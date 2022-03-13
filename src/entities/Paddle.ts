import { Coordinates } from '../types';
import { Rectangle } from './Rectangle';

export class Paddle extends Rectangle {
    private moveLeft = false;
    private moveRight = false;

    constructor(
        private _speed: number,
        private _width: number,
        private _height: number,
        private _position: Coordinates,
        private _color: string,
    ) {
        super();

        document.addEventListener('keydown', this.handleKeyDown, false);
        document.addEventListener('keyup', this.handleKeyUp, false);
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    get position(): Coordinates {
        return this._position;
    }

    get color(): string {
        return this._color;
    }

    get isMovingLeft(): boolean {
        return this.moveLeft;
    }

    get isMovingRight(): boolean {
        return this.moveRight;
    }

    movePaddle(delta: number): void {
        if (this.moveLeft) {
            this._position.x -= this._speed * delta;
        }

        if (this.moveRight) {
            this._position.x += this._speed * delta;
        }
    }

    handleKeyUp = (e: KeyboardEvent): void => {
        if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft') {
            this.moveLeft = false;
        }

        if (e.code === 'ArrowRight' || e.key === 'ArrowRight') {
            this.moveRight = false;
        }
    };

    handleKeyDown = (e: KeyboardEvent): void => {
        if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft') {
            this.moveLeft = true;
        }

        if (e.code === 'ArrowRight' || e.key === 'ArrowRight') {
            this.moveRight = true;
        }
    };
}
