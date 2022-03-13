import { Button } from '../ui/Button';
import styles from './styles.module.scss';

interface MenuProps {
    isWin: boolean;
    score: number;
    onReStartClick: VoidFunction;
}

export const GameOver = (props: MenuProps) => {
    return (
        <div
            class={styles.background}
            classList={{ [styles.win]: props.isWin }}
        >
            <div class={styles.block} classList={{ [styles.win]: props.isWin }}>
                <h1>{props.isWin ? 'Winner!' : 'Looser!'}</h1>
                <Button label="Restart" onClick={props.onReStartClick} />
            </div>
        </div>
    );
};
