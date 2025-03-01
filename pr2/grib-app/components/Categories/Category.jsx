import styles from './Categories.module.css';

export default function Category({name}) {
    return (
        <li className={styles.categoryItem}>
            {name}
        </li>
    );
}
