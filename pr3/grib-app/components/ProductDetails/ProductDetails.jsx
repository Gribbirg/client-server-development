import styles from './ProductDetails.module.css';

export default function ProductDetails({product}) {
    if (!product) return <div>Товар не найден</div>;

    return (
        <div className={styles.container}>
            <div className={styles.productHeader}>
                <h1 className={styles.productTitle}>{product.name}</h1>
            </div>
            <img
                className={styles.productImage}
                src={product.image}
                alt={product.name}
            />
            <p className={styles.productDescription}>
                Описание: {product.description}
            </p>
            <p className={styles.productPrice}>
                Цена: {product.price} руб.
            </p>
        </div>
    );
}
