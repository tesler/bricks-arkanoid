import { SetStoreFunction, Store } from 'solid-js/store';

import { GameSettings } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import styles from './styles.module.scss';

interface MenuProps {
    state: Store<GameSettings>;
    setState: SetStoreFunction<GameSettings>;
    onStartClick: VoidFunction;
    onGenerateLevelClick: VoidFunction;
}

export const Menu = (props: MenuProps) => {
    const getChangeHandler = (field: keyof GameSettings) => (event: any) => {
        props.setState(field, event.target.value);
    };

    return (
        <div class={styles.background}>
            <div class={styles.menu}>
                <Input
                    name="ballRadius"
                    label="Ball radius"
                    value={props.state.ballRadius}
                    onChange={getChangeHandler('ballRadius')}
                />
                <Input
                    name="ballSpeed"
                    label="Ball speed"
                    value={props.state.ballSpeed}
                    onChange={getChangeHandler('ballSpeed')}
                />
                <Input
                    name="paddleWidth"
                    label="Paddle width"
                    value={props.state.paddleWidth}
                    onChange={getChangeHandler('paddleWidth')}
                />
                <div class={styles.buttons}>
                    <Button
                        label="Generate level"
                        onClick={props.onGenerateLevelClick}
                    />
                    <Button label="Start" onClick={props.onStartClick} />
                </div>
            </div>
        </div>
    );
};
