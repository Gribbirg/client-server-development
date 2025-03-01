import Link from 'next/link';
import styles from './Navigation.module.css';

export default function Navigation() {
    return (
        <nav className={styles.nav}>
            <Link href="/" className={styles.link}>
                Главная
            </Link>
            <Link href="/about" className={styles.link}>
                О нас
            </Link>
        </nav>
    );
}
