import { BRICK_COLOR } from '../constants';
import { BrickStrength, Coordinates } from '../types';
import { Rectangle } from './Rectangle';

export class Brick extends Rectangle {
    isCollided = false;

    constructor(
        private _width: number,
        private _height: number,
        private _position: Coordinates,
        private _strength: BrickStrength,
    ) {
        super();
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
        return BRICK_COLOR[this._strength];
    }

    get strength(): BrickStrength {
        return this._strength;
    }

    set strength(strength: BrickStrength) {
        this._strength = strength;
    }
}
