import Link from 'next/link';
import styles from './Layout.module.css';

export default function Layout({children}) {
    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <Link href="/" className={styles.navLink}>Главная</Link>
                <Link href="/dialogs" className={styles.navLink}>Диалоги</Link>
            </nav>
            <main className={styles.main}>{children}</main>
        </div>
    );
}
