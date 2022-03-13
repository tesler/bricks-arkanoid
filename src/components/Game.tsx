import { createEffect, createSignal, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';

import { GameView } from '../views/GameView';
import { initGame, startGame } from '../engine';
import { Menu } from './Menu';
import { GameSettings } from '../types';
import { GameOver } from './GameOver';
import { EXAMPLE_LEVEL } from '../constants';
import { generateLevel } from '../libs/helpers';

export const Game = () => {
    let canvas: HTMLCanvasElement | undefined;
    let gameView: GameView;

    const [showMenu, setShowMenu] = createSignal(true);
    const [isGameOver, setIsGameOver] = createSignal(false);
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
    };

    const handleReStartButtonClick = () => {
        setIsGameOver(false);
        setIsWin(false);
        setShowMenu(true);
        setLevel(EXAMPLE_LEVEL);
    };

    const handleStartButtonClick = () => {
        setShowMenu(false);

        startGame(gameView, level(), state, gameOver);
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

        createEffect(() =>
            initGame(gameView, level(), {
                ballRadius: state.ballRadius,
                ballSpeed: state.ballSpeed,
                paddleWidth: state.paddleWidth,
            }),
        );
    });

    return (
        <>
            {isGameOver() ? (
                <GameOver
                    isWin={isWin()}
                    score={1}
                    onReStartClick={handleReStartButtonClick}
                />
            ) : (
                showMenu() && (
                    <Menu
                        state={state}
                        setState={setState}
                        onStartClick={handleStartButtonClick}
                        onGenerateLevelClick={handleGenerateLevelButtonClick}
                    />
                )
            )}
            <canvas ref={canvas} class="canvas" />
        </>
    );
};
