import { JSX } from 'solid-js';

import styles from './styles.module.scss';

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
}

export const Input = (props: InputProps) => {
    return (
        <label class={styles.inputBlock}>
            <span class={styles.inputLabel}>{props.label}</span>
            <input
                type="text"
                class={styles.input}
                value={props.value}
                onChange={props.onChange}
            />
        </label>
    );
};
