import styles from './styles.module.scss';

interface MenuProps {
    onPauseClick: VoidFunction;
}

export const Control = (props: MenuProps) => {
    return (
        <button class={styles.pause} onClick={props.onPauseClick}>
            | |
        </button>
    );
};
