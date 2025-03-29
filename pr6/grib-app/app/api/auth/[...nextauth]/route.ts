import NextAuth from 'next-auth';
import {PKCEProvider} from '@/lib/pkce';

export const {
    handlers: {GET, POST},
    auth
} = NextAuth({
    providers: [
        PKCEProvider({
            clientId: process.env.AUTH_CLIENT_ID!,
            clientSecret: process.env.AUTH_CLIENT_SECRET!,
            issuer: process.env.AUTH_ISSUER!,
        })
    ],
    session: {strategy: 'jwt'},
    secret: process.env.NEXTAUTH_SECRET!,
});
