import {OAuthConfig} from 'next-auth/providers';
import {generateCodeVerifier, calculateCodeChallenge} from '@/lib/pkce-utils';

export const PKCEProvider = (options: {
    clientId: string;
    clientSecret?: string;
    issuer: string;
}): OAuthConfig<any> => ({
    id: 'pkce',
    name: 'PKCE',
    type: 'oauth',
    authorization: {
        url: `${options.issuer}/authorize`,
        params: {
            scope: 'openid profile email',
            response_type: 'code',
            code_challenge_method: 'S256',
        },
    },
    token: {
        url: `${options.issuer}/token`,
    },
    async profile(profile) {
        return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            roles: profile.roles || ['user'],
        };
    },
    async authorize({request}) {
        const codeVerifier = generateCodeVerifier();
        const codeChallenge = await calculateCodeChallenge(codeVerifier);

        return {
            redirect: `${options.issuer}/authorize?${new URLSearchParams({
                client_id: options.clientId,
                code_challenge: codeChallenge,
                code_challenge_method: 'S256',
                response_type: 'code',
                scope: 'openid profile email',
            })}`,
            codeVerifier,
        };
    },
});
