import Layout from '../components/Layout/Layout';
import DialogList from '../components/DialogList/DialogList';
import {dialogs} from '../data/dialogs';

export default function DialogsPage() {
    return (
        <Layout>
            <h1>Диалоги</h1>
            <DialogList dialogs={dialogs} />
        </Layout>
    );
}
