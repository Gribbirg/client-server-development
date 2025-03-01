import Link from 'next/link';
import styles from './DialogItem.module.css';

export default function DialogItem({
    id,
    name
}) {
    return (
        <div className={styles.item}>
            <Link href={`/dialogs/${id}`} className={styles.link}>
                {name}
            </Link>
        </div>
    );
}
