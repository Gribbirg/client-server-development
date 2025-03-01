import {useRouter} from 'next/router';
import products from '../../data/products';

export default function ProductPage() {
    const router = useRouter();
    const {id} = router.query;
    const product = products.find(p => p.id === parseInt(id));

    if (!product) return <div>Товар не найден</div>;

    return (
        <div>
            <h1>{product.name}</h1>
            <img src={product.image} alt={product.name} />
            <p>Описание: {product.description}</p>
            <p>Цена: {product.price} руб.</p>
        </div>
    );
}
