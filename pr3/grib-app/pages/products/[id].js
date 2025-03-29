import { useRouter } from 'next/router';
import ProductDetails from '../../components/ProductDetails/ProductDetails';
import products from '../../data/products';

export default function ProductPage({ product }) {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Загрузка...</div>;
    }

    return <ProductDetails product={product} />;
}

export async function getStaticPaths() {
    return {
        paths: products.map(product => ({
            params: { id: product.id.toString() }
        })),
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const product = products.find(p => p.id === parseInt(params.id));

    if (!product) {
        return { notFound: true };
    }

    return {
        props: { product }
    };
}