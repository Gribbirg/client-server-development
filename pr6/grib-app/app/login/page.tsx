'use client';
import {signIn} from 'next-auth/react';

export default function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <button
                onClick={() => signIn('pkce')}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Login with PKCE
            </button>
        </div>
    );
}
