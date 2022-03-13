import { Circle } from '../entities/Circle';
import { Rectangle } from '../entities/Rectangle';

export const isCollided = (circle: Circle, rectangle: Rectangle): boolean => {
    const {
        position: { x: circleX, y: circleY },
        radius: circleRadius,
    } = circle;

    const {
        position: { x: rectangleX, y: rectangleY },
        width: rectangleWidth,
        height: rectangleHeight,
    } = rectangle;

    const closestX = Math.max(
        rectangleX,
        Math.min(rectangleX + rectangleWidth, circleX),
    );

    const closestY = Math.max(
        rectangleY,
        Math.min(rectangleY + rectangleHeight, circleY),
    );

    const distanceX = circleX - closestX;
    const distanceY = circleY - closestY;

    const distanceSquared = distanceX * distanceX + distanceY * distanceY;

    return distanceSquared < circleRadius ** 2;
};
