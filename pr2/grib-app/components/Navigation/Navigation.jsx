import Link from 'next/link';
import styles from './Navigation.module.css';

export default function Navigation() {
    return (
        <nav className={styles.nav}>
            <ul>
                <li><Link href="/">Главная</Link></li>
                <li><Link href="/categories">Категории</Link></li>
                <li><Link href="/cart">Корзина</Link></li>
                <li><Link href="/login">Вход</Link></li>
            </ul>
        </nav>
    );
}
