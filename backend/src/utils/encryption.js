import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const algorithm = 'aes-256-cbc';
const secretKey = process.env.ENCRYPTION_SECRET; // should be 32 bytes (256 bits)
const ivLength = 16; // AES block size

if (!secretKey || secretKey.length !== 32) {
    throw new Error("ENCRYPTION_SECRET must be a 32-byte string. Check your .env file.");
}

export function encryptContent(content) {
    if (typeof content !== 'string' || content.trim() === '') {
        throw new Error("Content to encrypt must be a non-empty string.");
    }

    try {
        const iv = crypto.randomBytes(ivLength);
        const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
        let encrypted = cipher.update(content, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return iv.toString('hex') + ':' + encrypted;
    } catch (error) {
        console.error("Encryption error:", error);
        throw new Error("Encryption failed.");
    }
}

export function decryptContent(encryptedContent) {
    if (typeof encryptedContent !== 'string' || !encryptedContent.includes(':')) {
        throw new Error("Encrypted content must be a valid string with IV and data separated by ':'.");
    }

    try {
        const [ivHex, encrypted] = encryptedContent.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (error) {
        console.error("Decryption error:", error);
        throw new Error("Decryption failed.");
    }
}