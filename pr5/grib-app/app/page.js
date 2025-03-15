import AgreementForm from '../components/AgreementForm';

export default function Home() {
    return (
        <main className="min-h-screen p-8">
            <h1 className="text-2xl font-bold mb-8 text-center">
                Форма принятия соглашения
            </h1>
            <AgreementForm />
        </main>
    );
}
