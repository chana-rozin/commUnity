import http from './http';

export const logout = async () => {
    try {
        await http('/logout', {
            method: 'POST',
        });
        return true;
} catch (error) {
    console.error("An error occurred during logout:", error);
    return false;
}
};
