import { createEffect, createSignal, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';

import { GameView } from '../GameView';
import { GameEngine } from '../GameEngine';
import { Menu } from './Menu';
import { GameSettings } from '../types';
import { GameOver } from './GameOver';
import { EXAMPLE_LEVEL } from '../constants';
import { generateLevel } from '../libs/helpers';
import { Control } from './Control';
import { Pause } from './Pause';

export const Game = () => {
    let canvas: HTMLCanvasElement | undefined;
    let gameView: GameView;
    let gameEngine: GameEngine;

    const [isMenuShowing, setIsMenuShowing] = createSignal(true);
    const [isGameOver, setIsGameOver] = createSignal(false);
    const [isPaused, setIsPaused] = createSignal(false);
    const [isWin, setIsWin] = createSignal(false);
    const [level, setLevel] = createSignal(EXAMPLE_LEVEL);

    const [state, setState] = createStore<GameSettings>({
        ballRadius: 10,
        ballSpeed: 5,
        paddleWidth: 150,
    });

    const gameOver = (isWin: boolean) => {
        setIsGameOver(true);
        setIsWin(isWin);
        gameEngine.pause();
    };

    const restartGame = () => {
        gameEngine.refreshGame(level(), {
            ballRadius: state.ballRadius,
            ballSpeed: state.ballSpeed,
            paddleWidth: state.paddleWidth,
        });
    };

    const handleReStartButtonClick = () => {
        setIsPaused(false);
        setIsGameOver(false);
        setIsWin(false);
        setIsMenuShowing(true);
        setLevel(EXAMPLE_LEVEL);
        restartGame();
    };

    const handlePauseButtonClick = () => {
        setIsPaused(true);
        gameEngine.pause();
    };

    const handleContinueButtonClick = () => {
        setIsPaused(false);
        gameEngine.run();
    };

    const handleStartButtonClick = () => {
        setIsMenuShowing(false);
        gameEngine.run();
    };

    const handleGenerateLevelButtonClick = () => {
        setLevel(generateLevel());
    };

    onMount(() => {
        if (!canvas) {
            console.log("Couldn't find canvas!");
            return;
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gameView = new GameView(canvas);
        gameEngine = new GameEngine(
            gameView,
            level(),
            {
                ballRadius: state.ballRadius,
                ballSpeed: state.ballSpeed,
                paddleWidth: state.paddleWidth,
            },
            gameOver,
        );

        createEffect(() => restartGame());
    });

    return (
        <>
            {isPaused() ? (
                <Pause
                    onContinueClick={handleContinueButtonClick}
                    onReStartClick={handleReStartButtonClick}
                />
            ) : isGameOver() ? (
                <GameOver
                    isWin={isWin()}
                    onReStartClick={handleReStartButtonClick}
                />
            ) : isMenuShowing() ? (
                <Menu
                    state={state}
                    setState={setState}
                    onStartClick={handleStartButtonClick}
                    onGenerateLevelClick={handleGenerateLevelButtonClick}
                />
            ) : (
                <Control onPauseClick={handlePauseButtonClick} />
            )}
            <canvas ref={canvas} class="canvas" />
        </>
    );
};
