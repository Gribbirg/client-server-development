import styles from './Categories.module.css';
import Category from './Category';

export default function Categories() {
    return (
        <section className={styles.categories}>
            <h2>Категории товаров</h2>
            <ul className={styles.categoryList}>
                <Category name="Электроника" />
                <Category name="Одежда" />
                <Category name="Обувь" />
                <Category name="Аксессуары" />
            </ul>
        </section>
    );
}
