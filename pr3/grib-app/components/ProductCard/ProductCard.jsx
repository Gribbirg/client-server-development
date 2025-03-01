import Image from 'next/image';
import Link from 'next/link';
import styles from './ProductCard.module.css';

export default function ProductCard({product}) {
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={300}
                    className={styles.image}
                />
            </div>
            <h3>{product.name}</h3>
            <p>Цена: {product.price} руб.</p>
            <Link
                href={`/products/${product.id}`}
                className={styles.button}
            >
                Подробнее
            </Link>
        </div>
    );
}
