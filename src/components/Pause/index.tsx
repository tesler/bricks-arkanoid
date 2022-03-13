import { Button } from '../ui/Button';
import styles from './styles.module.scss';

interface PauseProps {
    onReStartClick: VoidFunction;
    onContinueClick: VoidFunction;
}

export const Pause = (props: PauseProps) => {
    return (
        <div class={styles.background}>
            <div class={styles.block}>
                <h1>Paused</h1>
                <Button label="Restart" onClick={props.onReStartClick} />
                <Button label="Continue" onClick={props.onContinueClick} />
            </div>
        </div>
    );
};
