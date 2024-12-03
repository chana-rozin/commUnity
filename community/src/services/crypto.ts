import crypto from 'crypto';

export function hashVerificationCode(code: string): string {
    const hash = crypto.createHash('sha256');  // You can choose other algorithms like 'sha512', etc.
    hash.update(code);  // Update the hash with the verification code
    return hash.digest('hex');  // Return the hash as a hexadecimal string
}