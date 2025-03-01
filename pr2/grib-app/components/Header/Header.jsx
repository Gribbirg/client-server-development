import styles from './Header.module.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

export default function Header() {
    return (
        <header className={styles.header}>
            <Logo />
            <Navigation />
        </header>
    );
}
