import {withAuth} from 'next-auth/middleware';

export default withAuth({
    callbacks: {
        authorized: ({token}) => {
            // Проверка ролей пользователя
            return token?.roles?.includes('admin') ?? false;
        },
    },
});

export const config = {
    matcher: ['/dashboard', '/admin/:path*']
};
