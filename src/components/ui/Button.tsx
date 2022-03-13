import { JSX } from 'solid-js';

import styles from './styles.module.scss';

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
}

export const Button = (props: ButtonProps) => {
    return (
        <button class={styles.button} onClick={props.onClick}>
            {props.label}
        </button>
    );
};
