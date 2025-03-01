import ProductCard from '../components/ProductCard/ProductCard';
import products from '../data/products';

export default function Home() {
    return (
        <div>
            <h1>Наши товары</h1>
            <div className="products-grid">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
