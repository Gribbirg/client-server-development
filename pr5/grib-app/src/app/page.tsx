'use client';

import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import AgreementForm from '@/components/AgreementForm';
import AuthForm from '@/components/AuthForm';
import RegisterForm from '@/components/RegisterForm';

export default function Home() {
  const { submitted } = useSelector((state: RootState) => state.agreement);
  const { authMode } = useSelector((state: RootState) => state.auth);

  const renderAuthComponent = () => {
    if (authMode === 'register') {
      return <RegisterForm />;
    } else {
      return <AuthForm />;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black">
      {!submitted ? <AgreementForm /> : renderAuthComponent()}
    </main>
  );
}
