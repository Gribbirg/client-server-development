'use client';

import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import AgreementForm from '@/components/AgreementForm';
import AuthForm from '@/components/AuthForm';

export default function Home() {
  const { submitted } = useSelector((state: RootState) => state.agreement);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black">
      {!submitted ? <AgreementForm /> : <AuthForm />}
    </main>
  );
}
