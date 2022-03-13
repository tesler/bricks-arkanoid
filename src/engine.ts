import { GameView } from './views/GameView';
import { Ball } from './entities/Ball';
import { Brick } from './entities/Brick';
import { Paddle } from './entities/Paddle';
import { isCollided } from './libs/collision';
import {
    PADDLE_HEIGHT,
    PADDLE_SPEED,
    LEVEL_COLS,
    LEVEL_PADDING,
    LEVEL_ROWS,
    BRICK_PADDING,
} from './constants';
import { createBricks } from './libs/helpers';
import { GameSettings, Level } from './types';

const gameLoop = (
    view: GameView,
    bricks: Brick[],
    paddle: Paddle,
    ball: Ball,
    gameOver: (isWid: boolean) => void,
) => {
    view.clearEntity(ball);
    ball.moveBall(1);

    for (const brick of bricks) {
        if (brick.strength === 0) {
            continue;
        }

        if (!isCollided(ball, brick)) {
            continue;
        }

        brick.strength -= 1;
        view.clearEntity(brick);

        ball.changeYDirection();

        if (brick.strength) {
            view.drawEntity(brick);
        }
    }

    const {
        position: { x: ballX, y: ballY },
        radius: ballRadius,
    } = ball;

    if (isCollided(ball, paddle)) {
        ball.changeYDirection();
    }

    if (ballX > view.canvas.width - ballRadius * 2 || ballX < 0) {
        ball.changeXDirection();
    }

    if (ballY < 0) {
        ball.changeYDirection();
    }

    if (
        (paddle.isMovingLeft && paddle.position.x > 0) ||
        (paddle.isMovingRight &&
            paddle.position.x < view.canvas.width - paddle.width)
    ) {
        view.clearEntity(paddle);
        paddle.movePaddle(1);
    }

    view.drawEntity(ball);
    view.drawEntity(paddle);

    if (ball.position.y > view.canvas.height) {
        gameOver(false);
        return;
    }

    if (bricks.length === 0) {
        gameOver(true);
        return;
    }

    requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball, gameOver));
};

export const initGame = (
    view: GameView,
    level: Level,
    settings: GameSettings,
) => {
    view.clear();

    const brickWidth =
        Math.floor((view.canvas.width - LEVEL_PADDING * 2) / LEVEL_COLS) -
        BRICK_PADDING;
    const brickHeight =
        Math.floor((view.canvas.height - LEVEL_PADDING * 2) / LEVEL_ROWS) -
        BRICK_PADDING;

    const ballStartX = Math.floor(view.canvas.width / 2);

    const paddleStartX = ballStartX - Math.floor(settings.paddleWidth / 2);

    const bricks = createBricks(level, brickWidth, brickHeight);

    const ball = new Ball(
        settings.ballSpeed,
        settings.ballRadius,
        {
            x: ballStartX,
            y: view.canvas.height - PADDLE_HEIGHT - 5 - settings.ballRadius,
        },
        'black',
    );

    const paddle = new Paddle(
        PADDLE_SPEED,
        settings.paddleWidth,
        PADDLE_HEIGHT,
        {
            x: paddleStartX,
            y: view.canvas.height - PADDLE_HEIGHT - 5,
        },
        'black',
    );

    view.drawEntities(bricks);
    view.drawEntity(paddle);
    view.drawEntity(ball);

    return {
        bricks,
        paddle,
        ball,
    };
};

export const startGame = (
    view: GameView,
    level: Level,
    settings: GameSettings,
    gameOver: (isWin: boolean) => void,
) => {
    const { bricks, paddle, ball } = initGame(view, level, settings);
    gameLoop(view, bricks, paddle, ball, gameOver);
};
