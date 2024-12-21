export const jwtConstants = {
    secret: process.env.JWT_SECRET || 'your_default_secret',  // Change this to a strong secret key in production
    expiresIn: '60m',             // Adjust token expiration as needed
};