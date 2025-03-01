import styles from './Logo.module.css';

export default function Logo() {
    return (
        <img
            src="/logo.png"
            alt="Логотип"
            className={styles.logo}
        />
    );
}
