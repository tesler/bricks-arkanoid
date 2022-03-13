import styles from './styles.module.scss';

interface ButtonProps {
    label: string;
    onClick: VoidFunction;
}

export const Button = (props: ButtonProps) => {
    return (
        <button class={styles.button} onClick={props.onClick}>
            {props.label}
        </button>
    );
};
