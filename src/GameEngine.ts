import { GameView } from './GameView';
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

export type GameOver = (isWin: boolean) => void;

export class GameEngine {
    settings: GameSettings;
    gameOver: GameOver;
    ball!: Ball;
    bricks!: Brick[];
    paddle!: Paddle;

    requestId?: number;

    constructor(
        private view: GameView,
        level: Level,
        settings: GameSettings,
        gameOver: GameOver,
    ) {
        this.settings = settings;
        this.gameOver = gameOver;
        this.refreshGame(level, settings);
    }

    refreshGame(level: Level, settings: GameSettings) {
        this.settings = settings;
        this.view.clear();

        const brickWidth =
            Math.floor(
                (this.view.canvas.width - LEVEL_PADDING * 2) / LEVEL_COLS,
            ) - BRICK_PADDING;
        const brickHeight =
            Math.floor(
                (this.view.canvas.height - LEVEL_PADDING * 2) / LEVEL_ROWS,
            ) - BRICK_PADDING;

        const ballStartX = Math.floor(this.view.canvas.width / 2);

        const paddleStartX =
            ballStartX - Math.floor(this.settings.paddleWidth / 2);

        this.bricks = createBricks(level, brickWidth, brickHeight);

        this.ball = new Ball(
            this.settings.ballSpeed,
            this.settings.ballRadius,
            {
                x: ballStartX,
                y:
                    this.view.canvas.height -
                    PADDLE_HEIGHT -
                    5 -
                    this.settings.ballRadius,
            },
            'black',
        );

        this.paddle = new Paddle(
            PADDLE_SPEED,
            this.settings.paddleWidth,
            PADDLE_HEIGHT,
            {
                x: paddleStartX,
                y: this.view.canvas.height - PADDLE_HEIGHT - 5,
            },
            'black',
        );

        this.view.drawEntities(this.bricks);
        this.view.drawEntity(this.paddle);
        this.view.drawEntity(this.ball);
    }

    run() {
        this.gameLoop();
    }

    pause() {
        if (this.requestId == null) {
            return;
        }

        cancelAnimationFrame(this.requestId);
    }

    gameLoop() {
        this.requestId = requestAnimationFrame(() => this.gameLoop());

        this.view.clearEntity(this.ball);
        this.ball.moveBall(1);

        for (const brick of this.bricks) {
            if (brick.strength === 0) {
                continue;
            }

            if (!isCollided(this.ball, brick)) {
                continue;
            }

            brick.strength -= 1;
            this.view.clearEntity(brick);

            this.ball.changeYDirection();

            if (brick.strength) {
                this.view.drawEntity(brick);
            }
        }

        const {
            position: { x: ballX, y: ballY },
            radius: ballRadius,
        } = this.ball;

        if (isCollided(this.ball, this.paddle)) {
            this.ball.changeYDirection();
        }

        if (ballX > this.view.canvas.width - ballRadius * 2 || ballX < 0) {
            this.ball.changeXDirection();
        }

        if (ballY < 0) {
            this.ball.changeYDirection();
        }

        if (
            (this.paddle.isMovingLeft && this.paddle.position.x > 0) ||
            (this.paddle.isMovingRight &&
                this.paddle.position.x <
                    this.view.canvas.width - this.paddle.width)
        ) {
            this.view.clearEntity(this.paddle);
            this.paddle.movePaddle(1);
        }

        this.view.drawEntity(this.ball);
        this.view.drawEntity(this.paddle);

        if (this.ball.position.y > this.view.canvas.height) {
            this.gameOver(false);
            this.pause();
            return;
        }

        if (this.bricks.length === 0) {
            this.gameOver(true);
            this.pause();
            return;
        }
    }
}
