'use client';
import {useSession} from 'next-auth/react';
import {redirect} from 'next/navigation';

export default function Dashboard() {
    const {data: session} = useSession();

    if (!session) redirect('/login');

    return (
        <div>
            <h1>Welcome {session.user?.name}</h1>
            <p>Your roles: {session.user?.roles?.join(', ')}</p>
        </div>
    );
}
