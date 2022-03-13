import { Circle } from './entities/Circle';
import { Rectangle } from './entities/Rectangle';
import { EntityType } from './types';

export class GameView {
    private context: CanvasRenderingContext2D | null;

    constructor(public canvas: HTMLCanvasElement) {
        this.context = this.canvas.getContext('2d');
    }

    clear(): void {
        this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    clearEntity(entity: Circle | Rectangle): void {
        if (!this.context) {
            return;
        }

        if (entity.type === EntityType.Circle && entity instanceof Circle) {
            this.context?.clearRect(
                entity.position.x - entity.radius,
                entity.position.y - entity.radius,
                entity.radius * 2,
                entity.radius * 2,
            );
        }

        if (entity instanceof Rectangle) {
            this.context?.clearRect(
                entity.position.x,
                entity.position.y,
                entity.width,
                entity.height,
            );
        }
    }

    drawEntity(entity: Circle | Rectangle): Path2D | undefined {
        if (!this.context) {
            return;
        }

        const path2d = new Path2D();

        if (entity.type === EntityType.Circle && entity instanceof Circle) {
            path2d.arc(
                entity.position.x,
                entity.position.y,
                entity.radius,
                0,
                2 * Math.PI,
            );

            this.context.fill(path2d);
            return path2d;
        }

        if (entity instanceof Rectangle) {
            path2d.rect(
                entity.position.x,
                entity.position.y,
                entity.width,
                entity.height,
            );

            this.context.fillStyle = entity.color;
            this.context.fill(path2d);

            return path2d;
        }
    }

    drawEntities(entities: (Circle | Rectangle)[]): void {
        entities.forEach((entity) => this.drawEntity(entity));
    }
}
