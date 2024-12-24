export function getCookieOptions(isProduction: boolean) {
    return {
        httpOnly: true,
        secure: isProduction, // Only set secure flag in production
        sameSite: isProduction ? 'None' : 'Lax', // None requires secure flag
        maxAge: 3600000, // Example: 1 hour
        path: '/'
    };
}
