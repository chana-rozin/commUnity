export const CONFIG = {
    USER_SESSION_EXPIRATION: parseInt(process.env.USER_SESSION_EXPIRATION || '604800000', 10), // Default 1 week in milliseconds
};