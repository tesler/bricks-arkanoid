import styles from './styles.module.scss';

interface InputProps {
    name: string;
    label: string;
    onChange: (event: any) => void;
    value: any;
}

export const Input = (props: InputProps) => {
    return (
        <label class={styles.inputBlock}>
            <span class={styles.inputLabel}>{props.label}</span>
            <input
                type="text"
                name={props.name}
                class={styles.input}
                onChange={props.onChange}
                value={props.value}
            />
        </label>
    );
};
