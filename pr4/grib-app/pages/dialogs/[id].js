import {useRouter} from 'next/router';
import Layout from '../../components/Layout/Layout';
import {dialogs} from '../../data/dialogs';

export default function DialogPage() {
    const router = useRouter();
    const {id} = router.query;
    const dialog = dialogs.find(d => d.id === Number(id));

    if (!dialog) return <div>Диалог не найден</div>;

    return (
        <Layout>
            <h1>Диалог с {dialog.name}</h1>
            <div className="messages">
                {dialog.messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.isUser ? 'user' : 'companion'}`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export async function getStaticPaths() {
    const paths = dialogs.map(dialog => ({
        params: {id: dialog.id.toString()}
    }));

    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({params}) {
    return {props: {}};
}
